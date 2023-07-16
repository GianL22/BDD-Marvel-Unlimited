import { gql } from "@apollo/client";



export const CreateProfile = gql`
    mutation CreateProfile($createProfileInput: CreateProfileInput!) {
        createProfile(createProfileInput: $createProfileInput) {
        userId
        id
        hourConexion
        timeWatched
        avatar
        }
    }
`;

export const GetProfilesByUser = gql`
    query ProfileByUser {
        profileByUser {
            id
            userId
            nickname
            language
            hourConexion
            device
            timeWatched
            emailProfile
            avatar
        }
    }
`;

export const UpdateProfile = gql`
    mutation Mutation($updateProfileInput: UpdateProfileInput!) {
        updateProfile(updateProfileInput: $updateProfileInput) {
            id
            device
            avatar
            language
            nickname
        }
    }
`;

export const DeleteProfile = gql`
    mutation Mutation($blockProfileId: ID!) {
        blockProfile(id: $blockProfileId) {
            nickname
            isActive
        }
    }
`;

export const ToggleMedioInMyList = gql`
mutation Mutation($profileRelationInput: ProfileRelationInput!) {
    relateMyList(profileRelationInput: $profileRelationInput)
  }
`

export const ToggleMedioInMyPreference = gql`
mutation Mutation($profileRelationInput: ProfileRelationInput!) {
    relatePreferenceList(profileRelationInput: $profileRelationInput)
  }
`

export const ToggleRating = gql`
    mutation RatingMedio($ratingRelationInput: RatingRelationInput!) {
        ratingMedio(ratingRelationInput: $ratingRelationInput)
    }
`

export const SaveMovieProgress = gql`
    mutation SaveMovieProgress($movieProgressInput: MovieProgressInput!) {
        saveMovieProgress(movieProgressInput: $movieProgressInput)
    }
`

export const SaveSerieProgress = gql`
    mutation SaveSerieProgress($serieProgressInput: SerieProgressInput!) {
        saveSerieProgress(serieProgressInput: $serieProgressInput)
    }
`

export const SaveVideoGameProgress = gql`
    mutation SaveVideoGameProgress($videoGameProgressInput: VideoGameProgressInput!) {
        saveVideoGameProgress(videoGameProgressInput: $videoGameProgressInput)
    }
`