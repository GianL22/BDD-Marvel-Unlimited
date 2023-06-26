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

export const GetInheritedPowersReport = gql`
    query ReportInheritedPowers {
            reportInheritedPowers {
                powerName
                powerDescription
                villain {
                    nameVillain
            }
        }
    }
`;
