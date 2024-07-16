import { RepositoryListContainer } from "../../components/RepositoryList";
import { render, screen } from "@testing-library/react-native";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);

      const repositoryItems = screen.getAllByTestId("repositoryItem");

      // eslint-disable-next-line no-undef
      const formatter = Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 1,
      });

      repositoryItems.forEach((item, idx) => {
        expect(item).toHaveTextContent(repositories.edges[idx].node.fullName);
        expect(item).toHaveTextContent(
          repositories.edges[idx].node.description
        );
        expect(item).toHaveTextContent(repositories.edges[idx].node.language);
        expect(item).toHaveTextContent(
          formatter.format(repositories.edges[idx].node.forksCount)
        );
        expect(item).toHaveTextContent(
          formatter.format(repositories.edges[idx].node.stargazersCount)
        );
        expect(item).toHaveTextContent(
          repositories.edges[idx].node.ratingAverage
        );
        expect(item).toHaveTextContent(
          formatter.format(repositories.edges[idx].node.reviewCount)
        );
      });

      // Add your test code here
    });
  });
});
