import axios from 'axios';
import qrcode from 'qrcode';

interface Payment {
    accounts: string[];
    address: string;
    fundsGoal: number;
    network: string;
    smartContractAddress: string;
    timeDelta: number;
    timeEnd: number;
    timeStart: number;
}

interface PaymentQr {
    accounts: string[];
    address: string;
    fundsGoal: number;
    network: string;
    qrCode: string;
    smartContractAddress: string;
}

export default class PaymentService {
    /**
     * Generate payment QR code
     * @async
     * @param {number} amount - Investment amount in USD
     * @returns {Promise<PaymentQr>} Payment details
     */
    public async generateQR(amount: number): Promise<PaymentQr | void> {
        try {
            const paymentData: Payment = await this.createPayment(amount);
            // According to bscscan, the contract address given in the test specs belongs to BUSD.
            // See https://bscscan.com/address/0xe9e7cea3dedca5984780bafc599bd69add087d56
            const qrCode = await qrcode.toDataURL(
                `busd:${paymentData.address}?amount=${paymentData.fundsGoal}`,
            );
            console.log(qrCode);
            return { ...paymentData, qrCode };
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Generate a new payment using the Disruptive Payments API
     * @async
     * @param {number} amount - Investment amount in USD
     * @returns {Promise<Payment>} Payment details
     */
    private async createPayment(amount: number): Promise<Payment> {
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
            throw new Error('Failed to generate QR code');
        }
    }
}
