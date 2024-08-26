import { query } from '../lib/db';
import { Customer } from '../types';


/**
 * Get customers from database
 * 
 * @param query Query parameters to filter the list of customers returned
 * @returns Customers array from backend
 */
export const getCustomers = async (criteria?: Record<string, any>): Promise<Customer[]> => {
	try {
		//TODO: validate input and implement various search criteria
		const data = await query('SELECT * FROM customers', []);
		return data;
	}
	catch (error) {
		console.error("getCustomers error", error);
		throw error;
	}
}

/**
 * Create customer in database
 * 
 * @param payload containing all customer properties to persist
 * @returns array with 1 item confirming data was persisted containing the newly created customer id
 */
export const createCustomer = async (payload: Customer): Promise<Customer> => {
	try {

		//TODO: implement various checks and validations
		if (!payload) throw new Error("No customer data provided");
		if (!payload.name) throw new Error("Customer name is required");
		if (!payload.chamber_id) throw new Error("Chamber ID is required");

		// TODO: make explict this lazy dirty hack
		const params = ["name", "address", "postcode", "latitude", "longitude", "chamber_id", "usage"];
		//@ts-ignore
		const values = params.map(i => payload[i]);

		const insertQuery = `
      		INSERT INTO customers (${params.join(', ')}, geom)
      		VALUES (${params.map((name, i) => `$${i + 1} /* ${name} */`).join(', ')}, ST_SetSRID(ST_MakePoint(${payload.longitude}, ${payload.latitude}), 4326))
      		RETURNING * `;


		const data = await query(insertQuery, values);

		if (data.length !== 1) throw new Error("Customer not created");
		const customer = data[0];

		//TODO: Integration with other services: reporting, pubsub, marketing, etc

		return customer;
	}
	catch (error) {
		console.error("getCustomers error", error);
		throw error;
	}
}