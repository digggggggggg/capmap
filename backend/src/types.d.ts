export type Chamber = {
	id: string;
	latitude: number;
	longitude: number;
	total_capacity: number;
	used_capacity: number;
	distance: number;
}

/**
 * Represents a customer.
 *
 * @typedef {Object} Customer
 * @property {number} [id] - The customer's ID.
 * @property {number} latitude - The customer's latitude.
 * @property {number} longitude - The customer's longitude.
 * @property {string} name - The customer's name.
 * @property {string} address - The customer's address.
 * @property {string} postcode - The customer's postcode.
 * @property {string} city - The customer's city.
 * @property {string} country - The customer's country.
 * @property {string} [chamber_id] - The ID of the chamber associated with the customer.
 * @property {number} [usage] - The customer's usage.
 * @property {Date | string} [created_at] - The date and time the customer was created.
 */
export type Customer = {
	id?: number;
	latitude: number;
	longitude: number;
	name: string;
	address: string;
	postcode: string;
	city: string;
	country: string;
	chamber_id?: string;
	usage?: number;
	created_at?: Date | string;
}

/**
 * Represents the coordinates of a location.
 */
export type Coordinates = {
	longitude: number;
	latitude: number;
}