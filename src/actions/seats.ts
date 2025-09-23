'use server';

import supabase from '@/config/supabase-config';

type SeatStatus = 'available' | 'selected' | 'booked' | 'premium';

interface Seat {
    id: number;
    showtime_id: number;
    row: string;
    number: number;
    seat_status: SeatStatus;
    seat_code: string;
}

interface SeatRow {
    row: string;
    seats: Seat[];
}

export const getSeatsByShowtimeId = async (showtimeId: string) => {
    console.log("Fetching seats for showtimeId:", showtimeId);
    try {
        const { data, error } = await supabase
            .from('seats')
            .select('id, showtime_id, row, number, seat_status, seat_code')
            .eq('showtime_id', parseInt(showtimeId))
            .order('row')
            .order('number');

        console.log("Supabase response:", { data, error });

        if (error) {
            return { success: false, message: error.message, data: [] };
        }

        if (!data || data.length === 0) {
            return { success: true, message: 'No seats found', data: [] };
        }

        const seatRows: SeatRow[] = [];
        const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
        for (const row of rows) {
            const rowSeats = data
                .filter((seat: Seat) => seat.row === row)
                .sort((a: Seat, b: Seat) => a.number - b.number);
            if (rowSeats.length > 0) {
                seatRows.push({ row: row, seats: rowSeats });
            }
        }

        return { success: true, message: 'Seats fetched successfully', data: seatRows };
    } catch (error) {
        console.error("Caught error in getSeatsByShowtimeId:", error);
        return { success: false, message: 'Failed to fetch seats', data: [] };
    }
};

export const getSeatCodesByIds = async (showtimeId: string, seatIds: string[]) => {
    try {
        const { data, error } = await supabase
            .from('seats')
            .select('seat_code')
            .in('id', seatIds.map(id => parseInt(id)))
            .eq('showtime_id', parseInt(showtimeId));

        console.log("Get seat codes response:", { data, error });

        if (error) {
            return { success: false, message: error.message, data: [] };
        }

        return { success: true, message: 'Seat codes fetched', data: data.map((item) => item.seat_code) };
    } catch (error) {
        console.error("Caught error in getSeatCodesByIds:", error);
        return { success: false, message: 'Failed to fetch seat codes', data: [] };
    }
};

export const bookSeats = async (showtimeId: string, seatIds: string[]) => {
    try {
        const { error } = await supabase
            .from('seats')
            .update({ seat_status: 'booked' })
            .in('id', seatIds.map(id => parseInt(id)))
            .eq('showtime_id', parseInt(showtimeId));
        if (error) return { success: false, message: error.message };
        return { success: true, message: 'Seats booked successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to book seats' };
    }
};
