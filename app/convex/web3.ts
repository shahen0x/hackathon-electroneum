import { getContract } from "thirdweb";
import { thirdwebClient } from "./authWallet";
import { chain } from "~/config/chain";
import { abiPoolERC20 } from "~/thirdweb/abi/abi.pool.erc20";
import { abiPoolNative } from "~/thirdweb/abi/abi.pool.native";

export const poolContract = (address: string, isNative: boolean = true) => {
    return getContract({
        client: thirdwebClient,
        chain,
        address: address ,
        abi: isNative ? abiPoolNative : abiPoolERC20,
    });
}