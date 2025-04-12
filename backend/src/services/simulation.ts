export interface NetProfit {
    capital: number;
    fee: number;
    profit: number;
}

export default class SimulationService {
    /**
     * Calculates the monthly benefits and applies fee
     * @param capital Capital amount (aka base)
     * @param months Months of simulation
     * @param isCompound Whether the benefits are compound or not
     * @returns NetProfit
     */
    public calculateNetProfit(capital: number, months: number, isCompound: boolean): NetProfit {
        const rate = this.getRateByMonths(months);
        let total = capital;

        if (isCompound) {
            // Monthly benefit + initial capital, benefit rate increases monthly
            total = capital * Math.pow(1 + rate, months);
        } else {
            // Same benefit each month
            total += capital * rate * months;
        }

        // Apply transaction fee
        const fee = this.calculateFee(total);
        return { capital, fee: Number(fee.toFixed(2)), profit: Number((total - fee).toFixed(2)) };
    }

    /**
     * Calculate fee rates according to the given amount of investment capital
     * @param amount Amount of money to calculate the fee
     * @returns number
     */
    private calculateFee(amount: number): number {
        if (amount <= 1000) return amount * 0.02;
        if (amount <= 10000) return amount * 0.01;
        if (amount <= 35000) return amount * 0.005;
        return amount * 0.025;
    }

    /**
     * Get the benefit rate according to the amount of months
     * @param months Months to calculate the monthly benefit
     * @returns number
     */
    private getRateByMonths(months: number): number {
        // 3: 1%; 6: 2%; 9: 3%; 12: 4%
        const rates = { 3: 0.01, 6: 0.02, 9: 0.03, 12: 0.04 };
        return rates[months as keyof typeof rates];
    }
}
