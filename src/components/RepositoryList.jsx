import { FlatList, View, StyleSheet, TextInput } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import theme from "../theme";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  setSort,
  sort,
  setSearch,
  search,
}) => {
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
          <>
            <TextInput
              style={[theme.input, { margin: 16 }]}
              value={search}
              onChangeText={setSearch}
            />
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
          </>
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
  const [search, setSearch] = useState("");
  const [searchDebounced] = useDebounce(search, 500);
  const { repositories } = useRepositories({
    ...sort,
    searchKeyword: searchDebounced,
  });
  // if (error) return <Text>Error: {error.message}</Text>;
  // if (loading) return <Text>Loading</Text>;

  return (
    <RepositoryListContainer
      repositories={repositories}
      setSort={setSort}
      sort={sort}
      search={search}
      setSearch={setSearch}
    />
  );
};

export default RepositoryList;
