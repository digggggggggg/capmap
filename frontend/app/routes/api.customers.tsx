import type { LoaderFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import type { ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno
import { createCustomer, getCustomers } from "~/lib/backend/customers";

export const loader = async ({
	request,
}: LoaderFunctionArgs) => {
	const { searchParams } = new URL(request.url);
	const query = Object.fromEntries(new URLSearchParams(searchParams));

	const data = await getCustomers(query);

	return json(data, 200);
};


export const action = async ({
	request,
}: ActionFunctionArgs) => {
	const payload = await request.json();

	switch (request.method) {
		case "POST": {
			const data = createCustomer(payload);
			return json(data, 200);
		}
		default:
			return json({ message: "Method not allowed" }, 405);
	}
};