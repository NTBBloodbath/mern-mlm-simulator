import swaggerJsdoc from 'swagger-jsdoc';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

import config from './index';

const theme = new SwaggerTheme();

const options = {
    apis: ['./src/routes/*.ts', './src/index.ts'],
    definition: {
        info: {
            contact: {
                email: 'bloodbathalchemist@protonmail.com',
                name: 'NTBBloodbath',
                url: 'https://amartin.codeberg.page/about',
            },
            description: 'MERN MLM Simulator technical test',
            license: {
                name: 'GPL-3.0',
                url: 'https://spdx.org/licenses/GPL-3.0',
            },
            title: 'MERN MLM Simulator API',
            version: '0.1.0',
        },
        openapi: '3.1.0',
        servers: [
            {
                url: `http://localhost:${config.serverPort}`,
            },
        ],
    },
};

export const specs = swaggerJsdoc(options);
export const theming = {
    customCss: theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK),
};
