/**
 * Converts an object into a URL-encoded query string.
 * 
 * @param params The object containing the query parameters.
 * @returns A URL-encoded query string.
 */
export function generateQueryString(params: Record<string, any>): string {
	const queryParts: string[] = [];
	for (const [key, value] of Object.entries(params)) {
		// Encode both the key and the value to ensure the query string is valid.
		const encodedKey = encodeURIComponent(key);
		const encodedValue = encodeURIComponent(value);
		queryParts.push(`${encodedKey}=${encodedValue}`);
	}
	return queryParts.join('&');
}
