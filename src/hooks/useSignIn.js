import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    console.log("logging in with", username, password);
    const res = await mutate({
      variables: { credentials: { username, password } },
    });
    console.log("sign in:", result);
    return res;
  };

  return [signIn, result];
};

export default useSignIn;
