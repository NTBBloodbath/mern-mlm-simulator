import { Router } from 'express';

import SimulationController from '../controllers/simulation';
import SimulationService from '../services/simulation';

/**
 * @typedef SimulationRoutes
 * @description Router for handling simulation related operations
 */
export const createSimulationRouter = (): Router => {
    const router = Router();
    const service = new SimulationService();
    const controller = new SimulationController(service);

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
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       capital:
     *                         type: number
     *                         example: 1000
     *                       fee:
     *                         type: number
     *                         example: 20
     *                       month:
     *                         type: number
     *                         example: 3
     *                       profit:
     *                         type: number
     *                         example: 1010
     */
    router.post('/', (req, res) => controller.calculateSimulation(req, res));

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
     *                 type: array
     *                 items:
     *                   type: object
     *                   properties:
     *                     capital:
     *                       type: number
     *                       example: 1000
     *                     fee:
     *                       type: number
     *                       example: 20
     *                     month:
     *                       type: number
     *                       example: 3
     *                     profit:
     *                       type: number
     *                       example: 1010
     *     responses:
     *       200:
     *         description: Successfully exported simulation data to CSV
     *         content:
     *           text/csv:
     *             schema:
     *               type: object
     *               properties:
     *                 month:
     *                   type: number
     *                   example: 3
     *                 capital:
     *                   type: number
     *                   example: 1000
     *                 fee:
     *                   type: number
     *                   example: 20
     *                 profit:
     *                   type: number
     *                   example: 1010
     */
    router.post('/export', (req, res) => controller.exportToCSV(req, res));

    return router;
};
