import { generateQueryString } from "./network";

//TODO: server-level handling of backend error messages
//TODO: handle 403 errors, unauthorised or expired tokens

/**
 * Performs a POST request to the specified resource on our backend
 * 
 * @param resource The resource to request.
 * @param data The json data to stringify and send in the request.
 * @returns A promise that resolves to the response from the server.
 */
export const post = async (resource: string, data: any) => {
	return fetch(`${process.env.BACKEND_SERVER}/${resource}`, {
		method: "POST",
		headers: {
			// TODO: Replace this with real user token
			"Authentication": "Bearer token",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	});
}

/**
 * Performs a GET request to the specified resource on our backend
 * 
 * @param resource The resource to request.
 * @param query The query parameters to include in the request.
 * @returns A promise that resolves to the response from the server.
 */
export const get = async (resource: string, query?: any) => {
	let queryString = "";
	if (query) {
		queryString = `?${generateQueryString(query)}`;
	}
	return fetch(`${process.env.BACKEND_SERVER}/${resource}${queryString}`, {
		method: "GET",
		headers: {
			// TODO: Replace this with real user token
			"Authentication": "Bearer token"
		}
	});
}