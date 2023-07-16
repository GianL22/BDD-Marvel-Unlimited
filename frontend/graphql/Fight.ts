import { gql } from "@apollo/client";

export const GetInfoToCreate = gql`
query toCreateFight {
    places {
      id
      description : name
    }
    AllCharacters {
      id
      description : nameCharacter
    }
    objects {
      description : name
      id
    }
    Powers {
      description : name
      id
    }
  }
`;


export const CreateFight = gql`
    mutation CreateFight($createFightInput: CreateFightInput!) {
        createFight(createFightInput: $createFightInput) {
            character {
                nameCharacter
            }
            power {
                name
            }
            object {
                name
            }
            date
            place {
                name
            }
        }
    }
`

export const GetFights = gql`
    query Fights {
      fights {
        date
        place {
          description : name
          id
        }
      }
    }
`

export const RemoveFight = gql`
  mutation RemoveFight($removeFightInput: RemoveFightInput!) {
    removeFight(removeFightInput: $removeFightInput)
  }

`
export const GetFightToUpdate = gql`

query FightsByPlaceAndDate($placeId: String!, $date: String!) {
  fightsByPlaceAndDate(placeId: $placeId, date: $date) {
    place {
      description : name
      id
    }
    date
    characterPowerAndObjects {
      character {
        id
        description : nameCharacter
      }
      powerAndObjectUsedInput {
        power {
          id
          description : name
        }
        object {
          id
          description : name
        }
      }
    }
  }
}

`