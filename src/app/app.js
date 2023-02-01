// packages block
import React from 'react';
import MainRoutes from "./routes";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
import { SnackbarProvider } from 'notistack';
import { CloseButton, SnackbarUtilsConfiguration } from './components/common/Alert';


export function App() {
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
            {/* <AppContextProvider> */}
              <MainRoutes />
            {/* </AppContextProvider> */}
          {/* </ThemeProvider> */}
        {/* </AuthContextProvider> */}
      </ApolloProvider>
      </>
      </SnackbarProvider>
  );
}

export default App;
