export interface InformationResponse {
  colors:      Color[];
  nacionality: GenericResponse[];
  occupations: GenericResponse[];
  objects:     GenericResponse[];
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

interface Person{
  id:       string;
  name:     string;
  lastName: string;
}
