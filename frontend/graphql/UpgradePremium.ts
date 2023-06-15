import { gql } from "@apollo/client";

export const GetUpgragePremiumReport = gql`
    query Query {
        reportSuscriptions {
            user {
                lastName
                email
                name
            }
            dateSuscription
            dateEnd
        }
    }
`;
