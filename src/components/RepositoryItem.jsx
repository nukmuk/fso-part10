import { Image, Linking, Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.edges.round,
    color: "white",
    textAlign: "center",
    fontWeight: theme.fontWeights.bold,
  },
});

const RepositoryItem = ({ repository, expanded = false }) => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-undef
  const formatter = Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  });

  const handlePress = () => {
    if (expanded) return;
    navigate(`/repository/${repository.id}`);
  };

  const handleOpenLink = () => {
    Linking.openURL(repository.url);
  };

  return (
    <Pressable onPress={handlePress}>
      <View
        style={{ padding: 16, gap: 16, backgroundColor: "white" }}
        testID="repositoryItem"
      >
        <View style={{ flexDirection: "row", gap: 16 }}>
          <Image
            source={{ uri: repository.ownerAvatarUrl }}
            style={{ width: 80, height: 80, borderRadius: theme.edges.round }}
          />

          <View style={{ justifyContent: "center", gap: 4 }}>
            <Text fontWeight="bold" fontSize="subheading">
              {repository.fullName}
            </Text>
            <Text>{repository.description}</Text>
            <Text
              style={{
                backgroundColor: theme.colors.primary,
                color: "white",
                borderRadius: theme.edges.round,
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignSelf: "flex-start",
              }}
            >
              {repository.language}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            gap: 48,
          }}
        >
          <View style={statsStyle}>
            <Text fontWeight="bold">
              {formatter.format(repository.stargazersCount)}
            </Text>
            <Text>Stars</Text>
          </View>
          <View style={statsStyle}>
            <Text fontWeight="bold">
              {formatter.format(repository.forksCount)}
            </Text>
            <Text>Forks</Text>
          </View>
          <View style={statsStyle}>
            <Text fontWeight="bold">
              {formatter.format(repository.reviewCount)}
            </Text>
            <Text>Reviews</Text>
          </View>
          <View style={statsStyle}>
            <Text fontWeight="bold">
              {formatter.format(repository.ratingAverage)}
            </Text>
            <Text>Rating</Text>
          </View>
        </View>
        {expanded && (
          <Pressable onPress={handleOpenLink}>
            <Text style={styles.button}>Open in GitHub</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

const statsStyle = StyleSheet.create({
  alignItems: "center",
});

export default RepositoryItem;
