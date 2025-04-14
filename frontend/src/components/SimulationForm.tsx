import { CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function SimulationForm({
    onSimulate,
}: {
    onSimulate: (data: { capital: number; isCompound: boolean; months: number }) => void;
}) {
    const [capital, setCapital] = useState('');
    const [months, setMonths] = useState(3);
    const [compound, setCompound] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate
        onSimulate({
            capital: Number(capital),
            isCompound: compound,
            months,
        });
        // Reset defaults on submit
        setCapital('');
        setMonths(3);
        setCompound(false);
    };

    return (
        <form
            className="max-w-[80%] md:max-w-full mx-auto p-6 bg-white rounded-xl shadow-md border-2 border-gray-400"
            onSubmit={handleSubmit}
        >
            <div className="mb-4">
                <label className="flex items-center text-gray-700 font-semibold mb-2">
                    <CurrencyDollarIcon className="h-6 w-6 inline-block mr-2" />
                    Capital inicial (USD)
                </label>
                <input
                    className="form-input focus:border-accent focus:border-2 focus:ring-0 w-full p-2 border-2 rounded-md not-[&:placeholder-shown]:valid:border-green-500 not-[&:placeholder-shown]:invalid:border-red-500"
                    min="1"
                    minLength={1}
                    onChange={(e) => setCapital(e.target.value)}
                    placeholder="0"
                    required
                    type="number"
                    value={capital}
                />
            </div>

            <div className="mb-4">
                <label className="flex items-center text-gray-700 font-semibold mb-2">
                    <CalendarIcon className="h-6 w-6 inline-block mr-2" />
                    Plazo
                </label>
                <select
                    className="form-select focus:ring-0 focus:border-accent w-full p-2 border-2 rounded-md cursor-pointer"
                    onChange={(e) => setMonths(Number(e.target.value))}
                    value={months}
                >
                    {[3, 6, 9, 12].map((m) => (
                        <option key={m} value={m}>
                            {m} meses
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4 flex items-center">
                <input
                    checked={compound}
                    className="form-checkbox checked:hover:bg-blue-500 checked:bg-accent focus:ring-0 checked:focus:bg-accent mr-2 cursor-pointer"
                    onChange={(e) => setCompound(e.target.checked)}
                    type="checkbox"
                />
                <span className="font-semibold text-gray-700">Usar interés compuesto</span>
            </div>

            <button
                className="w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-black motion-reduce:transition-none transition-colors duration-300"
                type="submit"
            >
                Simular
            </button>
        </form>
    );
}
