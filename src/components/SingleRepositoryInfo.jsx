import { useNavigate, useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { useMutation, useQuery } from "@apollo/client";
import { GET_REPOSITORY, GET_USER } from "../graphql/queries";
import Text from "./Text";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import theme from "../theme";
import { format } from "date-fns";
import Button from "./Button";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
  review: {
    verticalContainer: {
      marginTop: 16,
      backgroundColor: "white",
      padding: 16,
      width: "100%",
      gap: 16,
    },
    container: {
      flexDirection: "row",
      gap: 16,
    },
    buttonContainer: {
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
      flexShrink: 1,
    },
  },
});

const SingleRepositoryInfoHeader = ({ repository }) => {
  return <RepositoryItem repository={repository} expanded={true} />;
};

export const ReviewItem = ({ review, showButtons = false }) => {
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const navigate = useNavigate();

  const handleDelete = async () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        { text: "cancel" },
        {
          text: "delete",
          onPress: async () => {
            const result = await deleteReview({
              variables: { deleteReviewId: review.id },
              refetchQueries: [GET_USER],
            });
            console.log("review deleted", result);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.review.verticalContainer}>
      <View style={styles.review.container}>
        <View style={styles.review.rating}>
          <Text fontSize="subheading" fontWeight="bold" color="primary">
            {review.rating}
          </Text>
        </View>
        <View style={styles.review.rightContainer}>
          <Text fontWeight="bold">
            {review.repository?.fullName ?? review.user.username}
          </Text>
          <Text color="textSecondary">
            {format(review.createdAt, "dd.MM.yyyy")}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      {showButtons && (
        <View style={styles.review.buttonContainer}>
          <Button
            onPress={() => navigate(`/repository/${review.repositoryId}`)}
            label="View repository"
          />
          <Button
            onPress={handleDelete}
            label="Delete review"
            color={theme.colors.error}
          />
        </View>
      )}
    </View>
  );
};

const SingleRepositoryInfo = () => {
  const { id } = useParams();
  const variables = { id, first: 8 };
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

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
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={() => (
        <SingleRepositoryInfoHeader repository={repository} />
      )}
    ></FlatList>
  );
};

export default SingleRepositoryInfo;
