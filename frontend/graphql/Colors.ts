import { gql } from "@apollo/client"

export const GetColors = gql`
    query Colors {
        colors {
            id
            description
        }
    }
`
