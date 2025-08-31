export interface IBooking {
  id: string;
  created_at: string;
  user_id: string;
  user_email: string;
  seat_id: string;
  booking_date: string;
  payment_status: string;
  showtime_id: string;
  confirmation_code: string;
}
