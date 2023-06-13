import { gql } from "@apollo/client";

export const RevalidateToken = gql`
    query Revalite {
        revalite {
        token
        user {
            id
            username
            isActive
            name
            lastName
            profiles {
                id
                nickname
                language
                hourConexion
                device
                timeWatched
                emailProfile
                avatar
            }
        }
        }
    }
`;

export const Login = gql`
    mutation Login($loginInput: LoginInput!) {
        login(loginInput: $loginInput) {
        token
        user {
            id
            username
            isActive
            name
            lastName
            profiles {
                id
                nickname
                language
                hourConexion
                device
                timeWatched
                emailProfile
                avatar
            }
        }
    }
}
`;

export const SignUp = gql`
    mutation Signup($signupInput: SignupInput!, $creditCardInput: CreateCreditCardInput!) {
        signup(signupInput: $signupInput, creditCardInput: $creditCardInput) {
            token
            user {
                id
                username
                isActive
                name
                lastName
                profiles {
                    id
                    nickname
                    language
                    hourConexion
                    device
                    timeWatched
                    emailProfile
                    avatar
                }
            }
        }
    }
`;

export const ExistEmail = gql`
    query UserByEmail($email: String!) {
        userByEmail(email: $email) {
        email
        id
        }
    }
`