/**
 * Represents the a chamber location
 */
declare type Chamber = {
	id: string;
	latitude: number;
	longitude: number;
	total_capacity: number;
	used_capacity: number;
	distance: number;
}

/**
 * Represents a customer pr
 */
declare type Customer = {
	id?: number;
	latitude: number;
	longitude: number;
	name: string;
	address: string;
	postcode: string;
	city: string;
	country: string;
	chamber_id?: Chamber.id;
	usage?: number;
	created_at?: Date | string;
}

/**
 * Represents the coordinates of a location.
 */
declare type Coordinates = {
	longitude: number;
	latitude: number;
}

declare type Geocoder = {
	query: string,
	coords: Coordinates
};

declare type Chambers = {
	query: string,
	results: Chamber[]
};

declare type Usage = number;