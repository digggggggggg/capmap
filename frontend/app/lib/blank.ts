
export const Customer = {
	name: "",
	address: "",
	postcode: "",
	city: "London",
	country: "GB",
	longitude: 0,
	latitude: 0,
	id: 0,
	connected: false,
	usage: 0,
};
export const Geocoder = {
	query: "",
	coords: { latitude: 0, longitude: 0 },
};
export const Chambers = {
	query: "",
	results: [],
};
export const Chamber = {
	id: "",
	longitude: 0,
	latitude: 0,
	distance: 0,
	total_capacity: 0,
	used_capacity: 0,
};
export const Usage = 0;