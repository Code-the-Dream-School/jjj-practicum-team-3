"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";

const ORANGE = "#F05A3B";

type Movie = {
  id: string;
  Title: string;
  Year: string;
  RunTime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Description: string;
  Country: string;
  Poster: string;
  ComingSoon: boolean;
};

/* STATIC SEED DATA — replace with API later */
const movieData: { movies: Movie[] } = {
  movies: [
    { id: "1", Title: "Nobody 2", Year: "2025", RunTime: "1 hr 29 min", Genre: "Action", Director: "Timo Tjahjanto", Actors: "Bob Odenkirk, Connie Nielsen, John Ortiz", Description: "Workaholic assassin Hutch Mansell takes his family on a much-needed vacation...", Country: "United States", Poster: "/posters/1.png", ComingSoon: false },
    { id: "2", Title: "Weapons", Year: "2025", RunTime: "2 hr 8 min", Genre: "Horror", Director: "Zach Cregger", Actors: "Josh Brolin, Julia Garner, Alden Ehrenreich", Description: "An interrelated, multistory horror epic...", Country: "United States", Poster: "/posters/2.png", ComingSoon: false },
    { id: "3", Title: "Highest 2 Lowest", Year: "2025", RunTime: "2 hr 13 min", Genre: "Drama", Director: "Spike Lee", Actors: "Denzel Washington, Jeffrey Wright, Ilfenesh Hadera", Description: "When a titan music mogul...", Country: "United States", Poster: "/posters/3.png", ComingSoon: false },
    { id: "4", Title: "F1 The Movie", Year: "2025", RunTime: "2 hr 35 min", Genre: "Drama", Director: "Joseph Kosinski", Actors: "Brad Pitt, Kerry Condon, Javier Bardem", Description: "Dubbed “the greatest that never was,”...", Country: "United States", Poster: "/posters/4.png", ComingSoon: false },
    { id: "5", Title: "Freakier Friday", Year: "2025", RunTime: "2 hr 51 min", Genre: "Comedy", Director: "Nisha Ganatra", Actors: "Jamie Lee Curtis, Lindsay Lohan, Mark Harmon", Description: "Tess and Anna discover that lightning may indeed strike twice...", Country: "United States", Poster: "/posters/5.png", ComingSoon: false },
    { id: "6", Title: "The Fantastic Four: First Steps", Year: "2025", RunTime: "1 hr 55 min", Genre: "Action", Director: "Matt Shakman", Actors: "Pedro Pascal, Vanessa Kirby, Ebon Moss-Bachrach", Description: "Set against the vibrant backdrop...", Country: "United States", Poster: "/posters/6.png", ComingSoon: false },
    { id: "7", Title: "Americana", Year: "2025", RunTime: "1 hr 47 min", Genre: "Thriller", Director: "Tony Tost", Actors: "Sydney Sweeney, Paul Walter Hauser, Zahn McClarnon", Description: "A gallery of dynamic characters clash...", Country: "United States", Poster: "/posters/7.png", ComingSoon: false },
    { id: "8", Title: "The Bad Guys 2", Year: "2025", RunTime: "1 hr 44 min", Genre: "Animated", Director: "Pierre Perifel", Actors: "Sam Rockwell, Marc Maron, Awkwafina", Description: "Everyone’s favorite felons are back...", Country: "United States", Poster: "/posters/8.png", ComingSoon: false },
    { id: "9", Title: "Shin Godzilla 4K", Year: "2025", RunTime: "2 hr", Genre: "Action", Director: "Hideaki Anno and Shinji Higuchi", Actors: "Hiroki Hasegawa, Yutaka Takenouchi, Satomi Ishihara", Description: "Something has surfaced in Tokyo Bay...", Country: "United States", Poster: "/posters/9.png", ComingSoon: false },
    { id: "10", Title: "The Naked Gun", Year: "2025", RunTime: "1 hr 25 min", Genre: "Comedy", Director: "Akiva Schaffer", Actors: "Liam Neeson, Pamela Anderson, Paul Walter Hauser", Description: "Only one man has the particular set of skills...", Country: "United States", Poster: "/posters/10.png", ComingSoon: false },
    { id: "11", Title: "Captain America: Brave New World", Year: "2025", RunTime: "2 hr 10 min", Genre: "Action", Director: "Julius Onah", Actors: "Anthony Mackie, Danny Ramirez, Shira Haas", Description: "Sam Wilson, the new Captain America...", Country: "United States", Poster: "/posters/11.png", ComingSoon: false },
    { id: "12", Title: "Mufasa: The Lion King", Year: "2025", RunTime: "1 hr 59 min", Genre: "Animated", Director: "Barry Jenkins", Actors: "Aaron Pierre, Kelvin Harrison Jr., Tiffany Boone", Description: "A prequel to The Lion King...", Country: "United States", Poster: "/posters/12.png", ComingSoon: true },
    { id: "13", Title: "A Complete Unknown", Year: "2025", RunTime: "2 hr 21 min", Genre: "Drama", Director: "James Mangold", Actors: "Timothée Chalamet, Elle Fanning, Boyd Holbrook", Description: "A biographical drama chronicling Bob Dylan’s rise...", Country: "United States", Poster: "/posters/13.png", ComingSoon: true },
    { id: "14", Title: "Thunderbolts", Year: "2025", RunTime: "2 hr 5 min", Genre: "Action", Director: "Jake Schreier", Actors: "Sebastian Stan, Florence Pugh, David Harbour", Description: "A team of antiheroes is assembled...", Country: "United States", Poster: "/posters/14.png", ComingSoon: true },
    { id: "15", Title: "The Gorge", Year: "2025", RunTime: "1 hr 50 min", Genre: "Sci-Fi", Director: "Scott Derrickson", Actors: "Anya Taylor-Joy, Miles Teller, Sigourney Weaver", Description: "Two soldiers on opposite sides of a chasm...", Country: "United States", Poster: "/posters/15.png", ComingSoon: true },
    { id: "16", Title: "Den of Thieves 2: Pantera", Year: "2025", RunTime: "2 hr", Genre: "Action", Director: "Christian Gudegast", Actors: "Gerard Butler, O’Shea Jackson Jr., Meadow Williams", Description: "Big Nick O’Brien leads his elite crew...", Country: "United States", Poster: "/posters/16.png", ComingSoon: true },
    { id: "17", Title: "Presence", Year: "2025", RunTime: "1 hr 45 min", Genre: "Horror", Director: "Steven Soderbergh", Actors: "Lucy Liu", Description: "A woman discovers a ghostly presence...", Country: "United States", Poster: "/posters/17.png", ComingSoon: true },
    { id: "18", Title: "Sketch", Year: "2025", RunTime: "1 hr 55 min", Genre: "Horror", Director: "Alex O'Loughlin", Actors: "Alex O'Loughlin, Jason Clarke", Description: "A talented but haunted artist is pursued...", Country: "United States", Poster: "/posters/18.png", ComingSoon: true },
    { id: "19", Title: "The Bad Guys 2", Year: "2025", RunTime: "1 hr 44 min", Genre: "Animated", Director: "Pierre Perifel", Actors: "Sam Rockwell, Marc Maron, Awkwafina", Description: "Our now-reformed Bad Guys are hijacked into a heist...", Country: "United States", Poster: "/posters/8.png", ComingSoon: false },
    { id: "20", Title: "Clixk", Year: "2025", RunTime: "1 hr 44 min", Genre: "Thriller", Director: "Unknown", Actors: "Unknown", Description: "An influencer’s life turns into a nightmare...", Country: "United States", Poster: "/posters/19.png", ComingSoon: true },
    { id: "21", Title: "Freakier Friday Double Feature", Year: "2025", RunTime: "3 hr 30 min", Genre: "Comedy", Director: "Nisha Ganatra", Actors: "Jamie Lee Curtis, Lindsay Lohan", Description: "Lightning may strike twice...", Country: "United States", Poster: "/posters/20.png", ComingSoon: true },
    { id: "22", Title: "Stans", Year: "2025", RunTime: "2 hr 5 min", Genre: "Horror", Director: "Unknown", Actors: "Unknown", Description: "A group of fans goes to extreme lengths...", Country: "United States", Poster: "/posters/21.png", ComingSoon: true },
  ],
};

