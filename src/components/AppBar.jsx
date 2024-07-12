import { StyleSheet, ScrollView, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.darkColor,
    flexDirection: "row",
    // ...
  },
  // ...
});

const textStyle = {
  fontSize: "subheading",
  fontWeight: "bold",
  style: { color: "white" },
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarButton link={"/"} name={"Repositories"} />
        <AppBarButton link={"/signin"} name={"Sign In"} />
      </ScrollView>
    </View>
  );
};

const AppBarButton = ({ link, name }) => {
  return (
    <Link to={link} style={{ padding: 20 }}>
      <Text {...textStyle}>{name}</Text>
    </Link>
  );
};

export default AppBar;
