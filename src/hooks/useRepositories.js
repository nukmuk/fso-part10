import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const repositories = data?.repositories || { edges: [] };

  return { repositories, loading, fetchMore: handleFetchMore, ...result };
};

export default useRepositories;
