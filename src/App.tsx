import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { ThemeProvider } from "@emotion/react";
import EthMailForm from "./components/EPSMailForm";
import { createTheme } from "@mui/material";
import { DynamicContextProvider, DynamicWidget } from "@dynamic-labs/sdk-react";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { Box } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <DynamicContextProvider
        theme={"dark"}
        settings={{
          appName: "EPS",
          appLogoUrl: "EPS-01.png",
          environmentId: "a1608d4b-85bc-4adb-b5a0-ed4ee480fa37",
          initialAuthenticationMode: "connect-only",
        }}
      >
        <DynamicWagmiConnector>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ maxWidth: 800, margin: "5vh", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
              <Box sx={{ float: "right", p: 1 }}>
                <DynamicWidget
                  variant="dropdown"
                  buttonClassName="MuiButtonBase-root MuiButton-roo"
                  innerButtonComponent={
                    <Box sx={{ pl: 1, pr: 1 }}>Connect Wallet</Box>
                  }
                />
              </Box>
              <CardMedia component="img" image="EPS-01.png" title="eps-logo" />
              <CardContent>
                <EthMailForm
                  address={"0x2156fcCff55637317D211B62318007309378fB95"}
                />
              </CardContent>
            </Card>
          </div>

        </DynamicWagmiConnector>
      </DynamicContextProvider>
    </ThemeProvider >
  );
}

export default App;
