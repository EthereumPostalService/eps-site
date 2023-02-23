import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { ThemeProvider } from "@emotion/react";
import EthMailForm from "./components/EPSMailForm";
import { Button, Chip, createTheme } from "@mui/material";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";

import {
  WagmiConfig,
  configureChains,
  createClient,
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import { optimism, mainnet, foundry } from "wagmi/chains";
import {
  DynamicContextProvider,
  DynamicWidget,
  useDynamicContext,
} from "@dynamic-labs/sdk-react";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { Box } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface WidgetProps {
  address: string | undefined;
}

function App(props: WidgetProps) {
  const contract = useContract();
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
          <Card sx={{ maxWidth: 800 }}>
            <Box sx={{ float: "right", p: 1 }}>
              <DynamicWidget variant="dropdown" />
            </Box>
            {/* <Profile /> */}
            <CardMedia component="img" image="EPS-01.png" title="eps-logo" />
            <CardContent>
              {contract ? (
                <EthMailForm address={contract} />
              ) : (
                <>Loading network data</>
              )}
            </CardContent>
            <CardContent />
          </Card>
        </DynamicWagmiConnector>
      </DynamicContextProvider>
    </ThemeProvider>
  );
}

export default App;




export const useContract = () => {
  const [contract, setContract] = React.useState<`0x${string}`>();
  const { chain } = useNetwork();
  const contracts: Map<number, `0x${string}`> = new Map([
    [1, "0xethere"],
    [10, "0xC4bB0109C691cAED058Eec6D68F5458476C6413D"],
  ]);
  React.useEffect(() => {
    if (chain && contracts.get(chain.id)) {
      setContract(contracts.get(chain.id));
    }
  }, [chain]);
  return contract;
};




function Profile() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { user, handleLogOut, setShowAuthFlow, showAuthFlow, walletConnector } =
    useDynamicContext();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (isConnected && chain)
    return (
      <Card style={{ float: "right" }}>
        <CardContent>
          {chains.map((x: { id: React.Key | null | undefined; name: any }) => (
            <Button
              disabled={!switchNetwork || x.id === chain?.id}
              key={x.id}
              onClick={() => switchNetwork?.(x.id)}
            >
              {x.name}
              {isLoading && pendingChainId === x.id && " (switching)"}
            </Button>
          ))}
          {/* {!contracts.get(chain.network)
            ? "Invalid chain"
            : chain.name} */}
          <Chip
            label={
              address?.substring(0, 6) +
              "..." +
              address?.substring(address?.length - 4)
            }
          />
          <Button color="error" variant="outlined" onClick={() => disconnect()}>
            Disconnect
          </Button>
        </CardContent>
      </Card>
    );
  return (
    <Card sx={{ float: "right" }}>
      <CardContent>
        <Button
          variant="outlined"
          color="success"
          onClick={() => setShowAuthFlow(true)}
        >
          Connect Wallet
        </Button>
      </CardContent>
    </Card>
  );
}
