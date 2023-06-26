export interface InformationResponse {
  colors:      Color[];
  nacionality: GenericResponse[];
  occupations: GenericResponse[];
  objects:     GenericResponse[];
}

export interface Color {
  id:          string;
  description: string;
}

export interface GenericResponse {
  id:   string;
  description: string;
}
