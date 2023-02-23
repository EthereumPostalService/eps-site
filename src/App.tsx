import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { ThemeProvider } from "@emotion/react";
import EthMailForm from "./components/EPSMailForm";
import { createTheme } from "@mui/material";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";

import {
  WagmiConfig,
  configureChains,
  createClient,
  useAccount,
  useConnect,
  useDisconnect,
} from "wagmi";
import { localhost, optimism, mainnet, foundry } from "wagmi/chains";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const { provider, webSocketProvider } = configureChains(
  [mainnet, localhost, optimism, foundry],
  [publicProvider()]
);
const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});
interface WidgetProps {
  address: string | undefined;
}
function App(props: WidgetProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <WagmiConfig client={client}>
        {props.address && props.address.startsWith("0x") ? (
          <Card sx={{ maxWidth: 800 }}>
            <Profile />
            <CardMedia
              component="img"
              image="EPS-01.png"
              title="eps-logo"
            />
            <CardContent>
              <EthMailForm address={props.address as `0x${string}`} />
            </CardContent>
            <CardContent />
          </Card>
        ) : (
          <>Invalid contract address specified in widget.</>
        )}
      </WagmiConfig>
    </ThemeProvider>
  );
}

export default App;
function Profile() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (isConnected)
    return (
      <div style={{ float: "right" }}>
        {address?.substring(0, 6)}..
        {address?.substring(address?.length - 4)}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  return (
    <button style={{ float: "right" }} onClick={() => connect()}>
      Connect Wallet
    </button>
  );
}
