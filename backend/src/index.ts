import cors from 'cors';
import express, { type Application, type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import config from './config/index.ts';
import { specs, theming } from './config/swagger.ts';
import { createPaymentRouter } from './routes/payment.ts';
import { createSimulationRouter } from './routes/simulation.ts';

const app: Application = express();

// Security middlewares
app.use(helmet());
app.use(
    cors({
        methods: ['GET', 'POST'],
        origin: `http://localhost:${config.clientPort}`,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// General middlewares
app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'tiny'));

// Routes
app.use('/api/payments', createPaymentRouter());
app.use('/api/simulate', createSimulationRouter());

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is healthy
 */
app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'Ok' });
});

// Serve Swagger documentation only on development environments
if (config.nodeEnv == 'development') {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, theming));
}

// 404 middleware
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Not Found', message: `Endpoint ${req.path} not found` });
});

// 500 middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message || 'An unexpected error occurred',
    });
});

app.listen(config.serverPort, () => {
    console.log(`Running server on http://localhost:${config.serverPort}`);
}).on('error', (err: Error) => {
    console.error('Something went wrong while initializing the server:');
    throw err;
});
