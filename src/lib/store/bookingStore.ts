import { create } from "zustand";

type Movie = {
    id: string;
    title: string;
    poster: string;
};

type Theater = {
    id: string;
    name: string;
};

type Selection = {
    movie?: Movie;
    theater?: Theater;
    date?: string;
    time?: string;
    ticketPrice?: number;
    showtimeId?: string;
    selectedSeats?: string[];
};

type BookingStore = {
    selection: Selection;
    setSelection: (partialSelection: Partial<Selection>) => void;
    clearSelection: () => void;
};

export const useBookingStore = create<BookingStore>((set) => ({
    selection: {},
    setSelection: (partialSelection) =>
        set((state) => ({
            selection: { ...state.selection, ...partialSelection },
        })),
    clearSelection: () =>
        set(() => ({
            selection: {},
        })),
}));
