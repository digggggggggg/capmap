import { get, post } from "~/lib/backend";

/**
 * Get all customers
 * 
 * @param query Query parameters to filter the list of customers returned
 * @returns Customers array from backend
 */
export const getCustomers = async (query?: Record<string, any>): Promise<Customer[]> => {

	const resp = await get("customers", query);
	const data = await resp.json();

	return data;
}

/**
 * Creates a customer profile with the given personal details
 * 
 * @param payload - All customer props
 * @returns Result from backend including customer id
 */
export const createCustomer = async (payload: Customer): Promise<Customer> => {

	const response = await post("customers", payload);
	const result = await response.json();
	console.log("createCustomer", { payload, result });

	return result;
}