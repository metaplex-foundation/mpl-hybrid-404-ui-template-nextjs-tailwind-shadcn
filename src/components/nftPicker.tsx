import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import fetchEscrowAssets from "@/lib/fetchEscrowAssets";
import fetchUserAssets from "@/lib/fetchUserAssets";
import {
  DasApiAsset,
  DasApiAssetList,
} from "@metaplex-foundation/digital-asset-standard-api";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";

const NftPicker = ({
  children,
  wallet,
  setSelectedAsset,
}: {
  children: React.ReactNode;
  name?: string;
  wallet: "user" | "escrow";
  setSelectedAsset: (asset: DasApiAsset) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [assets, setAssets] = useState<DasApiAssetList>();

  const handleSelection = (asset: DasApiAsset) => {
    setIsOpen(false);
    setSelectedAsset(asset);
  };

  useEffect(() => {
    if (!isOpen) return;
    console.log("fetching assets");
    setIsSearching(true);
    if (wallet === "user") {
      // fetch user assets
      fetchUserAssets().then((assets) => {
        console.log({ assets });
        setIsSearching(false);
        if (assets) {
          //sort assets by name
          setAssets(assets);
        }
      });
    } else if (wallet === "escrow") {
      // fetch escrow assets
      fetchEscrowAssets().then((assets) => {
        console.log({ assets });
        setIsSearching(false);
        if (assets) {
          //sort assets by name
          setAssets(assets);
        }
      });
    }
  }, [isOpen, wallet]);

  const assetList = assets?.items
    .sort((a, b) =>
      a.content.metadata.name.localeCompare(
        b.content.metadata.name,
        undefined,
        { numeric: true }
      )
    )
    .map((asset) => {
      const image =
        (asset.content.files?.[0]?.cdn_uri ??
        (asset.content.links as { image?: string })?.image ??
        "fallback.png") as string;

      return (
        <Card
          key={asset.id}
          className="p-2 flex flex-col gap-4 cursor-pointer h-fit"
          onClick={() => handleSelection(asset)}
        >
          <img
            src={image}
            alt={asset.content.metadata.name}
            className="rounded-lg w-full aspect-square"
          />
          <div className="col-span-3">
            <p className="text-lg font-bold">{asset.content.metadata.name}</p>
          </div>
        </Card>
      );
    });

  return (
    <Dialog
      onOpenChange={(o) => (o ? setIsOpen(true) : setIsOpen(false))}
      open={isOpen}
    >
      <DialogTrigger disabled={true} asChild className="cursor-pointer">
        {children}
      </DialogTrigger>
      <DialogContent className="w-full max-w-[1000px] max-h-[560px] h-full flex flex-col">
        <DialogHeader>
          <DialogTitle>
            Select an NFT from {wallet === "escrow" ? "escrow" : "your wallet"}
          </DialogTitle>
        </DialogHeader>

        {assetList && assetList.length > 0 ? (
          <div className="grid grid-cols-4 gap-4 overflow-auto p-2">
            {assetList}
          </div>
        ) : (
          !isSearching && (
            <div className="flex flex-1 flex-col justify-center w-full items-center">
              <div>No assets found!</div>
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NftPicker;
