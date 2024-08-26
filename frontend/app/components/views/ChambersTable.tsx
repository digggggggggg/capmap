import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export const ChambersTable = ({ chambers }: { chambers: Chamber[] }) => {
	if (!chambers.length) return <>No chambers to display here</>;

	const totalCapacity = chambers.reduce(
		(acc, chamber) => acc + chamber.total_capacity,
		0
	);
	const totalUsage = chambers.reduce(
		(acc, chamber) => acc + chamber.used_capacity,
		0
	);

	return (
		<Table>
			<TableCaption>A full list of our chambers.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Chamber ID</TableHead>
					<TableHead>Usage</TableHead>
					<TableHead>Capacity</TableHead>
					<TableHead className="text-right">Status</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{chambers?.length && chambers.map((chamber) => (
					<TableRow key={chamber.id}>
						<TableCell className="font-medium">{chamber.id}</TableCell>
						<TableCell>{chamber.used_capacity}</TableCell>
						<TableCell>{chamber.total_capacity}</TableCell>
						<TableCell className="text-right">
							{chamber.total_capacity > 0
								? (
										(chamber.used_capacity / chamber.total_capacity) *
										100
								  ).toFixed(0)
								: ""}
							{"%"}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell>Total</TableCell>
					<TableCell>{totalUsage}</TableCell>
					<TableCell>{totalCapacity}</TableCell>
					<TableCell className="text-right">
						{totalUsage > 0
							? ((totalUsage / totalCapacity) * 100).toFixed(0)
							: ""}
						{"%"}
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
};
