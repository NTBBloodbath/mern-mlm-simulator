import axios from 'axios';
import { type Request, type Response } from 'express';

import PaymentService from '../services/payment.ts';

export default class PaymentController {
    private service: PaymentService;

    constructor(service: PaymentService) {
        this.service = service;
    }

    /**
     * Check payment status for an address
     * @async
     * @function checkPaymentStatus
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     */
    public async checkPaymentStatus(req: Request, res: Response) {
        try {
            const address = req.query.address as string;

            if (!address || typeof address !== 'string') {
                res.status(400).json({
                    error: 'Invalid address provided',
                    message: 'address must be a string',
                });
                return;
            }

            // See https://www.rfctools.com/binance-smart-chain-address-validator/
            if (!address?.match(/^0x[a-fA-F0-9]{40}$/)) {
                res.status(400).json({
                    error: 'Invalid address provided',
                    message: 'invalid address format',
                });
                return;
            }

            const response = await axios.get(
                `https://my.disruptivepayments.io/api/payments/status`,
                {
                    headers: {
                        'client-api-key': process.env.CLIENT_API_KEY,
                        'content-type': 'application/json',
                    },
                    params: {
                        address: address,
                        network: 'BSC',
                    },
                },
            );
            res.status(200).json(response.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                res.status(err.response?.status || 500).json({
                    error: 'Payment API Error',
                    message: err.response?.data?.errorMessage || err.message,
                });
            }

            console.error(`Something went wrong in '/api/payments/status': ${err}`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Create a new payment request
     * @async
     * @function createPayment
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     */
    public async createPayment(req: Request, res: Response) {
        try {
            const { amount } = req.body;

            if (amount === undefined || typeof amount !== 'number') {
                res.status(400).json({
                    error: 'Invalid amount provided',
                    message: 'amount must be a number',
                });
                return;
            }

            if (amount <= 0) {
                res.status(400).json({
                    error: 'Invalid amount provided',
                    message: 'amount value must be higher than 0',
                });
                return;
            }

            const paymentData = await this.service.createPayment(amount);
            res.status(201).json(paymentData);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                res.status(err.response?.status || 500).json({
                    error: 'Payment API Error',
                    message: err.response?.data?.errorMessage || err.message,
                });
            }

            console.error(`Something went wrong in '/api/payments': ${err}`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Generate payment QR code
     * @async
     * @function generateQR
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     */
    public async generateQR(req: Request, res: Response) {
        try {
            const { address, amount } = req.body;

            if (!address || typeof address !== 'string') {
                res.status(400).json({
                    error: 'Invalid address provided',
                    message: 'address must be a string',
                });
                return;
            }

            // See https://www.rfctools.com/binance-smart-chain-address-validator/
            if (!address?.match(/^0x[a-fA-F0-9]{40}$/)) {
                res.status(400).json({
                    error: 'Invalid address provided',
                    message: 'invalid address format',
                });
                return;
            }

            if (!amount || typeof amount !== 'number' || amount <= 0) {
                res.status(400).json({
                    error: 'Invalid amount provided',
                    message: 'amount must be a number and its value must be higher than 0',
                });
                return;
            }

            const qrCode = await this.service.generateQR(address, amount);
            res.status(200).json(qrCode);
        } catch (err) {
            console.error(`Something went wrong in '/api/payments/qr': ${err}`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
