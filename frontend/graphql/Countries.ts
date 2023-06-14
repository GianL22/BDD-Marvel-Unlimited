import { gql } from "@apollo/client";

export const GetCountries = gql`
    query Countries {
        countries {
            description
            cities {
                description
                id
            }
        }
    }
`;
