import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const Button = ({ onPress, label, color = theme.colors.primary }) => {
  const styles = StyleSheet.create({
    button: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      backgroundColor: color,
      borderRadius: theme.edges.round,
      color: "white",
      fontWeight: theme.fontWeights.bold,
      flexGrow: 1,
      flexBasis: 0,
    },
  });
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={{ color: "white", textAlign: "center" }} fontWeight="bold">
        {label}
      </Text>
    </Pressable>
  );
};

export default Button;
