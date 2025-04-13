import axios from 'axios';
import qrcode from 'qrcode';

export interface Payment {
    accounts: string[];
    address: string;
    fundsGoal: number;
    network: string;
    smartContractAddress: string;
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
            return response.data.data as Payment;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            throw new Error('Failed to generate payment');
        }
    }

    /**
     * Generate payment QR code
     * @async
     * @param {string} address - Wallet address to generate the QR code from
     * @param {number} amount - USD amount to be paid
     * @returns {Promise<string>} QR code encoded as base64
     */
    public async generateQR(address: string, amount: number): Promise<string | void> {
        try {
            // According to bscscan, the contract address given in the technical test specs belongs to BUSD (BNB).
            // See https://bscscan.com/address/0xe9e7cea3dedca5984780bafc599bd69add087d56
            const qrCode = await qrcode.toDataURL(`busd:${address}?amount=${amount}`);
            return qrCode;
        } catch (err) {
            console.error(err);
        }
    }
}
