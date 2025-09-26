"use client";
import React, { useState } from 'react';
import {useRouter} from "next/navigation";
import {api} from '@/services/apiService';
const SignIn: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        const trimmedEmail = email.trim().toLowerCase();
        const trimmedPassword = password.trim();
    
        try {
            const res = await fetch("/api/users/login", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }), 
                credentials: "include",
            });
        
            const data = await res.json();
    
            if (res.ok && data.token) {
                setMessage({ text: 'Login successful!', type: 'success' });

                // Save token to localStorage
                api.saveToken(data.token);

                const meRes = await fetch("/api/users/me", { credentials: "include" });
                console.log("User details:", await meRes.json());
                
                setTimeout(() => router.push('/'), 2000);
            } else {
                setMessage({ text: data.error || data.message || 'Login failed', type: 'error' });
                console.error('Login failed:', data.error || data.message);
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
            setMessage({ text: 'An unexpected error occurred.', type: 'error' });
        }
    };

    const handleRegister = () => {
        console.log('Redirecting to registration page...');
        router.push('/sign-up');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#1A1E29] p-4">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-[0_0_40px_rgba(40,111,248,0.5)] transform transition-transform duration-300 hover:scale-105">
                <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Login</h1>
                {message && (
                    <div className={`p-3 mb-4 rounded-lg text-white font-medium text-center ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleLogin} className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-4 w-full md:w-3/5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Enter your email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"  // Added this
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Enter your password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password" //Added this
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-4 flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                        >
                            Login
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center w-full md:w-2/5">
                        <span className="text-gray-500 font-semibold text-xl mb-4 md:mb-0">or</span>

                        <button
                            type="button"
                            onClick={handleRegister}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
