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

      const [first, second] = repositoryItems;

      // eslint-disable-next-line no-undef
      const formatter = Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 1,
      });

      expect(first).toHaveTextContent(repositories.edges[0].node.fullName);
      expect(first).toHaveTextContent(repositories.edges[0].node.description);
      expect(first).toHaveTextContent(repositories.edges[0].node.language);
      expect(first).toHaveTextContent(
        formatter.format(repositories.edges[0].node.forksCount)
      );
      expect(first).toHaveTextContent(
        formatter.format(repositories.edges[0].node.stargazersCount)
      );
      expect(first).toHaveTextContent(repositories.edges[0].node.ratingAverage);
      expect(first).toHaveTextContent(
        formatter.format(repositories.edges[0].node.reviewCount)
      );

      expect(second).toHaveTextContent(repositories.edges[1].node.fullName);
      expect(second).toHaveTextContent(repositories.edges[1].node.description);
      expect(second).toHaveTextContent(repositories.edges[1].node.language);
      expect(second).toHaveTextContent(
        formatter.format(repositories.edges[1].node.forksCount)
      );
      expect(second).toHaveTextContent(
        formatter.format(repositories.edges[1].node.stargazersCount)
      );
      expect(second).toHaveTextContent(
        repositories.edges[1].node.ratingAverage
      );
      expect(second).toHaveTextContent(
        formatter.format(repositories.edges[1].node.reviewCount)
      );

      // Add your test code here
    });
  });
});
