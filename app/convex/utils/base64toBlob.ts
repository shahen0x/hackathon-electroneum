export function base64ToBlob(base64String: string, contentType: string = ''): Blob {
	// Remove data URL prefix if it exists
	const base64WithoutPrefix = base64String.includes('data:')
		? base64String.split(',')[1]
		: base64String;

	// Decode base64
	const binaryString = atob(base64WithoutPrefix);

	// Convert to byte array
	const bytes = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}

	// Create and return blob
	return new Blob([bytes], { type: contentType });
}