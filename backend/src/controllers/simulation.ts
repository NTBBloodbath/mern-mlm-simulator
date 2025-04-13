import { AsyncParser } from '@json2csv/node/index.js';
import { type Request, type Response } from 'express';

import SimulationService, { type NetProfit } from '../services/simulation';

export default class SimulationController {
    private service: SimulationService;

    constructor(service: SimulationService) {
        this.service = service;
    }

    public calculateSimulation(req: Request, res: Response) {
        try {
            // eslint-disable-next-line perfectionist/sort-objects
            const { capital, months, isCompound } = req.body;

            if (capital === undefined || typeof capital !== 'number') {
                res.status(400).json({
                    error: 'Invalid capital value provided',
                    message: 'capital must be a number',
                });
                return;
            }

            if (capital <= 0) {
                res.status(400).json({
                    error: 'Invalid capital amount provided',
                    message: 'capital value must be higher than 0',
                });
                return;
            }

            if (months === undefined || typeof months !== 'number') {
                res.status(400).json({
                    error: 'Invalid months value provided',
                    message: 'months must be a number',
                });
                return;
            }

            if (![3, 6, 9, 12].includes(months)) {
                res.status(400).json({
                    error: 'Invalid months value provided',
                    message: 'months value must be either 3, 6, 9, 12',
                });
                return;
            }

            if (typeof isCompound !== 'boolean') {
                res.status(400).json({
                    error: 'Invalid isCompound value provided',
                    message: 'isCompound must be a boolean',
                });
                return;
            }

            const calculation = this.service.calculateNetProfit(capital, months, isCompound);
            res.status(200).json({ netAmount: calculation });
        } catch (err) {
            console.error(`Something went wrong in '/api/simulate': ${err}`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async exportToCSV(req: Request, res: Response) {
        try {
            const data: NetProfit[] = req.body.netAmount;

            if (data === undefined) {
                res.status(400).json({
                    error: 'Invalid body provided',
                    message: 'body is missing netAmount object array',
                });
                return;
            }
            if (data[0] && data[0].capital === undefined) {
                res.status(400).json({
                    error: 'Invalid body provided',
                    message: 'netAmount object is missing capital field',
                });
                return;
            }
            if (data[0] && data[0].month === undefined) {
                res.status(400).json({
                    error: 'Invalid body provided',
                    message: 'netAmount object is missing month field',
                });
                return;
            }
            if (data[0] && data[0].profit === undefined) {
                res.status(400).json({
                    error: 'Invalid body provided',
                    message: 'netAmount object is missing profit field',
                });
                return;
            }

            const csvOpts = {
                fields: [
                    {
                        label: 'Mes',
                        value: (record: NetProfit) => record.month,
                    },
                    {
                        label: 'Capital Inicial (USD)',
                        value: (record: NetProfit) => `$${record.capital}`,
                    },
                    {
                        label: 'Monto Acumulado (USD)',
                        value: (record: NetProfit) => `$${record.profit}`,
                    },
                    {
                        label: 'Fee (USD)',
                        // We only apply the fee at the final month, omit it when the month fee is 0
                        value: (record: NetProfit) => (record.fee < 0 ? ' ' : `$${record.fee}`),
                    },
                ],
            };
            const parser = new AsyncParser(csvOpts);
            const csv = await parser.parse(data).promise();
            // See https://www.rfc-editor.org/rfc/rfc7111
            res.header('Content-Type', 'text/csv');
            res.attachment('mern-mlm-simulation.csv');
            res.send(csv);
        } catch (err) {
            console.error(`Something went wrong in '/api/simulate/export': ${err}`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
