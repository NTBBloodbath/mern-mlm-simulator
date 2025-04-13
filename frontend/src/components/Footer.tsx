export default function Footer() {
    return (
        <footer className="mt-8 py-4 px-6 w-full bg-gray-200 border-t border-gray-400">
            <div className="flex justify-between items-center font-medium text-xs md:text-sm">
                <span>
                    Copyright &copy; {new Date().getFullYear()}&nbsp;
                    <a
                        className="hover:underline motion-reduce:transition-none transition-colors hover:text-accent"
                        href="https://amartin.codeberg.page/"
                    >
                        NTBBloodbath
                    </a>
                    .
                    <br className="md:hidden" /> Licensed under GPLv3.
                </span>
                <div className="flex flex-inline">
                    <div className="mr-4 md:mr-6 lg:mr-8 last:mr-0">
                        <a
                            className="hover:text-accent motion-reduce:transition-none transition-colors"
                            href="https://github.com/NTBBloodbath"
                        >
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
