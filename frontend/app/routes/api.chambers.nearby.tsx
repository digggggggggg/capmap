import type { LoaderFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno
import { findChambersNearby } from "~/lib/backend/chambers";
import { validateCoordinates } from "~/lib/geo";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { searchParams } = new URL(request.url);
	const query = Object.fromEntries(new URLSearchParams(searchParams));

	const coordinates = validateCoordinates(query);
	if (!coordinates) {
		throw new Error("Invalid coordinates");
	}

	const data = await findChambersNearby(coordinates);

	return json(data, 200);
};
