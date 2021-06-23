import { ThemeProvider } from "styled-components";
import theme from "./styles/globalColors";
import Router from "./Router";
import { HandsContext } from "./context/HandsContext";
import { UserContext } from "./context/UserContext";
import AuthProvider from "./0auth/Provider";

const Main = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <HandsContext>
          <UserContext>
            <Router></Router>
          </UserContext>
        </HandsContext>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Main;
