import { describe, expect, test } from 'bun:test';
import request from 'supertest';

import app from '../../src/app.ts';

describe('SimulationController', () => {
    test('calculateSimulation correctly return net amount', async () => {
        const res = await request(app).post('/api/simulate').send({
            capital: 1001,
            isCompound: true,
            months: 3,
        });

        const expected = {
            netAmount: {
                capital: 1001,
                fee: 10.01,
                profit: 1021.321301,
            },
        };
        expect(res.body).toEqual(expected);
    });

    test('calculateSimulation correctly validates body', async () => {
        // Capital body field validation
        const resInvalidCapital = await request(app).post('/api/simulate').send({
            capital: 'invalid',
            isCompound: false,
            months: 3,
        });
        expect(resInvalidCapital.badRequest).toBeTrue();
        expect(resInvalidCapital.body.error).toEqual('Invalid capital value provided');
        expect(resInvalidCapital.body.message).toEqual('capital must be a number');

        const resZeroCapital = await request(app).post('/api/simulate').send({
            capital: 0,
            isCompound: false,
            months: 3,
        });
        expect(resZeroCapital.badRequest).toBeTrue();
        expect(resZeroCapital.body.error).toEqual('Invalid capital amount provided');
        expect(resZeroCapital.body.message).toEqual('capital value must be higher than 0');

        // Months body field validation
        const resInvalidMonthsType = await request(app).post('/api/simulate').send({
            capital: 1000,
            isCompound: false,
            months: 'invalid',
        });
        expect(resInvalidMonthsType.badRequest).toBeTrue();
        expect(resInvalidMonthsType.body.error).toEqual('Invalid months value provided');
        expect(resInvalidMonthsType.body.message).toEqual('months must be a number');

        const resInvalidMonthsValue = await request(app).post('/api/simulate').send({
            capital: 1000,
            isCompound: false,
            months: 4,
        });
        expect(resInvalidMonthsValue.badRequest).toBeTrue();
        expect(resInvalidMonthsValue.body.error).toEqual('Invalid months value provided');
        expect(resInvalidMonthsValue.body.message).toEqual(
            'months value must be either 3, 6, 9, 12',
        );

        // isCompound body field validation
        const resInvalidCompound = await request(app).post('/api/simulate').send({
            capital: 1000,
            isCompound: 'not a boolean',
            months: 3,
        });
        expect(resInvalidCompound.badRequest).toBeTrue();
        expect(resInvalidCompound.body.error).toEqual('Invalid isCompound value provided');
        expect(resInvalidCompound.body.message).toEqual('isCompound must be a boolean');
    });
});
