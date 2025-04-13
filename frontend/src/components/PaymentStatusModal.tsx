import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface PaymentStatusModalProps {
    amountCaptured: number;
    onClose: () => void;
    status: 'COMPLETED' | 'FAILED' | 'WAITING';
}

export default function PaymentStatusModal({
    amountCaptured,
    onClose,
    status,
}: PaymentStatusModalProps) {
    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full relative border border-gray-600">
                <div className="text-center">
                    {status === 'COMPLETED' ? (
                        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    ) : (
                        <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    )}

                    <h3 className="text-lg font-semibold mb-2">
                        {status === 'COMPLETED' ? 'Pago Recibido!' : 'Pago Pendiente'}
                    </h3>

                    <p className="text-gray-600 mb-4">
                        {status === 'COMPLETED'
                            ? `Monto recibido: $${amountCaptured}`
                            : 'Aún no hemos detectado tu transacción'}
                    </p>

                    <button
                        className="bg-accent text-white px-4 py-2 rounded-md hover:bg-black motion-reduce:transition-none transition-colors duration-300"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
