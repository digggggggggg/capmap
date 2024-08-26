import { query } from '../lib/db';
import { validateCoordinates } from '../lib/geo';
import { Chamber, Coordinates } from '../types';


/**
 * Get chambers from database
 * 
 * @param query Query parameters to filter the list of chambers returned
 * @returns Chambers array from backend
 */
export const getChambers = async (criteria?: Record<string, any>): Promise<Chamber[]> => {
	try {
		//TODO: validate input and implement various search criteria
		const data = await query('SELECT * FROM chambers', []);
		return data;
	}
	catch (error) {
		console.error("getChambers error", error);
		throw error;
	}
}

/**
 * Finds chambers  near the given coordinates
 * 
 * @param coordinatesInput Object of type `Coordinates`, with a longitue and latitude
 * @returns Chambers array from backend
 */
export const findChambersNearby = async (coordinatesInput: Coordinates): Promise<Chamber[]> => {
	try {

		const coordinates = validateCoordinates(coordinatesInput);
		if (!coordinates) {
			throw new Error("Invalid coordinates");
		}

		const data = await query(`
			SELECT
				chambers.*,
				ST_Distance(ST_SetSRID(ST_MakePoint($1, $2), 4326), chambers.geom) AS distance
			FROM
				chambers
			ORDER BY
				distance ASC
			LIMIT 10;
    `, [coordinates.longitude, coordinates.latitude]);
		return data;
	}
	catch (error) {
		throw error;
	}
}


/**
 * Finds chambers  near the given customer, by customer_id
 * 
 * @param coordinates Object of type `Coordinates`, with a longitue and latitude
 * @returns Chambers array from backend
 */
export const findChambersNearCustomer = async (customer_id: number): Promise<Chamber[]> => {
	try {
		const data = await query(`
      		SELECT
      		chambers.*,
        		ST_Distance(customers.geom, chambers.geom) AS distance
      		FROM
      		chambers,
        		customers
      		WHERE
      		customers.id = $1
      		ORDER BY
          distance ASC;
    `, [customer_id]);
		return data;
	}
	catch (error) {
		throw error;
	}
}