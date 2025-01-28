import { ExtendedDasApiAsset } from "@/lib/das/fetchAsset";
import { DasApiAsset } from "@metaplex-foundation/digital-asset-standard-api";
import { Token } from "@metaplex-foundation/mpl-toolbox";
import { create } from "zustand";

interface TokenState {
  tokenAccount: Token | undefined | null;
  updateTokenAccount: (tokenAccount: Token | null) => void;
  tokenAsset: ExtendedDasApiAsset | undefined | null;
  updateTokenAsset: (tokenAsset: ExtendedDasApiAsset) => void;
}

const useTokenStore = create<TokenState>()((set) => ({
  tokenAccount: undefined,
  updateTokenAccount: (tokenAccount: Token | null) => set({ tokenAccount }),
  tokenAsset: undefined,
  updateTokenAsset: (tokenAsset: ExtendedDasApiAsset) => set({ tokenAsset }),
}));

export default useTokenStore;
