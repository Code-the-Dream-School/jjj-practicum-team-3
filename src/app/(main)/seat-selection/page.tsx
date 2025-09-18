'use client';

import React, { useState, useMemo } from 'react';
import FooterStrip from "@/components/shared/layout/FooterStrip";

// Define seat types for clarity
type SeatStatus = 'available' | 'selected' | 'booked' | 'premium';

interface Seat {
    id: string;
    status: SeatStatus;
}

interface SeatRow {
    row: string;
    seats: Seat[];
}

const mockSeatData: SeatRow[] = [
    {
        row: 'A',
        seats: [
            { id: 'A1', status: 'available' },
            { id: 'A2', status: 'available' },
            { id: 'A3', status: 'available' },
            { id: 'A4', status: 'available' },
            { id: 'A5', status: 'available' },
            { id: 'A6', status: 'available' },
            { id: 'A7', status: 'available' },
            { id: 'A8', status: 'available' },
            { id: 'A9', status: 'available' },
            { id: 'A10', status: 'available' },
            { id: 'A11', status: 'available' },
            { id: 'A13', status: 'available' },
            { id: 'A14', status: 'available' },
            { id: 'A15', status: 'available' },
            { id: 'A16', status: 'available' },
            { id: 'A17', status: 'available' },
            { id: 'A18', status: 'available' },
            { id: 'A19', status: 'available' },
            { id: 'A20', status: 'available' },
        ],
    },
    {
        row: 'B',
        seats: [
            { id: 'B1', status: 'available' },
            { id: 'B2', status: 'available' },
            { id: 'B3', status: 'available' },
            { id: 'B4', status: 'available' },
            { id: 'B5', status: 'available' },
            { id: 'B6', status: 'available' },
            { id: 'B7', status: 'available' },
            { id: 'B8', status: 'available' },
            { id: 'B9', status: 'available' },
            { id: 'B10', status: 'available' },
            { id: 'B11', status: 'available' },
            { id: 'B12', status: 'available' },
            { id: 'B13', status: 'available' },
            { id: 'B14', status: 'available' },
            { id: 'B15', status: 'available' },
            { id: 'B16', status: 'available' },
            { id: 'B17', status: 'available' },
            { id: 'B18', status: 'available' },
            { id: 'B19', status: 'available' },
            { id: 'B20', status: 'available' },
            { id: 'B21', status: 'available' },
            { id: 'B22', status: 'available' },
            { id: 'B23', status: 'available' },
            { id: 'B24', status: 'available' },
            { id: 'B25', status: 'available' },
        ],
    },
    {
        row: 'C',
        seats: [
            { id: 'C1', status: 'available' },
            { id: 'C2', status: 'available' },
            { id: 'C3', status: 'available' },
            { id: 'C4', status: 'available' },
            { id: 'C5', status: 'available' },
            { id: 'C6', status: 'available' },
            { id: 'C7', status: 'available' },
            { id: 'C8', status: 'available' },
            { id: 'C9', status: 'available' },
            { id: 'C10', status: 'available' },
            { id: 'C11', status: 'available' },
            { id: 'C12', status: 'available' },
            { id: 'C13', status: 'available' },
            { id: 'C14', status: 'available' },
            { id: 'C15', status: 'available' },
            { id: 'C16', status: 'available' },
            { id: 'C17', status: 'available' },
            { id: 'C18', status: 'available' },
            { id: 'C19', status: 'available' },
            { id: 'C20', status: 'available' },
            { id: 'C21', status: 'available' },
            { id: 'C22', status: 'available' },
            { id: 'C23', status: 'available' },
            { id: 'C24', status: 'available' },
            { id: 'C25', status: 'available' },
            { id: 'C26', status: 'available' },
            { id: 'C27', status: 'available' },
            { id: 'C28', status: 'available' },
        ],
    },
    {
        row: 'D',
        seats: [
            { id: 'D1', status: 'available' },
            { id: 'D2', status: 'available' },
            { id: 'D3', status: 'available' },
            { id: 'D4', status: 'available' },
            { id: 'D5', status: 'available' },
            { id: 'D6', status: 'available' },
            { id: 'D7', status: 'available' },
            { id: 'D8', status: 'premium' },
            { id: 'D9', status: 'premium' },
            { id: 'D10', status: 'premium' },
            { id: 'D11', status: 'premium' },
            { id: 'D12', status: 'premium' },
            { id: 'D13', status: 'premium' },
            { id: 'D14', status: 'premium' },
            { id: 'D15', status: 'premium' },
            { id: 'D16', status: 'premium' },
            { id: 'D17', status: 'premium' },
            { id: 'D18', status: 'premium' },
            { id: 'D19', status: 'available' },
            { id: 'D20', status: 'available' },
            { id: 'D21', status: 'available' },
            { id: 'D22', status: 'available' },
            { id: 'D23', status: 'available' },
            { id: 'D24', status: 'available' },
            { id: 'D25', status: 'available' },
            { id: 'D26', status: 'available' },
            { id: 'D27', status: 'available' },
            { id: 'D28', status: 'available' },
        ],
    },
    {
        row: 'E',
        seats: [
            { id: 'E1', status: 'available' },
            { id: 'E2', status: 'available' },
            { id: 'E3', status: 'available' },
            { id: 'E4', status: 'available' },
            { id: 'E5', status: 'available' },
            { id: 'E6', status: 'available' },
            { id: 'E7', status: 'available' },
            { id: 'E8', status: 'available' },
            { id: 'E9', status: 'available' },
            { id: 'E10', status: 'premium'},
            { id: 'E11', status: 'premium' },
            { id: 'E12', status: 'premium' },
            { id: 'E13', status: 'premium' },
            { id: 'E14', status: 'premium'},
            { id: 'E15', status: 'premium' },
            { id: 'E16', status: 'available' },
            { id: 'E17', status: 'available' },
            { id: 'E18', status: 'premium' },
            { id: 'E19', status: 'premium' },
            { id: 'E20', status: 'premium' },
            { id: 'E21', status: 'premium' },
            { id: 'E22', status: 'premium' },
            { id: 'E23', status: 'premium' },
            { id: 'E24', status: 'available' },
            { id: 'E25', status: 'available' },
            { id: 'E26', status: 'available' },
            { id: 'E27', status: 'available' },
            { id: 'E28', status: 'available' },
            { id: 'E29', status: 'available' },
            { id: 'E30', status: 'available' },
        ],
    },
    {
        row: 'F',
        seats: [
            { id: 'F1', status: 'available'},
            { id: 'F2', status: 'available'},
            { id: 'F3', status: 'available'},
            { id: 'F4', status: 'available'},
            { id: 'F5', status: 'available'},
            { id: 'F6', status: 'available'},
            { id: 'F7', status: 'available'},
            { id: 'F8', status: 'available'},
            { id: 'F9', status: 'available'},
            { id: 'F10', status: 'available'},
            { id: 'F11', status: 'premium' },
            { id: 'F12', status: 'premium' },
            { id: 'F13', status: 'premium' },
            { id: 'F14', status: 'premium' },
            { id: 'F15', status: 'premium'},
            { id: 'F16', status: 'premium' },
            { id: 'F17', status: 'premium' },
            { id: 'F18', status: 'premium' },
            { id: 'F19', status: 'available' },
            { id: 'F20', status: 'available' },
            { id: 'F21', status: 'available' },
            { id: 'F22', status: 'available' },
            { id: 'F23', status: 'available' },
            { id: 'F24', status: 'available' },
            { id: 'F25', status: 'available' },
            { id: 'F26', status: 'available' },

        ],
    },
    {
        row: 'G',
        seats: [
            { id: 'G1', status: 'available'},
            { id: 'G2', status: 'available'},
            { id: 'G3', status: 'available' },
            { id: 'G4', status: 'available' },
            { id: 'G5', status: 'available' },
            { id: 'G6', status: 'available' },
            { id: 'G7', status: 'available' },
            { id: 'G8', status: 'available' },
            { id: 'G9', status: 'available' },
            { id: 'G10', status: 'available' },
            { id: 'G11', status: 'available' },
            { id: 'G12', status: 'available' },
            { id: 'G13', status: 'premium' },
            { id: 'G14', status: 'premium' },
            { id: 'G15', status: 'available' },
            { id: 'G16', status: 'available' },
            { id: 'G17', status: 'available' },
            { id: 'G18', status: 'available' },
            { id: 'G19', status: 'available' },
            { id: 'G20', status: 'available' },
            { id: 'G21', status: 'available' },
            { id: 'G22', status: 'available' },
        ],
    },
    {
        row: 'H',
        seats: [
            { id: 'H1', status: 'available' },
            { id: 'H2', status: 'available' },
            { id: 'H3', status: 'available' },
            { id: 'H4', status: 'available' },
            { id: 'H5', status: 'available' },
            { id: 'H6', status: 'available' },
            { id: 'H7', status: 'available' },
            { id: 'H8', status: 'available' },
            { id: 'H9', status: 'available' },
            { id: 'H10', status: 'available' },
            { id: 'H11', status: 'available' },
            { id: 'H12', status: 'available' },
            { id: 'H13', status: 'available' },
            { id: 'H14', status: 'available' },
            { id: 'H15', status: 'available' },
            { id: 'H16', status: 'available' },
        ],
    },
    {
        row: 'I',
        seats: [
            { id: 'I1', status: 'available' },
            { id: 'I2', status: 'available' },
            { id: 'I3', status: 'available' },
            { id: 'I4', status: 'available' },
            { id: 'I5', status: 'available' },
            { id: 'I6', status: 'available' },
            { id: 'I7', status: 'available' },
            { id: 'I8', status: 'available' },
            { id: 'I9', status: 'available' },
            { id: 'I10', status: 'available' },
        ],
    },
];

