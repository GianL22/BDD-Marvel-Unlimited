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
mutation CreateParticipates($createParticipatesInput: CreateParticipatesInput!) {
  createParticipates(createParticipatesInput: $createParticipatesInput) {
    status
    rolOrganization
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