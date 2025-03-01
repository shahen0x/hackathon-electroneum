export function isISODate(str: string): boolean {
	if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str)) {
		return false;
	}

	const timestamp = Date.parse(str);
	return !isNaN(timestamp);
}