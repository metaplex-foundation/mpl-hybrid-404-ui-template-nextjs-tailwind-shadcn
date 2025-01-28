"use client";

import fetchUserTokenAccount from "@/lib/fetchUserTokenAccount";
import useTokenStore from "@/store/useTokenStore";
import useUmiStore from "@/store/useUmiStore";
import { useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import TokenImage from "@/assets/images/token.jpg";
import { formatTokenAmount } from "@/lib/utils";

const TokenBalance = () => {
  const umiSigner = useUmiStore().signer;
  const { updateTokenAccount, tokenAccount, tokenAsset } = useTokenStore();

  useEffect(() => {
    if (!umiSigner) {
      return;
    }
    console.log("fetching token account of user " + umiSigner.publicKey);
    fetchUserTokenAccount()
      .then((account) => {
        updateTokenAccount(account);
      })
      .catch((e) => {
        if (
          e.message.includes(
            "The account of type [Token] was not found at the provided address"
          )
        ) {
          updateTokenAccount(null);
        }
      });
  }, [umiSigner, updateTokenAccount]);

  return (
    <div className="flex gap-4 items-center">
      <img
        src={TokenImage.src}
        className="aspect-square w-8 h-8 rounded-full"
        alt="token image"
      />
      {(tokenAccount || tokenAccount === null) && tokenAsset ? (
        <div className="w-full text-center">
          {tokenAccount === null
            ? "0"
            : "Balance: " +  formatTokenAmount(tokenAccount.amount, tokenAsset.token_info.decimals)}
        </div>
      ) : (
        <Skeleton className="w-full min-w-[150px] h-8" />
      )}
    </div>
  );
};

export default TokenBalance;
