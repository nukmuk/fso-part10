import { useApolloClient, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);

  const response = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    console.log("data:", response.data);
    console.log("error:", response.error);
    console.log("loading:", response.loading);
    if (response.error) return console.error("error", response.error);
    if (response.loading) return;
    setRepositories(response.data);
    setLoading(false);
  }, [response.data, response.error, response.loading]);

  return { repositories, loading };
};

export default useRepositories;
