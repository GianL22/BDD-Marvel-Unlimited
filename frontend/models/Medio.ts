export interface Media {
    series:     Medio[];
    movies:     Medio[];
    videoGames: Medio[];
}

export interface Medio {
    id:     string;
    title:       string;
    releaseDate: string;
    based:       string;
}

export interface MovieAll {
    medio:           Data;
    title:           string;
    releaseDate:     string;
    synopsis:        string;
    cost:            number;
    duration:        number;
    based:           string;
    revenue:         number;
    director:        Tor;
    companyDist:     AudioVisualType;
    audioVisualType: AudioVisualType;
}
export interface SerieAll {
    medio:           Data;
    title:           string;
    releaseDate:     string;
    synopsis:        string;
    based:           string;
    channel:         string;
    episodes:        string;
    creator:         Tor;
    audioVisualType: AudioVisualType;
}

export interface VideoGameAll {
    medio:            Data;
    title:            string;
    releaseDate:      string;
    synopsis:         string;
    based:            string;
    type:             string;
    companyPublisher: AudioVisualType;
    platforms:        Platform[];
}
interface AudioVisualType {
    id:          string;
    description: string;
}

interface Tor {
    id:       string;
    name:     string;
    lastName: string;
}

interface Data {
    id:                string;
    companyProduction: AudioVisualType;
}

export interface Platform {
    id:   string;
    description: string;
}