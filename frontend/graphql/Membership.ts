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

export const ChangeSuscription = gql`
    mutation Mutation($createSuscriptionInput: CreateSuscriptionInput!) {
        changeSuscription(createSuscriptionInput: $createSuscriptionInput) {
            isActive
            dateSuscription
            dateEnd
        }
    }
`

export const UpdateMembershipData = gql`
    query Query($userByIdId: ID!) {
        userById(id: $userByIdId) {
            getMembership {
                description
                id
                price
                type
            }
        }
    }
`
