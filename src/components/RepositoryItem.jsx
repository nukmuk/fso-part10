import { Image, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";

const RepositoryItem = ({ item }) => {
  const formatter = Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  });

  return (
    <>
      <View style={{ padding: 16, gap: 16, backgroundColor: "white" }}>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <Image
            source={{ uri: item.ownerAvatarUrl }}
            style={{ width: 80, height: 80, borderRadius: 4 }}
          />

          <View style={{ justifyContent: "center", gap: 4 }}>
            <Text fontWeight="bold" fontSize="subheading">
              {item.fullName}
            </Text>
            <Text>{item.description}</Text>
            <Text
              style={{
                backgroundColor: theme.colors.primary,
                color: "white",
                borderRadius: 4,
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignSelf: "flex-start",
              }}
            >
              {item.language}
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
              {formatter.format(item.stargazersCount)}
            </Text>
            <Text>Stars</Text>
          </View>
          <View style={statsStyle}>
            <Text fontWeight="bold">{formatter.format(item.forksCount)}</Text>
            <Text>Forks</Text>
          </View>
          <View style={statsStyle}>
            <Text fontWeight="bold">{formatter.format(item.reviewCount)}</Text>
            <Text>Reviews</Text>
          </View>
          <View style={statsStyle}>
            <Text fontWeight="bold">
              {formatter.format(item.ratingAverage)}
            </Text>
            <Text>Rating</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const statsStyle = StyleSheet.create({
  alignItems: "center",
});

export default RepositoryItem;
