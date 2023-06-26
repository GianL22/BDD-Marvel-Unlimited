export interface Object {
    objectById: ObjectByID;
}

export interface ObjectByID {
    id:           string;
    name:         string;
    description:  string;
    material:     string;
    objectTypeId: ObjectTypeID;
}

interface ObjectTypeID {
    id:          string;
    description: string;
}