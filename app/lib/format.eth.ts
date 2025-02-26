export const formatEth = (value?: string | number, symbol?: string) => {
	if (value === undefined || value === null) return "~";

	const num = Number(value);
	return `${num.toLocaleString(undefined, {
		minimumFractionDigits: num % 1 === 0 ? 0 : 2,
		maximumFractionDigits: 2,
	})} ${symbol ?? ""}`;
};