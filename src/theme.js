import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    darkColor: "#24292e",
    backgroundColor: "#eeeeee",
    error: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
  edges: {
    round: 4,
  },
};

theme.input = {
  borderColor: "grey",
  borderStyle: "solid",
  borderWidth: 1,
  borderRadius: theme.edges.round,
  padding: 8,
  marginTop: 12,
  marginBottom: 4,
};

export default theme;
