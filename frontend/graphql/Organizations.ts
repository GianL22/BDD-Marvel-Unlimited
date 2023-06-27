import { gql } from "@apollo/client";

export const CreateOrganization = gql`
mutation CreateOrganization($createOrganizationInput: CreateOrganizationInput!) {
    createOrganization(createOrganizationInput: $createOrganizationInput) {
      name
      slogan
      id
    }
  }
`

export const GetAllOrganizations = gql`
query Organizations {
  organizations {
    id
    name
    slogan
    leaderName
    founderName
  }
}
`

export const RemoveOrganizationById = gql`
mutation Mutation($removeOrganizationId: String!) {
  removeOrganization(id: $removeOrganizationId)
}
`;

export const GetOrganizationById = gql`
query Organization($organizationId: String!) {
  organization(id: $organizationId) {
    id
    name
    slogan
    objetive
    firstApparition
    creationPlace {
      id
      description: name
    }
    founder {
      id
    }
    leader {
      id
    }
    leaderName
    founderName
    headquarter {
      id
      name
      ubication {
        name
      }
      buildingType {
        description
      }
    }
  }
}
`;

export const UpdateOrganization = gql`
mutation Mutation($updateOrganizationInput: UpdateOrganizationInput!) {
  updateOrganization(updateOrganizationInput: $updateOrganizationInput) {
    name
    id
  }
}
`