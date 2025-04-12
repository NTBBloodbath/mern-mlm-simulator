import { Router } from 'express';

import SimulationController from '../controllers/simulation';

/**
 * @typedef SimulationRoutes
 * @description Router for handling simulation related operations
 */
export const createSimulationRouter = (): Router => {
    const router = Router();
    const controller = new SimulationController();

    /**
     * @swagger
     * /api/simulate:
     *   post:
     *     summary: Simulate commissions
     *     produces:
     *       - application/json
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             properties:
     *               capital:
     *                 type: number
     *                 example: 1000
     *               months:
     *                 type: number
     *                 enum: [3, 6, 9, 12]
     *                 example: 6
     *               isCompound:
     *                 type: boolean
     *                 example: true
     *     responses:
     *       200:
     *         description: Successfully calculated commission
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 netAmount:
     *                   type: object
     *                   properties:
     *                     capital:
     *                       type: number
     *                       example: 1000
     *                     fee:
     *                       type: number
     *                       example: 10.3
     *                     profit:
     *                       type: number
     *                       example: 1020
     */
    router.post('/', controller.calculateSimulation);

    /**
     * @swagger
     * /api/simulate/export:
     *   post:
     *     summary: Export simulation data to CSV
     *     produces:
     *       - application/json
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             properties:
     *               netAmount:
     *                 type: object
     *                 properties:
     *                   capital:
     *                     type: number
     *                     example: 1000
     *                   fee:
     *                     type: number
     *                     example: 10.3
     *                   profit:
     *                     type: number
     *                     example: 1020
     *     responses:
     *       200:
     *         description: Successfully exported simulation data to CSV
     *         content:
     *           text/csv:
     *             schema:
     *               type: object
     *               properties:
     *                 capital:
     *                   type: number
     *                   example: 1000
     *                 fee:
     *                   type: number
     *                   example: 10.3
     *                 profit:
     *                   type: number
     *                   example: 1020
     */
    router.post('/export', controller.exportToCSV);

    return router;
};
