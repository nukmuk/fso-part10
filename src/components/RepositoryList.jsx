import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, setSort, sort }) => {
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
        ListHeaderComponent={
          <Picker
            mode="dropdown"
            selectedValue={sort}
            onValueChange={(itemValue) => setSort(itemValue)}
          >
            <Picker.Item label="Latest repositories" value={sorts.latest} />
            <Picker.Item
              label="Highest rated repositories"
              value={sorts.highestRated}
            />
            <Picker.Item
              label="Lowest rated repositories"
              value={sorts.lowestRated}
            />
          </Picker>
        }
      />
    </>
  );
};

const sorts = {
  latest: {
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  },
  highestRated: {
    orderBy: "RATING_AVERAGE",
    orderDirection: "DESC",
  },
  lowestRated: {
    orderBy: "RATING_AVERAGE",
    orderDirection: "ASC",
  },
};

const RepositoryList = () => {
  const [sort, setSort] = useState(sorts.latest);
  const { data, loading, error } = useRepositories(sort);
  if (error) return <Text>Error: {error.message}</Text>;
  if (loading) return <Text>Loading</Text>;

  return (
    <RepositoryListContainer
      repositories={data.repositories}
      setSort={setSort}
      sort={sort}
    />
  );
};

export default RepositoryList;