export default function CheckoutPage() {
  const qp = useSearchParams();

  /* READING PARAMETERS FROM URL */
  const movieId = qp.get("id") ?? "11"; 
  const time = qp.get("time") ?? "Thursday, Jul 31 at 4:05 PM";
  const theater = qp.get("theater") ?? "Cinemark Century Mountain View 16";
  const seats = useMemo(
    () =>
      (qp.get("seats") ?? "F18,F19")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    [qp]
  );
  const total = Number(qp.get("total") ?? 28);

  /* FIND FILM */
  const movie = useMemo(
    () => movieData.movies.find((m) => m.id === movieId) ?? movieData.movies[0],
    [movieId]
  );

  return (
    <main className="min-h-screen bg-[#0f121a] text-[#e7eaf3] px-4 py-8 md:px-6 lg:px-8">
      <div className="w-[400px] mx-auto max-w-4xl">
        <h1 className="mb-6 text-center text-xl font-extrabold tracking-tight">
          Buy Tickets
        </h1>

        {/* Movie summary */}
        <section className="w-[400px] mb-6 rounded-2xl border border-[#2b3450] bg-[#1b2030] p-4 md:p-6">
          <div className="flex gap-4">
            <div className="w-[72px] overflow-hidden rounded-md bg-[#111726] md:w-[72px]">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="aspect-[2/3] w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="text-lg font-extrabold">
                {movie.Title} ({movie.Year})
              </div>
              <div className="mt-1 text-sm text-[#a3acc2]">{time}</div>
              <div className="text-sm text-[#a3acc2]">{theater}</div>
              <a
                href={`/movie/${movie.id}`}
                className="mt-1 inline-flex items-center gap-1 text-sm text-[#7fb2ff] hover:underline"
              >
                More Info
              </a>
            </div>
          </div>
        </section>

        {/* Reserved seats */}
        <p className="mb-6 text-sm">
          <span className="font-semibold">Reserved Seating:</span>{" "}
          {seats.length ? seats.join(", ") : "—"}
        </p>

        {/* Payment */}
        <section className="w-[400px] rounded-2xl border border-[#2b3450] bg-[#1b2030] p-4 md:p-6">
          <h2 className="mb-4 text-base font-extrabold">Payment</h2>

          {/* method row */}
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#3a4669]">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: ORANGE }} />
              </span>

              <span className="text-sm font-bold whitespace-nowrap leading-tight">
                Credit / Debit Card
              </span>
            </div>
              <div className="ml-2 flex items-center gap-2">
                <img src="/cards/visa.svg" alt="Visa" className="h-6" />
                <img src="/cards/mastercard.svg" alt="MasterCard" className="h-6" />
                <img src="/cards/amex.svg" alt="American Express" className="h-6" />
                <img src="/cards/discover.svg" alt="Discover" className="h-6" />
              </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-[#a3acc2]">
              <span role="img" aria-label="lock">🔒</span>
              <span className="font-bold">Secure Payment</span>
            </div>
          </div>
          {/* form */}
          <form className="space-y-4">
            {/* Card number */}
            <div>
              <label
                htmlFor="card"
                className="mb-1 block text-xs font-bold text-[#cfd5e6]"
              >
                Card Number<span className="text-[#a3acc2]">*</span>
              </label>
              <input
                id="card"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="1234 5678 9012 3456"
                className="w-full rounded-md border border-[#2b3450] bg-[#111726] px-3 py-2 text-sm outline-none focus:border-[#6aa6ff] focus:ring-2 focus:ring-[#6aa6ff]/30"
              />
            </div>

            {/* Expiration + Year */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="expMonth"
                  className="mb-1 block text-xs font-bold text-[#cfd5e6]"
                >
                  Expiration Month<span className="text-[#a3acc2]">*</span>
                </label>
                <select
                  id="expMonth"
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
                <label
                  htmlFor="expYear"
                  className="mb-1 block text-xs font-bold text-[#cfd5e6]"
                >
                  Expiration Year<span className="text-[#a3acc2]">*</span>
                </label>
                <select
                  id="expYear"
                  autoComplete="cc-exp-year"
                  className="w-full rounded-md border border-[#2b3450] bg-[#111726] px-3 py-2 text-sm outline-none focus:border-[#6aa6ff] focus:ring-2 focus:ring-[#6aa6ff]/30"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Year
                  </option>
                  {Array.from({ length: 12 }, (_, i) => new Date().getFullYear() + i).map(
                    (y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* Zip + CVC */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr,1fr]">
              <div>
                <label
                  htmlFor="zip"
                  className="mb-1 block text-xs font-bold text-[#cfd5e6]"
                >
                  Billing Zip Code<span className="text-[#a3acc2]">*</span>
                </label>
                <input
                  id="zip"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="94043"
                  className="w-full rounded-md border border-[#2b3450] bg-[#111726] px-3 py-2 text-sm outline-none focus:border-[#6aa6ff] focus:ring-2 focus:ring-[#6aa6ff]/30"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="cvc"
                    className="mb-1 block text-xs font-bold text-[#cfd5e6]"
                  >
                    Security Code<span className="text-[#a3acc2]">*</span>
                  </label>
                  <a href="#" className="text-xs text-[#7fb2ff] hover:underline">
                    What’s this?
                  </a>
                </div>
                <input
                  id="cvc"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="123"
                  className="w-full rounded-md border border-[#2b3450] bg-[#111726] px-3 py-2 text-sm outline-none focus:border-[#6aa6ff] focus:ring-2 focus:ring-[#6aa6ff]/30"
                />
              </div>
            </div>
          </form>
        </section>

        {/* footer: total + submit */}
        <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-[#a3acc2]">
            Total:{" "}
            <span className="text-base font-extrabold text-white">
              ${total.toFixed(2)}
            </span>
          </div>
          <button
            type="button"
            className="h-11 rounded-md px-6 text-sm font-extrabold text-white shadow-[0_4px_0_0_#B8402B]"
            style={{ background: ORANGE }}
            onClick={() => alert("Demo only — no real payment")}
          >
            Buy Tickets
          </button>
        </div>
      </div>
    </main>
  );
}