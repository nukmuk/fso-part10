import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import Text from "./Text";
import { FlatList, StyleSheet, View } from "react-native";
import theme from "../theme";
import { format } from "date-fns";

const styles = StyleSheet.create({
  review: {
    container: {
      marginTop: 16,
      backgroundColor: "white",
      padding: 16,
      flexDirection: "row",
      gap: 16,
    },
    rating: {
      width: 48,
      height: 48,
      borderRadius: 24,
      borderColor: theme.colors.primary,
      borderWidth: 2,
      borderStyle: "solid",
      alignItems: "center",
      justifyContent: "center",
      color: "red",
    },
    ratingText: {
      color: theme.colors.primary,
    },
    rightContainer: {
      gap: 4,
    },
  },
});

const SingleRepositoryInfoHeader = ({ repository }) => {
  return <RepositoryItem repository={repository} expanded={true} />;
};

export const ReviewItem = ({ review, repositoryName = null }) => {
  return (
    <View style={styles.review.container}>
      <View style={styles.review.rating}>
        <Text fontSize="subheading" fontWeight="bold" color="primary">
          {review.rating}
        </Text>
      </View>
      <View style={styles.review.rightContainer}>
        <Text fontWeight="bold">
          {repositoryName ? repositoryName : review.user.username}
        </Text>
        <Text color="textSecondary">
          {format(review.createdAt, "dd.MM.yyyy")}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepositoryInfo = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { id },
  });

  if (error)
    return (
      <Text>Error: {JSON.stringify(error.networkError.result, null, 2)}</Text>
    );
  if (loading) return <Text>Loading {id}...</Text>;

  const repository = data.repository;

  const reviews = repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <SingleRepositoryInfoHeader repository={repository} />
      )}
    ></FlatList>
  );
};

export default SingleRepositoryInfo;
