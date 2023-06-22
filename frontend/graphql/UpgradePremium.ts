import { gql } from "@apollo/client";

export const GetUpgragePremiumReport = gql`
    query ReportSuscription {
        reportSuscription {
            dateSuscription
            dateEnd
            user {
                lastName
                name
                email
            }
        }
    }
`;
