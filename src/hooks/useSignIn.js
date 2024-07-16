import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    console.log("logging in with", username, password);
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });
    console.log("token:", data.authenticate.accessToken);
    authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
    console.log("sign in:", result);
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
