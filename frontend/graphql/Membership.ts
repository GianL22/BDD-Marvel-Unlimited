import { gql } from "@apollo/client";

export const GetMemberships = gql`
    query Query {
        memberships {
        id
        price
        type
        description
        }
    }
`;

export const GetMembership = gql`
    query Membership($membershipId: String!) {
        membership(id: $membershipId) {
        description
        id
        price
        type
        }
    }
`
