export interface IUser {
    id: string;
    email: string;
    password?: string; 
    username?: string;
    role: "user" | "admin";
    created_at?: string;
  }

export interface IMovie {
    id: number | string;
    title: string;
    poster?: string;
    runtime?: string;
    description?: string;
    genre?: string | string[];
    director?: string;
    actors?: string;
    country?: string;
    release_date?: string;
    year?: number;
    comingsoon?: boolean;
}

export interface ITheater {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    movies: ITheaterMovie[];
}

export interface ITheaterMovie {
    title: string;
    showtimes: IShowtimes[];
}

export interface IShowtimes {
    id: string;
    movie_id: number; // Match bigint
    theater_id: string;
    date: string;
    time: string;
    ticket_price: number;
    available_seats: number;
    created_at: string;
    is_active: boolean;
    movie?: { title: string; poster?: string; runtime?: string };
}

export interface ITheaterWithDistance extends ITheater {
    distance: number;
}

export interface IShowtimeGroup {
    theater: ITheater;
    shows: { id: string; date: string; time: string; ticket_price: number }[];
}
