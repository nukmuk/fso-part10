import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import Text from "./Text";

const SingleRepositoryInfo = () => {
  const { id } = useParams();
  console.log("single id", id);
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });
  console.log("data", data);

  if (error) return <Text>Error: {error.message}</Text>;
  if (loading) return <Text>Loading {id}...</Text>;

  return <RepositoryItem repository={data.repository} expanded={true} />;
};

export default SingleRepositoryInfo;
