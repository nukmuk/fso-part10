import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      edges {
        node {
          description
          forksCount
          fullName
          id
          language
          name
          ownerAvatarUrl
          ratingAverage
          reviewCount
          stargazersCount
          createdAt
          ownerName
        }
        cursor
      }
    }
  }
`;
