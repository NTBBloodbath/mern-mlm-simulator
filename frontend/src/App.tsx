import {
    ArrowsPointingOutIcon,
    DocumentMagnifyingGlassIcon,
    QrCodeIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

import Footer from './components/Footer';
import NavBar from './components/NavBar';
import PaymentQRModal from './components/PaymentQRModal';
import PaymentStatusModal from './components/PaymentStatusModal';
import ResultsTable from './components/ResultsTable';
import SimulationForm from './components/SimulationForm';
import {
    checkPaymentStatus,
    exportToCSV,
    generatePaymentQR,
    type NetProfit,
    simulateInvestment,
} from './services/api';

export default function App() {
    const [results, setResults] = useState<Array<NetProfit>>([]);
    const [address, setAddress] = useState<null | string>(null);
    const [qrData, setQRData] = useState<null | string>(null);
    const [paymentStatus, setPaymentStatus] = useState<null | {
        amount: number;
        status: 'COMPLETED' | 'FAILED' | 'WAITING';
    }>(null);

    const handleSimulate = async (data: {
        capital: number;
        isCompound: boolean;
        months: number;
    }) => {
        try {
            const response = await simulateInvestment(data);
            setResults(response.netAmount);
        } catch (err) {
            console.error(`Error al simular: ${err}`);
        }
    };

    const handleDeposit = async () => {
        const totalAmount = results[results.length - 1]?.capital || 0;
        const response = await generatePaymentQR(totalAmount);
        setQRData(response.qrCode);
        setAddress(response.address);
    };

    const handleReset = () => {
        setResults([]);
        setQRData(null);
        setAddress(null);
        setPaymentStatus(null);
    };

    const handlePaymentStatus = async () => {
        try {
            const response = await checkPaymentStatus(address as string);
            setPaymentStatus({
                amount: response.amountCaptured,
                status: response.status,
            });
        } catch (err) {
            console.error(`Error al verificar el pago: ${err}`);
            setPaymentStatus({ amount: 0, status: 'FAILED' });
        }
    };

    const handleCsvExport = async () => {
        try {
            await exportToCSV({ netAmount: results });
        } catch (err) {
            console.error(`Error al exportar a CSV: ${err}`);
        }
    };

    return (
        <>
            <NavBar />
            <main className="container mx-auto min-h-screen mt-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Simulador de MLM
                </h1>

                <SimulationForm onSimulate={handleSimulate} />

                {results.length > 0 && (
                    <div className="container mx-auto mt-8">
                        <div className="flex justify-center-safe md:justify-evenly gap-2 md:gap-4 mb-4">
                            <button
                                className="flex justify-center items-center bg-gray-600 text-white px-4 py-2 rounded-md motion-reduce:transition-none transition-colors duration-300 hover:bg-gray-800 md:min-w-[30%]"
                                onClick={handleReset}
                            >
                                <ArrowsPointingOutIcon className="h-6 w-6 mr-2" />
                                Reset
                            </button>
                            <button
                                className="flex justify-center items-center bg-purple-600 text-white px-4 py-2 rounded-md motion-reduce:transition-none transition-colors duration-300 hover:bg-purple-800 md:min-w-[30%]"
                                onClick={handlePaymentStatus}
                            >
                                <DocumentMagnifyingGlassIcon className="h-6 w-6 mr-2" />
                                Revisar pago
                            </button>
                            <button
                                className="flex justify-center items-center bg-green-600 text-white px-4 py-2 rounded-md motion-reduce:transition-none transition-colors duration-300 hover:bg-green-800 md:min-w-[30%]"
                                onClick={handleDeposit}
                            >
                                <QrCodeIcon className="h-6 w-6 mr-2" />
                                Depositar ahora
                            </button>
                        </div>

                        <ResultsTable data={results} />
                        <button
                            className="mx-auto flex justify-center items-center bg-blue-600 text-white px-4 py-2 rounded-md motion-reduce:transition-none transition-colors duration-300 hover:bg-blue-800 min-w-[80%] md:min-w-full mt-4"
                            onClick={handleCsvExport}
                        >
                            Exportar a CSV
                        </button>
                    </div>
                )}

                {address && qrData && (
                    <PaymentQRModal
                        address={address}
                        onClose={() => setQRData(null)}
                        qrCode={qrData}
                    />
                )}

                {paymentStatus && (
                    <PaymentStatusModal
                        amountCaptured={paymentStatus.amount}
                        onClose={() => setPaymentStatus(null)}
                        status={paymentStatus.status}
                    />
                )}
            </main>
            <Footer />
        </>
    );
}
