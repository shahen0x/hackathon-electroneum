import toast from "react-hot-toast";

const errorMessages: Record<string, string> = {
	InsufficientGas: "You do not have enough funds to cover gas fees.",
	UserAlreadyInPool: "You are already in the pool!",
	InsufficientFunds: "You do not have enough funds to join.",
};

export const handleOnChainError = (error: any) => {
	console.error("Error Object:", error);

	let errorMessage = "";

	// Extract the error message properly
	if (typeof error === "string") {
		errorMessage = error;
	} else if (error?.message) {
		errorMessage = error.message;
	} else if (error?.data?.message) {
		errorMessage = error.data.message;
	} else if (error?.reason) {
		errorMessage = error.reason;
	} else {
		errorMessage = JSON.stringify(error);
	}

	// Handle insufficient gas errors
	if (errorMessage.includes("insufficient funds for gas * price + value")) {
		toast.error(errorMessages.InsufficientGas);
		return;
	}

	// Match predefined error messages correctly
	const matchedError = Object.keys(errorMessages).find((key) =>
		errorMessage.includes(key)
	);

	// Show the correct error message
	toast.error(matchedError ? errorMessages[matchedError] : errorMessage);
};
