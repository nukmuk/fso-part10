import { gql } from "@apollo/client";

export const REPOSITORY_DATA = gql`
  fragment RepositoryData on Repository {
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
  }
`;

export const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      edges {
        node {
          ...RepositoryData
        }
      }
    }
  }
  ${REPOSITORY_DATA}
`;

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!) {
    repository(id: $id) {
      ...RepositoryData
      url
    }
  }
  ${REPOSITORY_DATA}
`;

export const GET_USER = gql`
  {
    me {
      id
      username
    }
  }
`;
