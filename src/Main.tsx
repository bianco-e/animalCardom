import { ThemeProvider } from "styled-components";
import theme from "./styles/globalColors";
import Router from "./Router";
import { HandsContext } from "./context/HandsContext";
import AuthProvider from "./0auth/Provider";

const Main = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <HandsContext>
          <Router></Router>
        </HandsContext>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Main;
