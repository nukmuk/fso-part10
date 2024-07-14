import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useEffect } from "react";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();

  if (loading) return <Text>Loading</Text>;

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <>
      {/* <Text>asdafsfgddsfsssss</Text> */}
      {/* <RepositoryItem item={repositories[0]} /> */}
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={RepositoryItem}
        // other props
      />
    </>
  );
};

export default RepositoryList;
