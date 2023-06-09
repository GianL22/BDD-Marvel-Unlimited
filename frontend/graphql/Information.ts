import { gql } from "@apollo/client";


export const GetInformationToCreateCharacter = gql`
query Nacionality {
    colors {
      id
      description
    }
    nacionality {
      id
      description:name
    }
    occupations {
      id
      description:name
    }
    objects {
      id
      description:name
    }
    persons {
      creators {
        id
        name
        lastName
      }
    }
  }
`

export const GetInformationToCreateMedio = gql`
query AudioVisualTypes {
  AudioVisualTypes {
    id
    description
  }
  companies {
    id
    description
  }
  persons {
    directors {
      id
      name
      lastName
    }
    creators {
      id
      name
      lastName
    }
  }
  platforms {
    id
    description: name
  }
}
`