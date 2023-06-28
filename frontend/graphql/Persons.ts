import { gql } from "@apollo/client";

export const GetAllActors = gql`
query Persons {
    persons {
      actors {
        lastName
        name
        id
      }
    }
  }
`