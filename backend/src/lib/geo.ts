import { Coordinates } from "../types";


/**
 * Checks if a given string is a valid UK postcode.
 * 
 * @param Props object containing `{latitude:any, longitude:any}` coordinates
 * @returns Coordinates object containing `{latitude:number, longitude:number}` coordinates
 */
export const validateCoordinates = (props: any): Coordinates | null => {
	const coordinates: Coordinates = {
		latitude: parseFloat(props.latitude),
		longitude: parseFloat(props.longitude),
	};
	if (isNaN(coordinates.latitude) || isNaN(coordinates.longitude)) {
		return null;
	}
	if (coordinates.latitude === 0 || coordinates.longitude === 0) {
		return null;
	}
	//TODO: check coordinates are within acceptable range - no point looking for data in France yet
	return coordinates;
};
