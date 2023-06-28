
export interface Client{
    id: string;
    username: string;
    isActive: boolean;
    name: string;
    lastName: string;
    email:     string;
    birthdate: string;
    city:      City;
    profiles:Profile[],
}

export interface Profile{
    id:string;
    userId: string
    nickname: string;
    language: string;
    hourConexion: number;
    device: string;
    timeWatched: number;
    emailProfile: string;
    avatar: string;
}

interface City {
    id:          string;
    description: string;
    country:     Country;
}

interface Country {
    description: string;
}