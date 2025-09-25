'use client';
import {useRouter} from "next/navigation";
import {useAuthStore} from "@/lib/store/authStore";
import {useEffect} from "react";
import Link from "next/link";



const Header = () => {
    const { isLoggedIn, setIsLoggedIn, logout } = useAuthStore();
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, [setIsLoggedIn]);


    const router = useRouter();


    const handleLoginClick = () => {
        router.push('/login');
    };
    const handleSignUpClick = () => {
        console.log('Navigating to sign-up page...');
        router.push('/sign-up');
    };
    const handleLogoutClick = () => {
        logout();
        router.push('/');
        console.log('Redirecting to login page after logout...');
    };

    return (
        <header className="bg-[#151925] text-white p-4 shadow-md flex flex-col sm:flex-row justify-between items-center transition-colors duration-300">
            <div className="flex-shrink-0 mb-4 sm:mb-0">
                <Link href="/">
                <img src="/logo.png" alt="ComeAndSee Logo" className="h-16 w-auto transition-transform duration-300 transform hover:scale-110" />
                </Link>
            </div>
            <nav className="flex-grow mb-4 sm:mb-0">
                <ul className="flex justify-center sm:justify-start space-x-6 text-lg font-medium">
                    <li><Link href="/movie-listing">Movies</Link></li>
                    <li><Link href="/movie-listing">Coming Soon</Link></li>
                </ul>
            </nav>
            <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 transform hover:scale-105"
                        onClick={handleLogoutClick}
                    >
                        Log Out
                    </button>
                ) : (
                    <>
                        <button
                            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 transform hover:scale-105"
                            onClick={handleLoginClick}
                        >
                            Log In
                        </button>
                        <button
                            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 transform hover:scale-105"
                            onClick={handleSignUpClick}
                        >
                            Sign Up
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};
export default Header;
