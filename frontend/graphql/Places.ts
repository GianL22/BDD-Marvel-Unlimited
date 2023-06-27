import { gql } from "@apollo/client";

export const GetAllPlaces = gql`
query Places {
    places {
      id
      description: name
    }
  }
`;