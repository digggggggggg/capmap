import type { LoaderFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno
import { getChambers } from "~/lib/backend/chambers";

export const loader = async ({
	request,
}: LoaderFunctionArgs) => {
	const { searchParams } = new URL(request.url);
	const query = Object.fromEntries(new URLSearchParams(searchParams));

	const data = await getChambers(query);

	return json(data, 200);
};
