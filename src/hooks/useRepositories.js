import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);

  const response = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (response.error) return console.error("error", response.error);
    if (response.loading) return;
    console.log("data:", response.data);
    setRepositories(response.data);
    setLoading(false);
  }, [response.data, response.error, response.loading]);

  return { repositories, loading };
};

export default useRepositories;
