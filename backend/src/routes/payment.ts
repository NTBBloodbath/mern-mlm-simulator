import { Router } from 'express';

import PaymentController from '../controllers/payment.ts';
import PaymentService from '../services/payment.ts';

/**
 * @typedef PaymentRoutes
 * @description Router for handling payment related operations
 */
export const createPaymentRouter = (): Router => {
    const router = Router();
    const service = new PaymentService();
    const controller = new PaymentController(service);

    /**
     * @swagger
     * /api/payments:
     *   post:
     *     summary: Create a new payment request and generate QR code
     *     produces:
     *       - application/json
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             properties:
     *               amount:
     *                 type: number
     *                 example: 5
     *     responses:
     *       200:
     *         description: Payment details
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 data:
     *                   type: object
     *                   properties:
     *                     address:
     *                       type: string
     *                       example: "0xBCC2029748B190817d0D448f07151EA12A08F182"
     *                     network:
     *                       type: string
     *                       example: "BSC"
     *                     fundsGoal:
     *                       type: number
     *                       example: 5
     *                     smartContractAddress:
     *                       type: string
     *                       example: "0xe9e7cea3dedca5984780bafc599bd69add087d56"
     *                     accounts:
     *                       type: array
     *                       items:
     *                         type: string
     *                       example: ["0xe0bA37eFF02939576D2593c8B01b4361F453679F"]
     *                 timeStart:
     *                   type: number
     *                   example: 1742437744132
     *                 timeEnd:
     *                   type: number
     *                   example: 1742437748255
     *                 timeDelta:
     *                   type: number
     *                   example: 4123
     */
    router.post('/', (req, res) => controller.createPayment(req, res));

    /**
     * @swagger
     * /api/payments/qr:
     *   post:
     *     summary: Generate a QR for payment
     *     produces:
     *       - application/json
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             properties:
     *               address:
     *                 type: string
     *                 example: "0xF5e01Dd3a03a791B8a8c290A5619A8e8fd5ba4A8"
     *                 description: Wallet address
     *               amount:
     *                 type: number
     *                 example: 5
     *     responses:
     *       200:
     *         description: Current payment status and details
     *         content:
     *           application/json:
     *             schema:
     *               name: qrCode
     *               type: string
     *               example: "data:image/png;base64,iVBOR..."
     */
    router.post('/qr', (req, res) => controller.generateQR(req, res));

    /**
     * @swagger
     * /api/payments/status:
     *   get:
     *     summary: Check payment status for a specific address
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: address
     *         in: query
     *         type: string
     *         example: "0xF5e01Dd3a03a791B8a8c290A5619A8e8fd5ba4A8"
     *         required: true
     *         description: Smart contract address
     *     responses:
     *       200:
     *         description: Current payment status and details
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 data:
     *                   type: object
     *                   properties:
     *                     network:
     *                       type: string
     *                       example: "BSC"
     *                     address:
     *                       type: string
     *                       example: "0xBCC2029748B190817d0D448f07151EA12A08F182"
     *                     amountCaptured:
     *                       type: number
     *                       example: 0
     *                     smartContractAddress:
     *                       type: string
     *                       example: "0xe9e7cea3dedca5984780bafc599bd69add087d56"
     *                     smartContractSymbol:
     *                       type: string
     *                       example: "BUSD"
     *                     status:
     *                       type: string
     *                       example: "WAITING"
     *                     fundStatus:
     *                       type: string
     *                       example: "EXPIRED"
     *                     processStep:
     *                       type: number
     *                       example: 11
     *                     processTotalSteps:
     *                       type: number
     *                       example: 22
     *                     fundsGoal:
     *                       type: number
     *                       example: 5
     *                     fundsExpirationAt:
     *                       type: number
     *                       example: 1744566844
     *                     currentBalance:
     *                       type: number
     *                       example: 0
     *                     forwardAddresses:
     *                       type: array
     *                       items:
     *                         type: string
     *                       example: []
     *                 timeStart:
     *                   type: number
     *                   example: 1742437744132
     *                 timeEnd:
     *                   type: number
     *                   example: 1742437748255
     *                 timeDelta:
     *                   type: number
     *                   example: 4123
     */
    router.get('/status', (req, res) => controller.checkPaymentStatus(req, res));

    return router;
};
