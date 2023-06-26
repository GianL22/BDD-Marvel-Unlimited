import { gql } from "@apollo/client";


export const CreatePower = gql`
    mutation Mutation($createPowerInput: CreatePowerInput!) {
        createPower(createPowerInput: $createPowerInput) {
            id
            name
            description
        }
    }
`

export const GetPowerById = gql`
query PowerBy($powerById: ID!) {
    powerBy(id: $powerById) {
      id
      name
      description
    }
  }
`

export const UpdatePower = gql`
mutation UpdatePower($updatePowerInput: UpdatePowerInput!) {
  updatePower(updatePowerInput: $updatePowerInput) {
    id
    name
    description
  }
}
`

export const GetAllPowers = gql`
query Powers {
  Powers {
    id
    description: name
  }
}
`