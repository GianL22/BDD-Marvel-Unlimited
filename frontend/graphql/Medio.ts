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