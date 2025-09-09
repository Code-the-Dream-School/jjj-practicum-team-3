import {ITheaterMovie} from "@/types/ITheaterMovie";

export interface ITheater {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    address: string;
    movies: ITheaterMovie[];
}
