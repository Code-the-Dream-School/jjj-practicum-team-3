'use server';

import { supabase } from '@/lib/supabaseClient';

interface Seat {
    id: string;
    showtime_id: string;
    row: string;
    number: number;
    seat_status: 'available' | 'selected' | 'booked' | 'premium';
    seat_code: string;
}

interface SeatRow {
    row: string;
    seats: Seat[];
}

export async function getSeatsByShowtimeId(showtimeId: string): Promise<{
    success: boolean;
    data?: SeatRow[];
    message?: string;
}> {
    try {
        const { data, error } = await supabase
            .from('seats')
            .select('id, showtime_id, row, number, seat_status, seat_code')
            .eq('showtime_id', showtimeId)
            .order('row', { ascending: true })
            .order('number', { ascending: true });

        if (error) {
            console.error('Supabase error in getSeatsByShowtimeId:', showtimeId, error);
            return { success: false, message: error.message };
        }

        if (!data || data.length === 0) {
            console.warn('No seats found for showtime ID:', showtimeId);
            return { success: true, data: [], message: 'No seats available' };
        }

        const seatRows: SeatRow[] = [];
        const rowMap: { [key: string]: Seat[] } = {};

        data.forEach((seat: Seat) => {
            if (!rowMap[seat.row]) {
                rowMap[seat.row] = [];
            }
            rowMap[seat.row].push({
                id: seat.id,
                showtime_id: seat.showtime_id,
                row: seat.row,
                number: seat.number,
                seat_status: seat.seat_status,
                seat_code: seat.seat_code,
            });
        });

        for (const row in rowMap) {
            seatRows.push({ row, seats: rowMap[row] });
        }

        return { success: true, data: seatRows };
    } catch (err) {
        console.error('Unexpected error in getSeatsByShowtimeId:', showtimeId, err);
        return { success: false, message: 'Internal server error' };
    }
}

export async function bookSeats(
    showtimeId: string,
    seatIds: string[]
): Promise<{ success: boolean; message?: string }> {
    try {
        const { error } = await supabase
            .from('seats')
            .update({ seat_status: 'booked' })
            .in('id', seatIds)
            .eq('showtime_id', showtimeId)
            .eq('seat_status', 'available');

        if (error) {
            console.error('Supabase error in bookSeats:', showtimeId, error);
            return { success: false, message: error.message };
        }

        return { success: true };
    } catch (err) {
        console.error('Unexpected error in bookSeats:', showtimeId, err);
        return { success: false, message: 'Internal server error' };
    }
}

export async function getSeatCodesByIds(showtimeId: string, seatIds: string[]): Promise<{
    success: boolean;
    data?: string[];
    message?: string;
}> {
    try {
        const { data, error } = await supabase
            .from('seats')
            .select('seat_code')
            .eq('showtime_id', showtimeId)
            .in('id', seatIds);

        if (error) {
            console.error('Supabase error in getSeatCodesByIds:', showtimeId, error);
            return { success: false, message: error.message };
        }

        if (!data || data.length === 0) {
            console.warn('No seat codes found for showtime ID:', showtimeId, 'and seat IDs:', seatIds);
            return { success: true, data: [], message: 'No seat codes found' };
        }

        return {
            success: true,
            data: data.map((seat) => seat.seat_code),
        };
    } catch (err) {
        console.error('Unexpected error in getSeatCodesByIds:', showtimeId, err);
        return { success: false, message: 'Internal server error' };
    }
}
