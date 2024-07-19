import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import { FlatList } from "react-native";
import { ReviewItem } from "./SingleRepositoryInfo";
import Text from "./Text";

const MyReviews = () => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { includeReviews: true },
  });

  if (error)
    return (
      <Text>Error: {JSON.stringify(error.networkError.result, null, 2)}</Text>
    );
  if (loading) return <Text>Loading</Text>;

  const reviews = data.me.reviews.edges.map((edge) => edge.node);

  return (
    <>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <ReviewItem review={item} showButtons={true} />
        )}
        keyExtractor={({ id }) => id}
      ></FlatList>
    </>
  );
};
export default MyReviews;
