import { get } from "~/lib/backend";

/**
 * Get all chambers
 * 
 * @param query Query parameters to filter the list of chambers returned
 * @returns Chambers array from backend
 */
export const getChambers = async (query?: Record<string, any>): Promise<Chamber[]> => {

	const resp = await get("chambers", query);
	const data = await resp.json();

	return data;
}

/**
 * Finds chambers  near the given coordinates
 * 
 * @param coordinates Object of type `Coordinates`, with a longitue and latitude
 * @returns Chambers array from backend
 */
export const findChambersNearby = async (coordinates: Coordinates): Promise<Chamber[]> => {

	const resp = await get("chambers/nearby", coordinates);
	const data = await resp.json();

	return data;
}