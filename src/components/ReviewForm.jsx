import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "../theme";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

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
  ownerName: yup.string().required("Repository's owner is required"),
  repositoryName: yup.string().required("Repository's name is required"),
  rating: yup.number().min(0).max(100).required("Rating is required"),
  review: yup.string(),
});

export const ReviewFormContainer = ({ navigate, createReview }) => {
  const initialValues = {
    ownerName: "",
    repositoryName: "",
    rating: "",
    text: "",
  };

  const onSubmit = async (values) => {
    const review = { ...values, rating: Number(values.rating) };

    try {
      const result = await createReview({ variables: { review } });

      navigate(`/repository/${result.data.createReview.repositoryId}`);
    } catch (e) {
      console.log("create review error", e);
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
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        style={[
          styles.input,
          formik.errors.ownerName && { borderColor: theme.colors.error },
          { marginTop: 0 },
        ]}
      />
      {formik.errors.ownerName && (
        <Text style={styles.error}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        style={[
          styles.input,
          formik.errors.repositoryName && { borderColor: theme.colors.error },
        ]}
      />
      {formik.errors.repositoryName && (
        <Text style={styles.error}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        style={[
          styles.input,
          formik.errors.rating && { borderColor: theme.colors.error },
        ]}
      />
      {formik.errors.rating && (
        <Text style={styles.error}>{formik.errors.rating}</Text>
      )}
      <TextInput
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
        style={[
          styles.input,
          formik.errors.text && { borderColor: theme.colors.error },
        ]}
        multiline
      />
      {formik.errors.text && (
        <Text style={styles.error}>{formik.errors.text}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.button}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW);
  return (
    <ReviewFormContainer navigate={navigate} createReview={createReview} />
  );
};

export default ReviewForm;
