export interface Object {
    objectById: ObjectByID;
}

interface ObjectByID {
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