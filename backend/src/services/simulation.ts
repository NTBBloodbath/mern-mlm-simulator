export interface NetProfit {
    capital: number;
    fee: number;
    month: number;
    profit: number;
}

export default class SimulationService {
    /**
     * Calculates the monthly profits and applies fee
     * @param capital Capital amount (aka base)
     * @param months Months of simulation
     * @param isCompound Whether the profits are compound or not
     * @returns NetProfit
     */
    public calculateNetProfit(capital: number, months: number, isCompound: boolean): NetProfit[] {
        const rate = this.getRateByMonths(months);
        const fee = this.calculateFee(capital);
        const results: NetProfit[] = [];

        // Get 
        for (let month = 1; month <= months; month++) {
            let currentTotal: number;

            if (isCompound) {
                // Monthly profit + initial capital, profit rate increases monthly
                currentTotal = capital * Math.pow(1 + rate, month);
            } else {
                // Same profit each month
                currentTotal = capital + (capital * rate * month);
            }

            const isLastMonth = month === months;
            const currentFee = isLastMonth ? fee : 0;
            const profit = currentTotal - currentFee;

            results.push({
                capital,
                fee: currentFee,
                month,
                profit,
            });
        }

        return results;
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
        return amount * 0.0025;
    }

    /**
     * Get the profit rate according to the amount of months
     * @param months Months to calculate the monthly profit
     * @returns number
     */
    private getRateByMonths(months: number): number {
        // 3: 1%; 6: 2%; 9: 3%; 12: 4%
        const rates = { 3: 0.01, 6: 0.02, 9: 0.03, 12: 0.04 };
        return rates[months as keyof typeof rates];
    }
}
