import { createThirdwebClient } from "thirdweb";


const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;

export const clientThirdweb = createThirdwebClient({
	clientId: clientId,
});