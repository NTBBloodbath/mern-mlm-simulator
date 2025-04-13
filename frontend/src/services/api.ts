import axios from 'axios';

const API_BASE = `http://localhost:${import.meta.env.BACKEND_PORT || 4000}/api`;

export interface NetProfit {
    capital: number;
    fee: number;
    month: number;
    profit: number;
}

export const simulateInvestment = async (data: {
    capital: number;
    isCompound: boolean;
    months: number;
}): Promise<{ netAmount: NetProfit[] }> => {
    const response = await axios.post(`${API_BASE}/simulate`, data);
    return response.data;
};

export const exportToCSV = async (data: { netAmount: NetProfit[] }) => {
    const response = await axios.post(`${API_BASE}/simulate/export`, data, {
        responseType: 'blob',
    });
    // Create file link in browser's memory
    const href = URL.createObjectURL(response.data);

    // Create link HTML element with href to file and click it
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'mern-mlm-simulator.csv');
    document.body.appendChild(link);
    link.click();

    // Clean up link element and remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
};

export const generatePaymentQR = async (amount: number) => {
    const paymentData = await axios.post(`${API_BASE}/payments`, { amount });
    const address = paymentData.data.data.address;
    const response = await axios.post(`${API_BASE}/payments/qr`, {
        address,
        amount: paymentData.data.data.fundsGoal,
    });

    return { address, qrCode: response.data };
};

export const checkPaymentStatus = async (address: string) => {
    const response = await axios.get(`${API_BASE}/payments/status`, { params: { address } });
    return response.data;
};
