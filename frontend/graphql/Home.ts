import { gql } from "@apollo/client";

export const Home = gql`
query TopRatedMedia($profileId: String!) {
  topRatedMedia {
    medio {
      id
      poster
      title
      type
      rating {
        ratingAvg
      }
    }
  }
  profileProgress(profileId: $profileId) {
    movies {
      timeWatched
      movie {
        medioId
        title
        poster
        duration
      }
    }
    series {
      viewedEpisodes
      serie {
        medioId
        title
        episodes
        poster
      }
    }
  }
  profileRecommendation(profileId: $profileId) {
    id
    title
    poster
    type
    rating {
      ratingAvg
    }
  }
  bestRatingMedia{
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
export const SearchMedia = gql`
query Search($toSearch: String!) {
  search(toSearch: $toSearch) {
    id
    title
    poster
    rating {
      ratingAvg
    }
    type
  }
}
`