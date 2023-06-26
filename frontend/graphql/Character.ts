import { gql } from "@apollo/client";

export const GetHeroesAndVillains = gql`
query Query {
    findCharacters {
      hero {
        nameHero
        character {
          id
        }
      }
      villain {
        nameVillain
        character {
          id
        }
      }
    }
  }
`

export const CreateHero = gql`
mutation CreateHero($createHeroInput: CreateHeroInput!, $createCharacterInput: CreateCharacterInput!) {
  createHero(createHeroInput: $createHeroInput, createCharacterInput: $createCharacterInput) {
    nameHero
    name
    lastName
  }
}
`

export const CreateVillain = gql`
mutation CreateHero($createVillainInput: CreateVillainInput!, $createCharacterInput: CreateCharacterInput!) {
  createVillain(createVillainInput: $createVillainInput, createCharacterInput: $createCharacterInput) {
    name
    lastName
    nameVillain
  }
}
`

export const CreateCivil = gql`
mutation CreateHero($createCivilInput: CreateCivilInput!, $createCharacterInput: CreateCharacterInput!) {
  createCivil(createCivilInput: $createCivilInput, createCharacterInput: $createCharacterInput) {
    name
    lastName
  }
}
`