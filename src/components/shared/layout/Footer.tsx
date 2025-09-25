'use client';

import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-400 p-6 mt-auto">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center md:items-start">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <img src="/logo.png" alt="ComeAndSee Logo" className="h-20 w-auto" />
                        </Link>
                    </div>
                    <p className="text-sm">Find your next movie experience.</p>
                </div>
                <div>
                    <h3 className="font-bold text-white mb-2">Navigation</h3>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <Link href="/movie-listing" className="hover:text-white">
                                Movies
                            </Link>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Theaters
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-white mb-2">Learn more</h3>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <a href="#" className="hover:text-white">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Careers
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                FAQ
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-white mb-2">Contact</h3>
                    <p className="text-sm">
                        123 Movie Lane, <br />
                        Hollywood, CA 90210 <br />
                        <a href="mailto:info@comeandsee.com" className="hover:underline">
                            info@comeandsee.com
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
