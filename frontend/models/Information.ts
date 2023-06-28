export interface InformationResponse {
  colors:      Color[];
  nacionality: GenericResponse[];
  occupations: GenericResponse[];
  objects:     GenericResponse[];
  persons:    Creator;
}

export interface Creator {
  creators: Person[];
}

interface Color {
  id:          string;
  description: string;
}

export interface GenericResponse {
  id:   string;
  description: string;
}

export interface FormMedia {
  AudioVisualTypes: AudioVisualType[];
  companies:        AudioVisualType[];
  persons:          Persons;
  platforms:   GenericResponse[];
}

interface AudioVisualType {
  id:          string;
  description: string;
}

interface Persons {
  directors: Person[];
  creators:  Person[];
}

export interface Person{
  id:       string;
  name:     string;
  lastName: string;
}
