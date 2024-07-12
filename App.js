import { NativeRouter } from "react-router-native";
import Main from "./src/components/Main";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
}
