import { describe, expect, test } from 'bun:test';

import SimulationService from '../../src/services/simulation';

describe('SimulationService', () => {
    const service = new SimulationService();

    test('Calculate simple profit for 3 months', () => {
        const result = service.calculateNetProfit(1000, 3, false);
        expect(result.profit).toBe(1030 - 20); // 1000 + 30 (3*1%) - 20 (2% fee of 1000)
    });

    test('Calculate compound profit for 12 months', () => {
        const result = service.calculateNetProfit(5000, 12, true);
        // Expected total
        const expected = 5000 * Math.pow(1.04, 12);
        // Calculate fee based off initial capital, expected is less than 10000
        // but higher than 1000 so according to the technical document the
        // expected fee is 1%
        const fee = 5000 * 0.01;
        expect(result.profit).toBeCloseTo(expected - fee, 2);
    });
});
