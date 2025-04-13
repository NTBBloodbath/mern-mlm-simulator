import { XMarkIcon } from '@heroicons/react/24/outline';

interface PaymentQRModalProps {
    address: string;
    onClose: () => void;
    qrCode: string;
}

export default function PaymentQRModal({ address, onClose, qrCode }: PaymentQRModalProps) {
    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full relative border border-gray-600">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-700 motion-reduce:transition-none transition-colors"
                    onClick={onClose}
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>

                <h3 className="text-lg font-semibold mb-4 text-center">Depositar con Crypto</h3>

                <div className="flex flex-col items-center gap-4">
                    <img alt="QR para depositar con crypto" src={qrCode} />
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Dirección BSC:</p>
                        <p className="text-xs font-mono break-words">{address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
