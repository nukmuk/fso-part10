import { StyleSheet, ScrollView, View, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";
import { ApolloClient, useApolloClient, useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.darkColor,
    flexDirection: "row",
    // ...
  },
  appBarButton: {
    padding: 20,
  },
  // ...
});

const textStyle = {
  fontSize: "subheading",
  fontWeight: "bold",
  style: { color: "white" },
};

const AppBar = () => {
  const userQuery = useQuery(GET_USER);
  const loggedIn =
    userQuery.data !== undefined ? Boolean(userQuery.data.me) : false;
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  console.log("loggedIn", loggedIn);

  const handleSignout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarButton link={"/"} name={"Repositories"} />

        {loggedIn ? (
          <>
            <AppBarButton link={"/createreview"} name={"Create a review"} />
            <AppBarButton link={"/myreviews"} name={"My reviews"} />
            <Pressable style={styles.appBarButton} onPress={handleSignout}>
              <Text {...textStyle}>Sign out</Text>
            </Pressable>
          </>
        ) : (
          <>
            <AppBarButton link={"/signin"} name={"Sign in"} />
            <AppBarButton link={"/signup"} name={"Sign up"} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const AppBarButton = ({ link, name }) => {
  return (
    <Link to={link} style={styles.appBarButton}>
      <Text {...textStyle}>{name}</Text>
    </Link>
  );
};

export default AppBar;
