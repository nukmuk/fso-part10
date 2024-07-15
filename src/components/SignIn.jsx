import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "../theme";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  container: { padding: 16, gap: 0 },
  input: {
    borderColor: "grey",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: theme.edges.round,
    padding: 8,
    marginTop: 12,
    marginBottom: 4,
  },
  button: {
    textAlign: "center",
    fontWeight: theme.fontWeights.bold,
    backgroundColor: theme.colors.primary,
    color: "white",
    padding: 16,
    borderRadius: theme.edges.round,
    marginTop: 12,
  },
  error: {
    color: theme.colors.error,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const [signIn] = useSignIn();

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log("val", username, password);

    try {
      const { data } = await signIn({ username, password });
      console.log("data", data.authenticate);
    } catch (e) {
      console.log("e", e);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        style={[
          styles.input,
          formik.errors.username && { borderColor: theme.colors.error },
          { marginTop: 0 },
        ]}
      />
      {formik.errors.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        style={[
          styles.input,
          formik.errors.password && { borderColor: theme.colors.error },
        ]}
        secureTextEntry
      />
      {formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.button}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
