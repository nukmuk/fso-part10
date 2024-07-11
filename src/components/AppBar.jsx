import { View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.darkColor,
    // ...
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable style={{ padding: 20 }}>
        <Text
          fontSize={"subheading"}
          fontWeight="bold"
          style={{ color: "white" }}
        >
          Repositories
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
