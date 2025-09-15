import {ITheaterMovie} from "@/types/ITheaterMovie";

export interface ITheater {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    address: string;
    movies: ITheaterMovie[];
}
