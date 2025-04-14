import { CodeBracketSquareIcon } from '@heroicons/react/24/outline';

export default function NavBar() {
    return (
        <header className="relative bg-gray-300 border-b border-gray-400 shadow-sm">
            <nav className="container px-4 mx-auto md:px-0">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center shrink-0">
                        <a className="text-xl font-bold transition-colors motion-reduce:transition-none hover:text-accent" href="/">
                            MERN MLM Simulator
                        </a>
                    </div>

                    <div className="flex items-center space-x-8">
                        <a
                            className="flex items-center space-x-2 transition-colors motion-reduce:transition-none hover:text-accent"
                            href="https://github.com/NTBBloodbath/mern-mlm-simulator"
                        >
                            <CodeBracketSquareIcon className="inline-block mr-1 w-6 h-6" />
                            <span className="font-semibold">Repositorio</span>
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
}
