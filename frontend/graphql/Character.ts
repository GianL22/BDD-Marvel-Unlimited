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

export const GetCharactersNamesAndId = gql`
query Hero {
  findCharacters {
    hero {
      character {
        id
      }
      nameHero
    }
    villain {
      character {
        id
      }
      nameVillain
    }
    civil {
      name
      lastName
      character {
        id
      }
    }
  }
}
`;

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

export const GetAllCharacters = gql`
query Query {
  findCharacters {
    hero {
      character {
        id
      }
      name
      lastName
      gender
      maritialStatus
      firstApparition
    }
    villain {
      character {
        id
      }
      name
      lastName
      gender
      maritialStatus
      firstApparition
    }
    civil {
      character {
        id
      }
      name
      lastName
      gender
      maritialStatus
      firstApparition
    }
  }
}
`;

export const RemoveCharacter = gql`
mutation Mutation($removeCharacterId: ID!) {
  removeCharacter(id: $removeCharacterId)
}
`;