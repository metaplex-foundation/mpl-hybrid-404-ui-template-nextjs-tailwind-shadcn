import { DasApiAsset } from "@metaplex-foundation/digital-asset-standard-api";
import useUmiStore from "@/store/useUmiStore";
import { PublicKey, publicKey } from "@metaplex-foundation/umi";

interface TokenInfo {
  supply: BigInt;
  decimals: number;
  token_program: PublicKey;
}

export interface ExtendedDasApiAsset extends DasApiAsset {
  token_info: TokenInfo;
}

const fetchAsset = async (assetId: string): Promise<ExtendedDasApiAsset> => {
  const umi = useUmiStore.getState().umi;

  //@ts-ignore
  return await umi.rpc.getAsset(publicKey(assetId));
};

export default fetchAsset;