const SeatSelectionPage = () => {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const handleSeatClick = (seatId: string, status: SeatStatus) => {
        if (status === 'booked') return;

        setSelectedSeats(prev => {
            if (prev.includes(seatId)) {
                return prev.filter(id => id !== seatId);
            } else {
                return [...prev, seatId];
            }
        });
    };

    const getSeatColor = (seatId: string, status: SeatStatus) => {
        if (selectedSeats.includes(seatId)) {
            return 'bg-red-500 hover:bg-red-600';
        }
        switch (status) {
            case 'booked':
                return 'bg-gray-600 cursor-not-allowed';
            case 'premium':
                return 'bg-yellow-500 hover:bg-yellow-600';
            default:
                return 'bg-blue-500 hover:bg-blue-600';
        }
    };

    const isAisleRow = (rowName: string) => ['C', 'F'].includes(rowName);
    const isSpecialRow = (rowName: string) => ['A', 'B', 'G', 'H'].includes(rowName);

    return (
        <div className="min-h-screen bg-gray-900 font-sans text-gray-200 flex flex-col">
            <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
                {/* Movie Info Card */}
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-row items-center gap-4 mb-8 text-left max-w-lg w-full">
                    <img src="/posters/2.png" alt="Movie Poster" className="w-24 h-auto rounded-lg shadow-md flex-shrink-0" />
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold">Weapons (2025)</h2>
                        <p className="text-gray-400 text-sm">Thursday, Aug 31 at 4:05 PM</p>
                        <p className="text-gray-400 text-sm">Cinemark Century Mountain View 16</p>
                        <a href="#" className="text-blue-400 text-sm font-semibold hover:underline">
                            More Info
                        </a>
                    </div>
                </div>

                {/* Seat Map Section */}
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-6">SCREEN</h3>

                    {/* Seat Grid */}
                    <div className="flex flex-col items-center">
                        {mockSeatData.map(row => (
                            <div key={row.row} className="flex justify-center items-center gap-2 mb-2">
                                <span className="w-6 text-center text-gray-400 font-semibold">{row.row}</span>
                                {row.seats.map((seat, index) => (
                                    <React.Fragment key={seat.id}>
                                        <div
                                            onClick={() => handleSeatClick(seat.id, seat.status)}
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white transition-colors duration-200 cursor-pointer 
                                                        ${getSeatColor(seat.id, seat.status)}
                                                        ${seat.status === 'booked' ? 'opacity-50' : ''}`}
                                        >
                                            {seat.status === 'premium' ? '✨' : ''}
                                        </div>
                                        {/* Create the visual aisle break points */}
                                        {row.row === 'A' && (index === 5 || index === 13) && <div className="w-26"></div>}
                                        {row.row === 'B' && (index === 6 || index === 16) && <div className="w-16"></div>}
                                        {row.row === 'C' && (index === 7 || index === 19) && <div className="w-12"></div>}
                                        {row.row === 'D' && (index === 6 || index === 19) && <div className="w-12"></div>}
                                        {row.row === 'E' && (index === 8 || index === 22) && <div className="w-12"></div>}
                                        {row.row === 'F' && (index === 7) && <div className="w-35"></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Seat Legend */}
                    <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-blue-500"></span>
                            <span>Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-red-500"></span>
                            <span>Selected</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-gray-600"></span>
                            <span>Booked</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-yellow-500"></span>
                            <span>Premium</span>
                        </div>
                    </div>

                    {/* Selected Seats and Booking Button */}
                    <button className="mt-8 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-colors duration-300 transform scale-105 active:scale-100">
                        Selected: {selectedSeats.length} seats
                    </button>
                    <button className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition-colors duration-300">
                        Book Now
                    </button>
                </div>
            </main>
            <FooterStrip />
        </div>
    );
};

export default SeatSelectionPage;
