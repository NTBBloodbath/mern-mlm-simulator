export default function Footer() {
    return (
        <footer className="py-4 px-6 mt-8 w-full bg-gray-200 border-t border-gray-400">
            <div className="flex justify-between items-center text-xs font-medium md:text-sm">
                <span>
                    Copyright &copy; {new Date().getFullYear()}&nbsp;
                    <a
                        className="transition-colors hover:underline motion-reduce:transition-none hover:text-accent"
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
                            className="transition-colors motion-reduce:transition-none hover:text-accent"
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
