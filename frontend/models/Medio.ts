export interface Media {
    series: Medio[];
    movies: Medio[];
    videoGames: Medio[];
}

export interface Medio {
    id: string;
    title: string;
    releaseDate: string;
    based: string;
}

export interface MovieAll {
    medio: Data;
    title: string;
    releaseDate: string;
    synopsis: string;
    cost: number;
    duration: number;
    based: string;
    revenue: number;
    poster: string;
    director: Tor;
    companyDist: AudioVisualType;
    audioVisualType: AudioVisualType;
}
export interface SerieAll {
    medio: Data;
    title: string;
    releaseDate: string;
    synopsis: string;
    based: string;
    channel: string;
    episodes: string;
    poster: string;
    creator: Tor;
    audioVisualType: AudioVisualType;
}

export interface VideoGameAll {
    medio: Data;
    title: string;
    releaseDate: string;
    synopsis: string;
    based: string;
    type: string;
    poster: string;
    companyPublisher: AudioVisualType;
    platforms: Platform[];
}
interface AudioVisualType {
    id: string;
    description: string;
}

interface Tor {
    id: string;
    name: string;
    lastName: string;
}

interface Data {
    id: string;
    companyProduction: AudioVisualType;
    rating: Rating;
}

export interface Rating {
    ratingAvg: number | null;
    ratingCount: number;
}

export interface Platform {
    id: string;
    description: string;
}

export interface SerieServer {
    serie: SerieAll;
    profileMyList: MediosList;
    profilePreferenceList: MediosList;
    ratingOfMedioByProfile: number;
    progressOfMedios: { serieProgress: number };
}

export interface MovieServer {
    movie: MovieAll;
    profileMyList: MediosList;
    profilePreferenceList: MediosList;
    ratingOfMedioByProfile: number;
    progressOfMedios: { movieProgress: number };
}

export interface VideoGameServer {
    videoGame: MovieAll;
    profileMyList: MediosList;
    profilePreferenceList: MediosList;
    ratingOfMedioByProfile: number;
    progressOfMedios: { videoGameProgress: boolean };
}

interface MediosList {
    medios: { id: string }[];
}

export interface ProfileMyList {
    profileId: string;
    medios: MedioList[];
}

interface MedioList {
    id: string;
    title: string;
    poster: string;
    type: string;
}