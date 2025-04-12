import { AsyncParser } from '@json2csv/node/index.js';
import { type Request, type Response } from 'express';

import SimulationService, { type NetProfit } from '../services/simulation';

export default class SimulationController {
    public calculateSimulation(req: Request, res: Response) {
        try {
            // eslint-disable-next-line perfectionist/sort-objects
            const { capital, months, isCompound } = req.body;

            if (!capital || typeof capital !== 'number' || capital <= 0) {
                res.status(400).json({
                    error: 'Invalid capital amount provided',
                    message: 'capital must be a number and its value must be higher than 0',
                });
            }

            if (!months || typeof months !== 'number' || ![3, 6, 9, 12].includes(months)) {
                res.status(400).json({
                    error: 'Invalid months value provided',
                    message: 'months must be a number and its value must be either 3, 6, 9, 12',
                });
            }

            const service = new SimulationService();
            const calculation = service.calculateNetProfit(capital, months, isCompound);
            res.status(200).json({ netAmount: calculation });
        } catch (err) {
            console.error(`Something went wrong in '/api/simulate': ${err}`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async exportToCSV(req: Request, res: Response) {
        try {
            const data = req.body.netAmount;
            const csvOpts = {
                fields: [
                    {
                        label: 'Capital',
                        value: (record: NetProfit) => record.capital,
                    },
                    {
                        label: 'Fee',
                        value: (record: NetProfit) => record.fee,
                    },
                    {
                        label: 'Net Profit',
                        value: (record: NetProfit) => record.profit,
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
