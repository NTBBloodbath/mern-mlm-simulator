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
        <div className="flex fixed inset-0 justify-center items-center p-4 backdrop-blur-sm">
            <div className="relative p-6 w-full max-w-sm bg-white rounded-lg border border-gray-600">
                <div className="text-center">
                    {status === 'COMPLETED' ? (
                        <CheckCircleIcon className="mx-auto mb-4 w-16 h-16 text-green-500" />
                    ) : (
                        <XCircleIcon className="mx-auto mb-4 w-16 h-16 text-red-500" />
                    )}

                    <h3 className="mb-2 text-lg font-semibold">
                        {status === 'COMPLETED' ? 'Pago Recibido!' : 'Pago Pendiente'}
                    </h3>

                    <p className="mb-4 text-gray-600">
                        {status === 'COMPLETED'
                            ? `Monto recibido: $${amountCaptured}`
                            : 'Aún no hemos detectado tu transacción'}
                    </p>

                    <button
                        className="py-2 px-4 text-white rounded-md transition-colors duration-300 hover:bg-black bg-accent motion-reduce:transition-none"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
