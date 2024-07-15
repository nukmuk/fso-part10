import { ApolloClient, InMemoryCache } from "@apollo/client";
import Constants from "expo-constants";

const createApolloClient = () => {
  console.log("cfg", Constants.expoConfig.extra);

  // const uri = "http://192.168.1.118:4000/graphql";
  const uri = Constants.expoConfig.extra.APOLLO_URI;

  // console.log("uri", uri);

  return new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
