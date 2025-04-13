import { describe, expect, test } from 'bun:test';
import request from 'supertest';

import app from '../../src/app.ts';

describe('PaymentController', () => {
    test('checkPaymentStatus validates invalid address', async () => {
        const resNotString = await request(app)
            .get('/api/payments/status')
            .query({ address: null })
            .set('client-api-key', process.env.CLIENT_API_KEY as string)
            .set('content-type', 'application/json');
        expect(resNotString.badRequest).toBeTrue();
        expect(resNotString.body.error).toEqual('Invalid address provided');
        expect(resNotString.body.message).toEqual('address must be a string');

        const resInvalid = await request(app)
            .get('/api/payments/status')
            .query({ address: 'invalid' })
            .set('client-api-key', process.env.CLIENT_API_KEY as string)
            .set('content-type', 'application/json');
        expect(resInvalid.badRequest).toBeTrue();
        expect(resInvalid.body.error).toEqual('Invalid address provided');
        expect(resInvalid.body.message).toEqual('invalid address format');
    });

    test('createPayment rejects invalid amounts', async () => {
        const resInvalid = await request(app).post('/api/payments').send({
            amount: 'invalid',
        });
        expect(resInvalid.badRequest).toBeTrue();
        expect(resInvalid.body.error).toEqual('Invalid amount provided');
        expect(resInvalid.body.message).toEqual('amount must be a number');

        const resZeroAmount = await request(app).post('/api/payments').send({
            amount: 0,
        });
        expect(resZeroAmount.badRequest).toBeTrue();
        expect(resZeroAmount.body.error).toEqual('Invalid amount provided');
        expect(resZeroAmount.body.message).toEqual('amount value must be higher than 0');
    });
});
