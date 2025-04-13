import { describe, expect, mock, test } from 'bun:test';

import type { Payment } from '../../src/services/payment.ts';

import PaymentService from '../../src/services/payment.ts';

// Axios and qrcode mock
const mockedPayment: Payment = {
    data: {
        accounts: ['0xe0bA37eFF02939576D2593c8B01b4361F453679F'],
        address: '0xBCC2029748B190817d0D448f07151EA12A08F182',
        fundsGoal: 100,
        network: 'BSC',
        smartContractAddress: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    timeDelta: 789,
    timeEnd: 456,
    timeStart: 123,
};

mock.module('qrcode', () => ({
    toDataURL: mock(() => 'data:image/png;base64,QR_MOCK'),
}));

describe('PaymentService', () => {
    const service = new PaymentService();

    test('generateQR properly generates QR code', async () => {
        const qr = await service.generateQR('0xBCC2029748B190817d0D448f07151EA12A08F182', 500);
        expect(qr).toBeString();
        expect(qr).toInclude('data:image/png;base64,');
    });

    test('generateQR properly return errors', async () => {
        expect(async () => {
            // @ts-expect-error We are checking for an invalid parameter type
            await service.generateQR(123, 1000);
        }).toThrow('Failed to generate QR code: Invalid address provided');

        expect(async () => {
            await service.generateQR('asdasd', 1000);
        }).toThrow('Failed to generate QR code: Invalid address provided: invalid address format');
    });

    test('createPayment properly return payment', async () => {
        mock.module('axios', () => ({
            default: {
                post: mock(() => ({
                    data: { data: mockedPayment },
                    status: 200,
                })),
            },
        }));

        const data = await service.createPayment(5);
        // @ts-expect-error mocking returns { data: data: { ... }, time... } and we expect { data: ..., time... }
        expect(data.data).toBe(mockedPayment);
    });

    test('createPayment properly manages API errors', async () => {
        mock.module('axios', () => ({
            default: {
                post: mock(() => {
                    throw new Error('API Error');
                }),
            },
        }));

        expect(async () => {
            await service.createPayment(5);
        }).toThrow('Failed to generate payment: API Error');
    });
});
