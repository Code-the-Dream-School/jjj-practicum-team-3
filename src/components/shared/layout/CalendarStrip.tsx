"use client";

import React, { useMemo, useState } from "react";

type Props = {
  startDate?: Date;
  days?: number;
  tilesPerPage?: number;
  value?: Date;
  onChange?: (d: Date) => void;
  className?: string;
  locale?: string;
};

const ORANGE = "#F05A3B";
const RED = "#E04A4A";
const TILE_BG = "#1b2030";
const STRIP_BG = "#141923";

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  x.setHours(0, 0, 0, 0); // Normalize to midnight to avoid time zone issues
  return x;
}
function sameDay(a: Date, b: Date) {
  return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
  );
}

export default function CalendarStrip({
                                        startDate,
                                        days = 28,
                                        tilesPerPage = 8,
                                        value,
                                        onChange,
                                        className = "",
                                        locale = "en-US",
                                      }: Props) {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0); // Normalize to midnight
    return t;
  }, []);
  const base = useMemo(() => {
    const b = startDate ?? today;
    b.setHours(0, 0, 0, 0); // Normalize to midnight
    return b;
  }, [startDate, today]);

  const items = useMemo(
      () => Array.from({ length: days }, (_, i) => addDays(base, i)),
      [base, days]
  );

  const numPages = Math.ceil(items.length / tilesPerPage);
  const [page, setPage] = useState(0);

  const [internal, setInternal] = useState<Date>(value ?? base);
  const selected = value ?? internal;

  const fmtDow = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const fmtMon = new Intl.DateTimeFormat(locale, { month: "short" });
  const fmtDay = new Intl.DateTimeFormat(locale, { day: "2-digit" });

  function setSelected(d: Date) {
    const normalizedDate = new Date(d);
    normalizedDate.setHours(0, 0, 0, 0); // Normalize to midnight
    setInternal(normalizedDate);
    onChange?.(normalizedDate);
  }

  function handlePrev() {
    setPage((p) => (p - 1 + numPages) % numPages);
  }
  function handleNext() {
    setPage((p) => (p + 1) % numPages);
  }

  const start = page * tilesPerPage;
  const end = start + tilesPerPage;
  const pageItems = items.slice(start, end);

  return (
      <div
          className={`relative w-full rounded-2xl p-2 ${className}`}
          style={{ backgroundColor: STRIP_BG }}
      >
        {/* Left arrow */}
        {numPages > 1 && (
            <button
                type="button"
                aria-label="Previous"
                onClick={handlePrev}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-md"
            >
              ◀
            </button>
        )}

        {/* Dates */}
        <div className="mx-10 flex gap-2 justify-center md:justify-start">
          {pageItems.map((d) => {
            const isToday = sameDay(d, today);
            const isActive = sameDay(d, selected);

            return (
                <button
                    key={d.toDateString()}
                    role="option"
                    aria-selected={isActive}
                    onClick={() => setSelected(d)}
                    className="px-3 py-2 rounded-md text-left select-none outline-none focus-visible:ring-2"
                    style={{
                      minWidth: 70,
                      backgroundColor: isActive ? ORANGE : TILE_BG,
                      color: isActive ? "#0b0f18" : "#e7eaf3",
                      border: `1px solid ${RED}`,
                    }}
                >
                  {isToday && (
                      <div
                          className="mb-1 rounded-sm px-1.5 py-0.5 text-[10px] font-extrabold leading-none"
                          style={{ backgroundColor: ORANGE, color: "#0b0f18" }}
                      >
                        Today
                      </div>
                  )}
                  <div className="text-xs font-bold tracking-wide">
                    {fmtDow.format(d).toUpperCase()}
                  </div>
                  <div className="text-[11px] opacity-90">
                    {fmtMon.format(d).toUpperCase()} {fmtDay.format(d)}
                  </div>
                </button>
            );
          })}
        </div>

        {/* Right Arrow */}
        {numPages > 1 && (
            <button
                type="button"
                aria-label="Next"
                onClick={handleNext}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-md"        >
              ▶
            </button>
        )}
      </div>
  );
}
