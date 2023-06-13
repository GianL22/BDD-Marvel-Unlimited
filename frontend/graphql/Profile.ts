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