'use client';

import {
  DynamicContextProvider,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { ReactNode } from "react";

export function DynamicProvider({ children }: { children: ReactNode }) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "66fc4d99-d0eb-463e-93b4-8a547c5ad2d7",
        walletConnectors: [EthereumWalletConnectors],
        defaultNetwork: "bsc",
        rpcProviders: {
          bsc: {
            rpcUrl: "https://bsc-dataseed1.bnbchain.org:443",
          },
        },
        
        initialAuthenticationMode: 'connect-only',
          mobileExperience: 'redirect',
          deepLinkPreference: 'universal',
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
