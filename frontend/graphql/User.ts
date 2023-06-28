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
            email
            birthdate
            city {
                id
                description
                country {
                  description
                }
              }
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
            email
            birthdate
            city {
                id
                description
                country {
                  description
                }
              }
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
    mutation Mutation($suscriptionInput: CreateSuscriptionInput!, $creditCardInput: CreateCreditCardInput!, $signupInput: SignupInput!) {
        signup(suscriptionInput: $suscriptionInput, creditCardInput: $creditCardInput, signupInput: $signupInput) {
            token
            user {
                id
                username
                isActive
                name
                lastName
                email
                birthdate
                city {
                    id
                    description
                    country {
                    description
                    }
                }
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

export const GetUser = gql`
    query UserById($userByIdId: ID!) {
        userById(id: $userByIdId) {
        id
        username
        name
        lastName
        email
        birthdate
        isActive
        creditCard {
            cardNumber
            last4Digits
        }
        city {
            id
            description
            country {
            description
            }
        }
        }
    }

`;

export const UpdateUser = gql`
mutation Mutation($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      username
    }
  }
`