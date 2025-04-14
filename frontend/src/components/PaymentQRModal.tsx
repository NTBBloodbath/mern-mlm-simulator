import { XMarkIcon } from '@heroicons/react/24/outline';

interface PaymentQRModalProps {
    address: string;
    onClose: () => void;
    qrCode: string;
}

export default function PaymentQRModal({ address, onClose, qrCode }: PaymentQRModalProps) {
    return (
        <div className="flex fixed inset-0 justify-center items-center p-4 bg-opacity-50 backdrop-blur-sm">
            <div className="relative p-6 w-full max-w-sm bg-white rounded-lg border border-gray-600">
                <button
                    className="absolute top-3 right-3 text-gray-500 transition-colors hover:text-red-700 motion-reduce:transition-none"
                    onClick={onClose}
                >
                    <XMarkIcon className="w-6 h-6" />
                </button>

                <h3 className="mb-4 text-lg font-semibold text-center">Depositar con Crypto</h3>

                <div className="flex flex-col gap-4 items-center">
                    <img alt="QR para depositar con crypto" src={qrCode} />
                    <div className="text-center">
                        <p className="mb-2 text-sm text-gray-600">Dirección BSC:</p>
                        <p className="font-mono text-xs break-words">{address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
