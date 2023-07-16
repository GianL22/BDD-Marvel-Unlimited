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


export const GetExtensiveSeriesReport = gql`
    query ReportSerie {
        reportSerie {
            avg
            series {
                title
                episodes
                audioVisualType {
                description
                }
                channel
            }
        }
    }
`

export const GetProfitableLongAnimatedFilms = gql`
    query ReportMovie {
        reportMovie {
            avg
            movies {
                title
                cost
                revenue
                duration
                releaseDate
                director {
                lastName
                name
                }
            }
        }
    }
`

export const GetNaturalPowersReport = gql`
    query ReportNaturalPowers {
        reportNaturalPowers {
            characterName
            characterRol
            organizationName
            naturalPowers {
                name
            }
        }
    }
`

export const GetPlayingAtThelimitReport = gql`
    query ReportPlayingAtThelimit {
        reportPlayingAtThelimit {
            avg
            videoGames {
                medio {
                    rating {
                        ratingAvg
                    }
                    companyProduction {
                        description
                    }
                }
                poster
                title
                releaseDate
                companyPublisher {
                    description
                }
            }
        }
    }
`
