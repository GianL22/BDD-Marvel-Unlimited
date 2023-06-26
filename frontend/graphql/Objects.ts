import { gql } from "@apollo/client";


export const GetObjectType = gql`
    query Query {
        objectsType {
            id
            description
        }
    }
`;

export const GetObjectById = gql`
query Objects($objectByIdId: ID!) {
    objectById(id: $objectByIdId) {
      id
      name
      description
      material
      objectTypeId {
        id
        description
      }
    }
  }
`

export const CreateObject = gql`
    mutation Mutation($createObjectInput: CreateObjectInput!) {
        createObject(createObjectInput: $createObjectInput) {
            id
            name
            description
            material
        }
    }
`

export const UpdateObject = gql`
mutation UpdateObject($updateObjectInput: UpdateObjectInput!) {
    updateObject(updateObjectInput: $updateObjectInput) {
      name
      description
      objectTypeId {
        id
        description
      }
      material
    }
  }
`
