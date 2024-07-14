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
    if (response.loading) return;
    console.log("data:", response.data);
    console.log("error:", response.error);
    console.log("loading:", response.loading);
    setRepositories(response.data);
    setLoading(false);
  }, [response.data]);

  return { repositories, loading };
};

export default useRepositories;
