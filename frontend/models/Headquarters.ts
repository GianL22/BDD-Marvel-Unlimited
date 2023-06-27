import { GenericResponse } from "./Information";

interface HeadquarterResponse {
    headquarters: Headquarters[];
}

export interface Headquarter{
    headquarter: Headquarters
}

interface Headquarters {
    id :string;
    name:         string;
    buildingType: GenericResponse;
    organization: GenericResponse;
    ubication:    GenericResponse;
}