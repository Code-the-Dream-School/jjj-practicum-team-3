"use client";
import React, { useState } from 'react';
import {useRouter} from "next/navigation";
import { api } from '@/services/apiService';

const SignUp: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const handleSignUp = async(e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (password !== confirmPassword) {
            setMessage({ text: 'Passwords do not match!', type: 'error' });
            return;
        }
        try {
            const { ok, data } = await api.signUp(name, email, password);

            if (ok) {
                setMessage({ text: 'Sign-up successful!', type: 'success' });
                setTimeout(() => router.push('/'), 2000);
            } else {
                // setMessage({ text: data.error || 'Sign Up failed', type: 'error' });
                // console.error('Sign Up failed:', data.error);
                // setTimeout(() => router.push('/'), 2000);
                
                // Defensive error handling
                const errorMessage = data?.error || data?.message || 'Sign Up failed';
                setMessage({ text: errorMessage, type: 'error' });
                console.error('Sign Up failed:', errorMessage);
                // setTimeout(() => router.push('/'), 2000);
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#1A1E29] p-4">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-[0_0_40px_rgba(40,111,248,0.5)] transform transition-transform duration-300 hover:scale-105">
                <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Sign Up</h1>

                {message && (
                    <div className={`p-3 mb-4 rounded-lg text-white font-medium text-center ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Enter name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            required
                        />
                    </div>
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
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            required
                        />
                    </div>
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
