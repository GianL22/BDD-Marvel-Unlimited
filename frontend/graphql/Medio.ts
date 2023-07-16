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

export const GetAllMovies = gql`
query Media {
  media {
    movies {
      medioId
      title
      poster
      medio {
        rating {
          ratingAvg
          ratingCount
        }
      }
    }
  }
}
`

export const GetAllSeries = gql`
query Media {
  media {
    series {
      medioId
      title
      poster
      medio {
        rating {
          ratingAvg
          ratingCount
        }
      }
    }
  }
}
`

export const GetAllVideoGames = gql`
query Media {
  media {
    videoGames {
      medioId
      title
      poster
      medio {
        rating {
          ratingAvg
          ratingCount
        }
      }
    }
  }
}
`

export const GetMovieById = gql`
query Movie($movieId: String!, $profileId: String!) {
  movie(id: $movieId) {
    medio {
      id
      companyProduction {
        description
        id
      }
      rating {
        ratingAvg
        ratingCount
      }
    }
    title
    releaseDate
    synopsis
    duration
    cost
    based
    revenue
    poster
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
  profileMyList(profileId: $profileId) {
    medios {
      id
    }
  }
  profilePreferenceList(profileId: $profileId) {
    medios {
      id
    }
  }
  
  ratingOfMedioByProfile(profileId: $profileId, medioId: $movieId)
  progressOfMedios(profileId: $profileId, medioId: $movieId) {
    movieProgress
  }
}
`

export const GetSerieById = gql`
query Serie($serieId: String!, $profileId: String!) {
  serie(id: $serieId) {
    medio {
      id
      companyProduction {
        id
        description
      }
      rating {
        ratingAvg
        ratingCount
      }
    }
    title
    releaseDate
    synopsis
    based
    channel
    episodes
    poster
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
  profileMyList(profileId: $profileId) {
    medios {
      id
    }
  }
  profilePreferenceList(profileId: $profileId) {
    medios {
      id
    }
  }
  ratingOfMedioByProfile(profileId: $profileId, medioId: $serieId)
  progressOfMedios(profileId: $profileId, medioId: $serieId) {
    serieProgress
  }
}
`

export const GetVideoGameById = gql`
query Movie($videoGameId: String!, $profileId: String!) {
  videoGame(id: $videoGameId) {
    medio {
      id
      companyProduction {
        id
        description
      }
      rating {
        ratingAvg
        ratingCount
      }
    }
    title
    releaseDate
    synopsis
    based
    type
    poster
    companyPublisher {
      id
      description
    }
    platforms {
      id
      description: name
    }
  }
  profileMyList(profileId: $profileId) {
    medios {
      id
    }
  }
  profilePreferenceList(profileId: $profileId) {
    medios {
      id
    }
  }
  ratingOfMedioByProfile(profileId: $profileId, medioId: $videoGameId)
  progressOfMedios(profileId: $profileId, medioId: $videoGameId) {
    videoGameProgress
  }
}
`

export const GetMyList = gql`
query ProfileMyList($profileId: String!) {
  profileMyList(profileId: $profileId) {
    profileId
    medios {
      id
      title
      poster
      type
      rating {
        ratingAvg
      }
    }
  }
}
`

export const GetMediosToPreference = gql`
query MediosTitleAndIds {
  mediosTitleAndIds {
    id
    title
    poster
    type
    rating {
      ratingAvg
    }
  }
}
`