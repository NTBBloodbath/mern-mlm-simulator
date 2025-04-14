export default function ResultsTable({
    data,
}: {
    data: Array<{ capital: number; fee: number; month: number; profit: number }>;
}) {
    return (
        <div className="mx-auto overflow-x-auto rounded-lg shadow-md max-w-[80%] md:max-w-screen border-2 border-gray-400 mt-8">
            <table className="table-auto min-w-full">
                <caption className="caption-bottom py-1 text-gray-600 bg-gray-200">
                    Capital inicial (USD): ${data[0].capital}; Fee (USD): $
                    {data[data.length - 1].fee}
                </caption>
                <thead className="table-header-group">
                    <tr className="table-row bg-gray-200 border-b border-b-gray-200">
                        <th className="table-cell px-6 py-3 text-center">Mes</th>
                        <th className="table-cell px-6 py-3 text-center">Monto acumulado (USD)</th>
                    </tr>
                </thead>
                <tbody className="table-row-group">
                    {data.map((row) => (
                        <tr
                            className="table-row hover:bg-gray-50 border-b border-b-gray-200"
                            key={row.month}
                        >
                            <td className="table-cell px-6 py-4 text-center">{row.month}</td>
                            <td className="table-cell px-6 py-4 text-center">${row.profit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
