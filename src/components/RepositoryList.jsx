import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem repository={item} />}
      />
    </>
  );
};

const RepositoryList = () => {
  const { data, loading, error } = useRepositories();
  if (error) return <Text>Error: {error.message}</Text>;
  if (loading) return <Text>Loading</Text>;

  return <RepositoryListContainer repositories={data.repositories} />;
};

export default RepositoryList;
