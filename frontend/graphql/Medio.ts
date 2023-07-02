import { gql } from "@apollo/client";


export const CreateSerie = gql`
mutation Mutation($createSerieInput: CreateSerieInput!) {
    createSerie(createSerieInput: $createSerieInput) {
      title
      releaseDate
      synopsis
    }
  }
`;

export const CreateParticipates = gql`
mutation CreateParticipates($createParticipatesInput: CreateParticipatesInput!) {
  createParticipates(createParticipatesInput: $createParticipatesInput) {
    status
    rolOrganization
  }
}
`

export const CreateAppears = gql`
mutation CreateAppears($createAppearsInput: CreateAppearsInput!) {
  createAppears(createAppearsInput: $createAppearsInput) {
    rolCharacter
    rolActor
  }
}
`

export const CreateMovie = gql`
mutation Mutation($createMovieInput: CreateMovieInput!) {
    createMovie(createMovieInput: $createMovieInput) {
      title
      releaseDate
      synopsis
    }
  }  
`
export const CreateVideoGame = gql`
mutation CreateVideoGame($createVideoGame: CreateVideoGameInput!) {
    createVideoGame(createVideoGame: $createVideoGame) {
      title
      releaseDate
      synopsis
    }
  }  
`

export const GetAllMediosTitlesIds = gql`
query MediosTitleAndIds {
  mediosTitleAndIds {
    id
    description : title
  }
}
`

export const RemoveMedio = gql`
mutation RemoveMedio($removeMedioId: String!) {
  removeMedio(id: $removeMedioId)
}
`;

export const GetMedios = gql`
query Media {
  media {
    series {
      id: medioId
      title
      releaseDate
      based
    }
    movies {
      id: medioId
      title
      releaseDate
      based
    }
    videoGames {
      title
      id: medioId
      releaseDate
      based
    }
  }
}
`;

export const GetMovieById = gql`
query Movie($movieId: String!) {
  movie(id: $movieId) {
    medio {
      id
      companyProduction {
        description
        id
      }
    }
    title
    releaseDate
    synopsis
    duration
    cost
    based
    revenue
    director {
      id
      name
      lastName
    }
    companyDist {
      id
      description
    }
    audioVisualType {
      id
      description
    }
  }
}
`

export const GetSerieById = gql`
query Serie($serieId: String!) {
  serie(id: $serieId) {
    medio {
      id
      companyProduction {
        id
        description
      }
      
    }
    title
    releaseDate
    synopsis
    based
    channel
    episodes
    creator {
      id
      name
      lastName
    }
    audioVisualType {
      id
      description
    }
  }
}
`

export const GetVideoGameById = gql`
query Movie($videoGameId: String!) {
  videoGame(id: $videoGameId) {
    medio {
      id
      companyProduction {
        id
        description
      }
    }
    title
    releaseDate
    synopsis
    based
    type
    companyPublisher {
      id
      description
    }
    platforms {
      id
      description: name
    }
  }
}
`