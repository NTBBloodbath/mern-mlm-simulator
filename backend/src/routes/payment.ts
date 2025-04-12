import { Router } from 'express';

import PaymentController from '../controllers/payment.ts';

/**
 * @typedef PaymentRoutes
 * @description Router for handling payment related operations
 */
export const createPaymentRouter = (): Router => {
    const router = Router();
    const controller = new PaymentController();

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
     *         description: Payment details with QR address
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 address:
     *                   type: string
     *                   example: "0xBCC2029748B190817d0D448f07151EA12A08F182"
     *                 network:
     *                   type: string
     *                   example: "BSC"
     *                 fundsGoal:
     *                   type: number
     *                   example: 5
     *                 smartContractAddress:
     *                   type: string
     *                   example: "0xe9e7cea3dedca5984780bafc599bd69add087d56"
     *                 accounts:
     *                   type: array
     *                   items:
     *                     type: string
     *                   example: ["0xe0bA37eFF02939576D2593c8B01b4361F453679F"]
     *                 qrCode:
     *                   type: string
     *                   example: "data:image/png;base64,iVBOR..."
     */
    router.post('/', controller.createPayment);

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
     */
    router.get('/status', controller.checkPaymentStatus);

    return router;
};
