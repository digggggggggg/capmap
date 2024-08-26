import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { get } from "~/lib/backend";
import { ChambersTable } from "~/components/views/ChambersTable";
import ChambersMap from "~/components/views/ChambersMap";

const getChambers = async (): Promise<Chamber[]> => {
	const resp = await get(`chambers`);
	return await resp.json();
};

export async function loader() {
	return json(await getChambers());
}

export default function Chambers() {
	const data: Chamber[] = useLoaderData();

	return (
		<main className="grid grid-rows-[300px_auto]">
			<div className="overflow-y-auto h-300">
				<ChambersTable chambers={data} />
			</div>
			<div>
				<ChambersMap chambers={data} />
			</div>
		</main>
	);
}
