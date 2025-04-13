import { CodeBracketSquareIcon } from '@heroicons/react/24/outline';

export default function NavBar() {
    return (
        <header className="relative shadow-sm bg-gray-300">
            <nav className="container mx-auto px-4 md:px-0">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center shrink-0">
                        <a className="text-xl font-bold" href="/">
                            MERN MLM Simulator
                        </a>
                    </div>

                    <div className="flex items-center space-x-8">
                        <a
                            className="flex items-center space-x-2 hover:text-accent motion-reduce:transition-none transition-colors"
                            href="https://github.com/NTBBloodbath/mern-mlm-simulator"
                        >
                            <CodeBracketSquareIcon className="h-6 w-6 inline-block mr-1" />
                            <span className="font-semibold">Repository</span>
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
}
