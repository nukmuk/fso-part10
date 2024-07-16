import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { SignInContainer } from "../../components/SignIn";
// ...

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const signIn = jest.fn();
      const navigate = jest.fn();

      render(<SignInContainer signIn={signIn} navigate={navigate} />);

      const usernameField = screen.getByPlaceholderText("Username");
      const passwordField = screen.getByPlaceholderText("Password");

      fireEvent.changeText(usernameField, "kalle");
      fireEvent.changeText(passwordField, "password");
      fireEvent.press(screen.getByText("Sign in"));

      await waitFor(() => {
        expect(signIn).toHaveBeenCalledTimes(1);
        expect(signIn.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
        // expect the onSubmit function to have been called once and with a correct first argument
      });
    });
  });
});
