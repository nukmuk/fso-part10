import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "../theme";

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16 },
  input: {
    borderColor: "grey",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: theme.edges.round,
    padding: 8,
  },
  button: {
    textAlign: "center",
    fontWeight: theme.fontWeights.bold,
    backgroundColor: theme.colors.primary,
    color: "white",
    padding: 16,
    borderRadius: theme.edges.round,
  },
});

const SignIn = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (e) => {
    console.log(e);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <Text>The sign-in view</Text>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        style={styles.input}
        secureTextEntry
      />
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.button}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
