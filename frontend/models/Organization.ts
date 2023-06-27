
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
}

interface CreationPlace {
    id:   string;
    description: string;
}

interface Character {
    id: string;
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
