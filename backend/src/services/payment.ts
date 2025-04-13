import axios from 'axios';
import qrcode from 'qrcode';

export interface Payment {
    data: PaymentData;
    timeDelta: number;
    timeEnd: number;
    timeStart: number;
}

export interface PaymentQr {
    accounts: string[];
    address: string;
    fundsGoal: number;
    network: string;
    qrCode: string;
    smartContractAddress: string;
}

interface PaymentData {
    accounts: string[];
    address: string;
    fundsGoal: number;
    network: string;
    smartContractAddress: string;
}

export default class PaymentService {
    /**
     * Generate a new payment using the Disruptive Payments API
     * @async
     * @param {number} amount - Investment amount in USD
     * @returns {Promise<Payment>} Payment details
     */
    public async createPayment(amount: number): Promise<Payment> {
        try {
            const response = await axios.post(
                'https://my.disruptivepayments.io/api/payments/single',
                {
                    fundsGoal: amount,
                    network: 'BSC',
                    smartContractAddress: process.env.CONTRACT_ADDRESS,
                },
                {
                    headers: {
                        'client-api-key': process.env.CLIENT_API_KEY,
                        'content-type': 'application/json',
                    },
                },
            );

            if (response.status != 200) {
                throw new Error(`Failed to generate payment: ${response.data.errorMessage}`);
            }
            return response.data as Payment;
        } catch (err) {
            const error = err as Error;
            throw new Error(`Failed to generate payment: ${error.message}`);
        }
    }

    /**
     * Generate payment QR code
     * @async
     * @param {string} address - Wallet address to generate the QR code from
     * @param {number} amount - USD amount to be paid
     * @returns {Promise<string>} QR code encoded as base64
     */
    public async generateQR(address: string, amount: number): Promise<string> {
        try {
            if (!address || typeof address !== 'string') {
                throw new Error('Invalid address provided: address must be a string');
            }

            // See https://www.rfctools.com/binance-smart-chain-address-validator/
            if (!address?.match(/^0x[a-fA-F0-9]{40}$/)) {
                throw new Error('Invalid address provided: invalid address format');
            }

            if (amount === undefined || typeof amount !== 'number' || amount <= 0) {
                throw new Error(
                    'Invalid amount provided: amount must be a number and its value must be higher than 0',
                );
            }

            // According to bscscan, the contract address given in the technical test specs belongs to BUSD (BNB).
            // See https://bscscan.com/address/0xe9e7cea3dedca5984780bafc599bd69add087d56
            const qrCode = await qrcode.toDataURL(`busd:${address}?amount=${amount}`);
            return qrCode;
        } catch (err) {
            const error = err as Error;
            throw new Error(`Failed to generate QR code: ${error.message}`);
        }
    }
}
