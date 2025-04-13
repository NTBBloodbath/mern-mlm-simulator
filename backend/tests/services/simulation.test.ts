import { describe, expect, test } from 'bun:test';

import SimulationService from '../../src/services/simulation';

describe('SimulationService', () => {
    const service = new SimulationService();

    test('Calculate simple profit for 3 months', () => {
        const result = service.calculateNetProfit(1000, 3, false);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore Array element at index 2 is expected to exist
        expect(result[2].profit).toBe(1030 - 20); // 1000 + 30 (3*1%) - 20 (2% fee of 1000)
    });

    test('Calculate compound profit for 12 months', () => {
        const result = service.calculateNetProfit(5000, 12, true);
        // Expected total
        const expected = 5000 * Math.pow(1.04, 12);
        // Calculate fee based off initial capital, expected is less than 10000
        // but higher than 1000 so according to the technical document the
        // expected fee is 1%
        const fee = 5000 * 0.01;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore Array element at index 11 is expected to exist
        expect(result[11].profit).toBeCloseTo(expected - fee, 2);
    });
});
