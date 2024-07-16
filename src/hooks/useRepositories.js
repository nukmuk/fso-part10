import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const response = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  // useEffect(() => {
  //   if (response.error) return console.error("error", response.error);
  //   if (response.loading) return;
  //   console.log("data:", response.data);
  // }, [response.data]);

  return response.data;
};

export default useRepositories;
