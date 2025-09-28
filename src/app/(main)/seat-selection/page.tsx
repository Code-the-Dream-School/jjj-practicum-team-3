"use client";

import React, { useState, useEffect } from "react";
import FooterStrip from "@/components/shared/layout/FooterStrip";
import { useBookingStore } from "@/lib/store/bookingStore";
import { getSeatsByShowtimeId, bookSeats } from "@/actions/seats";
import { useRouter } from "next/navigation";

type SeatStatus = "available" | "selected" | "booked" | "premium";

interface Seat {
    id: string;
    showtime_id: string;
    row: string;
    number: number;
    seat_status: SeatStatus;
    seat_code: string;
}

interface SeatRow {
    row: string;
    seats: Seat[];
}

const SeatSelectionPage = () => {
    const { selection, setSelection } = useBookingStore();
    const [seatData, setSeatData] = useState<SeatRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchSeats() {
            if (!selection.showtimeId) {
                setError("No showtime selected");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                console.log("Showtime ID:", selection.showtimeId);
                const result = await getSeatsByShowtimeId(selection.showtimeId);
                if (result.success) {
                    console.log("Seats data:", result.data);
                    setSeatData(result.data);
                } else {
                    setError(result.message);
                }
            } catch (err) {
                setError("Failed to fetch seats");
                console.error("Error fetching seats:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchSeats();
    }, [selection.showtimeId]);

    const handleSeatClick = (seatId: string, status: SeatStatus) => {
        if (status === "booked") return;

        const newSelectedSeats = selection.selectedSeats?.includes(seatId)
            ? selection.selectedSeats.filter((id) => id !== seatId)
            : [...(selection.selectedSeats || []), seatId];
        setSelection({ selectedSeats: newSelectedSeats });
    };

    const handleBookNow = async () => {
        if (!selection.selectedSeats || selection.selectedSeats.length === 0 || !selection.showtimeId) return;

        try {
            setLoading(true);
            const result = await bookSeats(selection.showtimeId, selection.selectedSeats);
            if (result.success) {
                router.push("/checkout");
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("Failed to book seats");
            console.error("Booking error:", err);
        } finally {
            setLoading(false);
        }
    };

    const getSeatColor = (seatId: string, status: SeatStatus) => {
        if (selection.selectedSeats?.includes(seatId)) {
            return "bg-red-500 hover:bg-red-600";
        }
        switch (status) {
            case "booked":
                return "bg-gray-600 cursor-not-allowed";
            case "premium":
                return "bg-yellow-500 hover:bg-yellow-600";
            default:
                return "bg-blue-500 hover:bg-blue-600";
        }
    };

    const isAisleRow = (rowName: string) => ["C", "F"].includes(rowName);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 font-sans text-gray-200 flex flex-col">
                <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
                    <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold">Loading...</h2>
                    </div>
                    <FooterStrip />
                </main>
            </div>
        );
    }

    if (error || !selection.movie || !selection.theater || !selection.date || !selection.time || !selection.ticketPrice) {
        return (
            <div className="min-h-screen bg-gray-900 font-sans text-gray-200 flex flex-col">
                <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
                    <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold">Error</h2>
                        <p className="text-gray-400">{error || "Missing selection data"}</p>
                    </div>
                    <FooterStrip />
                </main>
            </div>
        );
    }

    const totalPrice = (selection.selectedSeats?.length || 0) * selection.ticketPrice;

    return (
        <div className="min-h-screen bg-gray-900 font-sans text-gray-200 flex flex-col">
            <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-row items-center gap-4 mb-8 text-left max-w-lg w-full">
                    <img
                        src={selection.movie.poster}
                        alt={selection.movie.title}
                        className="w-24 h-auto rounded-lg shadow-md flex-shrink-0"
                    />
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold">{selection.movie.title}</h2>
                        <p className="text-gray-400 text-sm">
                            {new Date(selection.date).toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "short",
                                day: "numeric",
                            })} at {selection.time}
                        </p>
                        <p className="text-gray-400 text-sm">{selection.theater.name}</p>
                        <p className="text-gray-400 text-sm">
                            Ticket Price: ${selection.ticketPrice.toFixed(2)}
                        </p>
                        <a
                            href={`/movie/${selection.movie.id}`}
                            className="text-blue-400 text-sm font-semibold hover:underline"
                        >
                            More Info
                        </a>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-6">SCREEN</h3>

                    <div className="flex flex-col items-center">
                        {seatData.map((row) => (
                            <div key={row.row} className="flex justify-center items-center gap-2 mb-2">
                                <span className="w-6 text-center text-gray-400 font-semibold">{row.row}</span>
                                {row.seats.map((seat, index) => (
                                    <React.Fragment key={seat.id}>
                                        <div
                                            onClick={() => handleSeatClick(seat.id, seat.seat_status)}
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white transition-colors duration-200 cursor-pointer 
                        ${getSeatColor(seat.id, seat.seat_status)}
                        ${seat.seat_status === "booked" ? "opacity-50" : ""}`}
                                        >
                                            {seat.seat_status?.toLowerCase() === "premium" ? "✨" : ""}
                                        </div>
                                        {row.row === "A" && (index === 5 || index === 13) && <div className="w-26"></div>}
                                        {row.row === "B" && (index === 6 || index === 16) && <div className="w-16"></div>}
                                        {row.row === "C" && (index === 7 || index === 19) && <div className="w-12"></div>}
                                        {row.row === "D" && (index === 6 || index === 19) && <div className="w-12"></div>}
                                        {row.row === "E" && (index === 8 || index === 22) && <div className="w-12"></div>}
                                        {row.row === "F" && index === 7 && <div className="w-35"></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                        ))}
                    </div>

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

                    <div className="mt-8 text-center">
                        <p className="text-gray-200 font-semibold">
                            Selected: {selection.selectedSeats?.length || 0} seats (${totalPrice.toFixed(2)})
                        </p>
                        <button
                            onClick={handleBookNow}
                            disabled={!(selection.selectedSeats?.length > 0)}
                            className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </main>
            <FooterStrip />
        </div>
    );
};

export default SeatSelectionPage;
