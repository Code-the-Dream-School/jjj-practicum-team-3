// export interface IBooking {
//   id: string;
//   created_at: string;
//   user_id: string;
//   user_email: string;
//   seat_id: string;
//   //YYYY-MM-DD: 2030-10-02 
//   booking_date: string | Date;
//   payment_status: string;
//   showtime_id: string;
//   confirmation_code: string;
// }

export interface IBooking {
  id: string;
  created_at: string;
  user_id: string;
  user_email: string;
  seat_id: string | string[];   // array in DB, but could be stringified
  booking_date: string | Date;
  payment_status: string;
  showtime_id: string;
  confirmation_code: string;

  // add missing fields
  status: string;
  movie_id: string;
  total_tickets: number;
  total_amount: number;
}