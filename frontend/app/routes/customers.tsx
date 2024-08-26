import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { get } from "~/lib/backend";

const getCustomers = async (): Promise<Customer[]> => {
	const resp = await get(`customers`);
	return await resp.json();
};

export async function loader() {
	return json(await getCustomers());
}

export default function Customers() {
	const data: Customer[] = useLoaderData();

	return (
		<>
			<h1>customers</h1>
			{data.map((customer: any) => (
				<div key={customer.id}>{JSON.stringify(customer)}</div>
			))}
		</>
	);
}
