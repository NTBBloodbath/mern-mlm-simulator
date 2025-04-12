import dotenv from 'dotenv';

dotenv.config();

interface Config {
    clientPort: number;
    nodeEnv: string;
    serverPort: number;
}

const config: Config = {
    clientPort: Number(process.env.FRONTEND_PORT) || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    serverPort: Number(process.env.BACKEND_PORT) || 4000,
};

export default config;
