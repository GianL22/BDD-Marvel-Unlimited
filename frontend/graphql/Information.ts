import { gql } from "@apollo/client";


export const GetInformationToCreateCharacter = gql`
query Nacionality {
    colors {
      id
      description
    }
    nacionality {
      id
      description:name
    }
    occupations {
      id
      description:name
    }
    objects {
      id
      description:name
    }
  }
`