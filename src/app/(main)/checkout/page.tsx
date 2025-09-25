"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useBookingStore } from "@/lib/store/bookingStore";
import { useRouter } from "next/navigation";
import { getSeatCodesByIds } from "@/actions/seats";
import { supabase } from "@/lib/supabaseClient";

const ORANGE = "#F05A3B";

export default function CheckoutPage() {
  const { selection } = useBookingStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [seatCodes, setSeatCodes] = useState<string[]>([]);

  useEffect(() => {
    async function fetchSeatCodes() {
      if (!selection.selectedSeats || !selection.showtimeId) {
        setSeatCodes([]);
        return;
      }
      const result = await getSeatCodesByIds(selection.showtimeId, selection.selectedSeats);
      if (result.success) {
        setSeatCodes(result.data);
      } else {
        console.error("Failed to fetch seat codes:", result.message);
        setSeatCodes([]);
      }
    }
    fetchSeatCodes();
  }, [selection.selectedSeats, selection.showtimeId]);

  const total = useMemo(() => {
    return (selection.selectedSeats?.length || 0) * (selection.ticketPrice || 0);
  }, [selection.selectedSeats, selection.ticketPrice]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Selected Seats before submit:", selection.selectedSeats); // Added log
    if (loading || !selection.selectedSeats || !selection.showtimeId) {
      alert(`Showtime ID is missing or invalid. Current showtimeId: ${selection.showtimeId}. Check console for details.`);
      return;
    }
    setLoading(true);

    try {
      const fd = new FormData(e.currentTarget);
      const cardNumber = ((fd.get("cardNumber") as string) || "").replace(/\s+/g, "");
      const cardBrand = detectBrand(cardNumber);
      const cardLast4 = cardNumber.slice(-4);

      // Commented out the booking payload and POST request
      /*
      const payload = {
        seat_id: selection.selectedSeats, // Use selectedSeats (numeric IDs) instead of seatCodes
        showtimeId: selection.showtimeId,
        movie_id: selection.movie?.id,
        time: `${new Date(selection.date || "").toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        })} at ${selection.time || ""}`,
        theater: selection.theater?.name || "",
        total,
        payment: { brand: cardBrand, last4: cardLast4 },
        user_id: "anonymous",
        user_email: "",
        booking_date: new Date().toISOString().split("T")[0],
        payment_status: "booked",
      };

      console.log("Payload:", payload);

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({} as any));
        alert(err?.error ?? "Booking failed");
        return;
      }

      const data = await res.json().catch(() => ({} as any));
      const bookingId = data?.id || data?.bookingId || crypto.randomUUID();
      */

      // Navigate directly to success page with a generated bookingId
      const bookingId = crypto.randomUUID();
      router.push(`/checkout/success?orderId=${encodeURIComponent(bookingId)}`);
    } finally {
      setLoading(false);
    }
  }

  function detectBrand(n: string): string | null {
    if (/^4\d{12,18}$/.test(n)) return "visa";
    if (/^(5[1-5]|2[2-7])\d{14}$/.test(n)) return "mastercard";
    if (/^3[47]\d{13}$/.test(n)) return "amex";
    if (/^6(?:011|5\d{2})\d{12}$/.test(n)) return "discover";
    return null;
  }

  if (!selection.movie || !selection.theater || !selection.date || !selection.time || !selection.ticketPrice || !selection.showtimeId || !selection.selectedSeats) {
    return (
        <div className="min-h-screen bg-[#0f121a] text-[#e7eaf3] px-4 py-8 md:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-xl font-extrabold">Error</h1>
            <p className="text-sm text-[#a3acc2]">Missing booking details. Please select seats and try again.</p>
            <button
                onClick={() => router.push("/seat-selection")}
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full"
            >
              Back to Seat Selection
            </button>
          </div>
        </div>
    );
  }

  return (
      <main className="min-h-screen bg-[#0f121a] text-[#e7eaf3] px-4 py-8 md:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <h1 className="mb-6 text-center text-xl font-extrabold tracking-tight">Buy Tickets</h1>

          {/* Summary */}
          <section className="mb-6 rounded-2xl border border-[#2b3450] bg-[#1b2030] p-4">
            <div className="flex gap-4">
              <div className="w-[72px] overflow-hidden rounded-md bg-[#111726] shrink-0">
                <img src={selection.movie.poster} alt={selection.movie.title} className="aspect-[2/3] w-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="text-lg font-extrabold">{selection.movie.title}</div>
                <div className="mt-1 text-sm text-[#a3acc2]">{`${new Date(selection.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })} at ${selection.time}`}</div>
                <div className="text-sm text-[#a3acc2]">{selection.theater.name}</div>
                <a href={`/movie/${selection.movie.id}`} className="text-sm text-[#7fb2ff] hover:underline">
                  More Info
                </a>
              </div>
            </div>
            <p className="mt-4 text-sm">
              <span className="font-semibold">Reserved Seating:</span> {seatCodes.join(", ") || "No seats selected"}
            </p>
          </section>

          {/* Payment */}
          <section className="rounded-2xl border border-[#2b3450] bg-[#1b2030] p-4 md:p-6">
            <h2 className="mb-3 text-base font-extrabold">Payment</h2>

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#3a4669]">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: ORANGE }} />
              </span>
                <span className="text-sm font-bold whitespace-nowrap leading-tight">
                Credit / Debit Card
              </span>
                <span className="ml-2 inline-flex items-center gap-2">
                <img src="/cards/visa.svg" alt="Visa" className="h-5 w-auto rounded-sm shadow-sm" />
                <img src="/cards/mastercard.svg" alt="Mastercard" className="h-5 w-auto rounded-sm shadow-sm" />
                <img src="/cards/amex.svg" alt="American Express" className="h-5 w-auto rounded-sm shadow-sm" />
                <img src="/cards/discover.svg" alt="Discover" className="h-5 w-auto rounded-sm shadow-sm" />
              </span>
              </div>

              <div className="flex items-center gap-1 text-xs text-[#a3acc2]">
                <span role="img" aria-label="lock">🔒</span>
                <span className="font-bold">Secure Payment</span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <label htmlFor="cardNumber" className="mb-1 block text-xs font-bold text-[#cfd5e6]">
                  Card Number<span className="text-[#a3acc2]">*</span>
                </label>
                <input
                    id="cardNumber"
                    name="cardNumber"
                    required
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="1234 5678 9012 3456"
                    className="w-full rounded-md border border-[#2b3450] bg-[#111726] px-3 py-2 text-sm outline-none focus:border-[#6aa6ff] focus:ring-2 focus:ring-[#6aa6ff]/30"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="expMonth" className="mb-1 block text-xs font-bold text-[#cfd5e6]">
                    Expiration Month*
                  </label>
                  <select
                      id="expMonth"
                      name="expMonth"
                      required
                      autoComplete="cc-exp-month"
                      className="w-full rounded-md border border-[#2b3450] bg-[#111726] px-3 py-2 text-sm outline-none focus:border-[#6aa6ff] focus:ring-2 focus:ring-[#6aa6ff]/30"
                      defaultValue=""
                  >
                    <option value="" disabled>
                      Month
                    </option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <option key={m} value={m.toString().padStart(2, "0")}>
                          {m.toString().padStart(2, "0")}
                        </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="expYear" className="mb-1 block text-xs font-bold text-[#cfd5e6]">
                    Expiration Year*
                  </label>
                  <select
                      id="expYear"
                      name="expYear"
                      required
                      autoComplete="cc-exp-year"
                      className="w-full rounded-md border border-[#2b3450] bg-[#111726] px-3 py-2 text-sm outline-none focus:border-[#6aa6ff] focus:ring-2 focus:ring-[#6aa6ff]/30"
                      defaultValue=""
                  >
                    <option value="" disabled>
                      Year
                    </option>
                    {Array.from({ length: 12 }, (_, i) => new Date().getFullYear() + i).map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="zip" className="mb-1 block text-xs font-bold text-[#cfd5e6]">
                    Billing Zip Code*
                  </label>
                  <input
                      id="zip"
                      name="zip"
                      required
                      inputMode="numeric"
                      autoComplete="postal-code"
                      placeholder="94043"
                      className="w-full rounded-md border border-[#2b3450] bg-[#111726] px-3 py-2 text-sm outline-none focus:border-[#6aa6ff] focus:ring-2 focus:ring-[#6aa6ff]/30"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="cvc" className="mb-1 block text-xs font-bold text-[#cfd5e6]">
                      Security Code*
                    </label>
                    <a href="#" className="text-xs text-[#7fb2ff] hover:underline">
                      What's this?
                    </a>
                  </div>
                  <input
                      id="cvc"
                      name="cvc"
                      required
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="123"
                      className="w-full rounded-md border border-[#2b3450] bg-[#111726] px-3 py-2 text-sm outline-none focus:border-[#6aa6ff] focus:ring-2 focus:ring-[#6aa6ff]/30"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="text-sm text-[#a3acc2]">
                  Total: <span className="text-base font-extrabold text-white">${total.toFixed(2)}</span>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="h-11 rounded-md px-6 text-sm font-extrabold text-white shadow-[0_4px_0_0_#B8402B] disabled:opacity-60"
                    style={{ background: ORANGE }}
                >
                  {loading ? "Processing..." : "Buy Tickets"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
  );
}
