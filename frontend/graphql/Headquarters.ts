import { gql } from "@apollo/client";

export const GetData = gql`
query Organizations {
    organizations {
      id
      description: name
    }
    buildingTypes {
      id
      description
    }
    places {
      id
      description: name
    }
  }
`;

export const CreateHeadquarter = gql`
mutation CreateHeadquarter($createHeadquarterInput: CreateHeadquarterInput!) {
    createHeadquarter(createHeadquarterInput: $createHeadquarterInput) {
      name
      id
    }
  }
`;

export const GetHeadquarters = gql`
query Headquarters {
  headquarters {
    headquarterId: id
    name
    buildingType {
      description
    }
    organization {
      name
      id
    }
  }
}
`;

export const GetHeadquarterById = gql`
query Headquarter($headquarterId: String!) {
  headquarter(id: $headquarterId) {
    id
    name
    ubication {
      id
      description: name
    }
    buildingType {
      id
      description
    }
    organization {
      id
      description: name
    }
  }
}
`

export const RemoveHeadquarterByIds = gql`
mutation RemoveHeadquarter($headquarterId: String!, $organizationId: String!) {
  removeHeadquarter(headquarterId: $headquarterId, organizationId: $organizationId)
}
`;

export const UpdateHeadquarters = gql`
mutation UpdateHeadquarter($updateHeadquarterInput: UpdateHeadquarterInput!) {
  updateHeadquarter(updateHeadquarterInput: $updateHeadquarterInput) {
    id
    name
  }
}
`