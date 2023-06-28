
export interface OrganizationResponse {
    organization: Organization;
}

interface Organization {
    id:              string;
    name:            string;
    slogan:          string;
    objetive:        string;
    firstApparition: string;
    creationPlace:   CreationPlace;
    founder:         Character;
    leader:          Character;
    leaderName:      string;
    founderName:     string;
    headquarter:     Headquarter[];
    formparts:       Formpart[];
}

interface CreationPlace {
    id:   string;
    description: string;
}

interface Character {
    id: string;
    nameCharacter: string;
}

interface Headquarter {
    id:           string;
    name:         string;
    ubication:    Ubication;
    buildingType: BuildingType;
}

interface BuildingType {
    description: string;
}

interface Ubication {
    name: string;
}

interface JobPosition {
    name: string;
}

interface Formpart {
    character:   Character;
    jobPosition: JobPosition;
}
