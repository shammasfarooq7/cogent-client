// packages block
import React, { useState } from 'react';
import MainRoutes from "./routes";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
import { SnackbarProvider } from 'notistack';
import { CloseButton, SnackbarUtilsConfiguration } from './components/common/Alert';
import { UserContext } from './context/user-context';


export function App() {
  const [user, setUser] = useState(null);

  return (
    <SnackbarProvider
      maxSnack={5} autoHideDuration={5000} action={key => <CloseButton id={key} />}
      preventDuplicate={true} anchorOrigin={{ vertical: "top", horizontal: "right" }}
      classes={{ containerRoot: 'snackbarProvider' }}
    >
      <>
        <SnackbarUtilsConfiguration />

        <ApolloProvider client={client}>
          {/* <AuthContextProvider> */}
          {/* <ThemeProvider theme={customTheme}>
            <CssBaseline /> */}
          <UserContext.Provider value={{ user, setUser }}>
            <MainRoutes />
          </UserContext.Provider>

          {/* </ThemeProvider> */}
          {/* </AuthContextProvider> */}
        </ApolloProvider>
      </>
    </SnackbarProvider>
  );
}

export default App;
