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
    character {
      id
    }
  }
}
`

export const CreateVillain = gql`
mutation CreateHero($createVillainInput: CreateVillainInput!, $createCharacterInput: CreateCharacterInput!) {
  createVillain(createVillainInput: $createVillainInput, createCharacterInput: $createCharacterInput) {
    name
    lastName
    nameVillain
    character {
      id
    }
  }
}
`

export const CreateCivil = gql`
mutation CreateHero($createCivilInput: CreateCivilInput!, $createCharacterInput: CreateCharacterInput!) {
  createCivil(createCivilInput: $createCivilInput, createCharacterInput: $createCharacterInput) {
    name
    lastName
    character {
      id
    }
  }
}
`

export const RelatePowers = gql`
mutation CreateHero($createUsePowerInput: CreateUsePowerInput!) {
  relatePowers(createUsePowerInput: $createUsePowerInput) {
    type
    inherited
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

export const GetHeroById = gql`
query Hero($heroId: ID!) {
  hero(id: $heroId) {
    name
    lastName
    gender
    phrase
    maritialStatus
    firstApparition
    nameHero
    logo
    archEnemy {
      nameVillain
    }
    character {
      eyeColor {
        description
      }
      hairColor {
        description
      }
    }
  }
}
`

export const GetVillainById = gql`
query Villain($villainId: ID!) {
  villain(id: $villainId) {
    name
    lastName
    gender
    phrase
    maritialStatus
    firstApparition
    nameVillain
    objective
    character {
      eyeColor {
        description
      }
      hairColor {
        description
      }
    }
  }
}
`

export const GetCivilById = gql`
query Civil($civilId: ID!) {
  civil(id: $civilId) {
    name
    lastName
    gender
    phrase
    maritialStatus
    firstApparition
    hero {
      nameHero
    }
    villain {
      nameVillain
    }
    character {
      eyeColor {
        description
      }
      hairColor {
        description
      }
    }
  }
}
`