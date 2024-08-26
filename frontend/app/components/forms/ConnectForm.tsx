import { useEffect, useState } from "react";
import * as blank from "~/lib/blank";
import { getCoordinatesFromAddress, validateCoordinates } from "~/lib/geo";
import { findChambersNearby, getChambers } from "~/lib/client/chambers";
import { createCustomer } from "~/lib/client/customers";
import { Form } from "@remix-run/react";
import ChambersMap from "../views/ChambersMap";
import UsageSelector from "./UsageSelect";
import { Alert } from "../template/Alert";

export default function ConnectForm(
	{
		//TODO: allow imput paramters to set initial render state of form
	}
) {
	const [customer, setCustomer] = useState<Customer>(blank.Customer);
	const [geocoder, setGeocoder] = useState<Geocoder>(blank.Geocoder);
	const [chambers, setChambers] = useState<Chambers>(blank.Chambers);
	const [chamber, setChamber] = useState<Chamber>(blank.Chamber);
	const [usage, setUsage] = useState<Usage>(blank.Usage);
	const [error, setError] = useState<string | null>(null);

	const customerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCustomer({
			...customer,
			[e.target.name]: e.target.value,
		});
	};
	const selectChamber = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const id = e.target.value;
		const chamber = chambers.results.find(
			(chamber: Chamber) => chamber.id == id
		);
		if (!chamber) {
			setChamber(blank.Chamber);
			return;
		}
		setChamber(chamber);
	};
	const selectUsage = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const usage = parseFloat(e.target.value);
		if (!usage) setUsage(0);
		setUsage(usage);
	};
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const capacity = chamber.total_capacity - chamber.used_capacity;

		let error;
		if (!usage) error = "Must select desired usage";
		if (usage > capacity) error = "This chamber does not have enough capacity";
		if (!!error) {
			console.error("Form validation failed", { error });
			setError(error);
			return;
		}

		const payload = {
			...customer,
			chamber_id: chamber.id,
			latitude: geocoder.coords.latitude,
			longitude: geocoder.coords.longitude,
			usage,
		};
		const result = await createCustomer(payload);
		console.log("Customer added", result);
	};

	useEffect(() => {
		const waitToGeocode = setTimeout(async () => {
			if (!customer.postcode) return;
			const query =
				`${customer.address} ${customer.postcode} ${customer.city}`.toUpperCase();
			if (query == geocoder.query) return;
			if (query !== "") {
				const coords = await getCoordinatesFromAddress(query);
				if (coords) {
					setGeocoder({ query, coords });
				} else {
					console.error("Geocoding failed", { query });
				}
			}
		}, 300);
		return () => clearTimeout(waitToGeocode);
	}, [customer, geocoder]);

	useEffect(() => {
		const findChambers = setTimeout(async () => {
			console.log("findChambers", { geocoder });
			if (!geocoder.coords) return;
			const coordinates = validateCoordinates(geocoder.coords);
			if (!coordinates) return;
			const query = `${geocoder.coords.latitude},${geocoder.coords.longitude}`;
			if (query == chambers.query) return;
			const results = await findChambersNearby(coordinates);
			if (results) {
				console.info("find chambers result", { query, results });
				setChambers({ query, results });
			} else {
				setChambers({ query, results: [] });
				console.error("Could not find chambers", { query });
			}
		}, 300);
		return () => clearTimeout(findChambers);
	}, [geocoder, chambers]);

	useEffect(() => {
		const loadAllChambers = setTimeout(async () => {
			console.log("loadAllChambers", { geocoder });
			if (validateCoordinates(geocoder.coords)) return;
			const query = "all";
			if (query == chambers.query) return;
			const results = await getChambers();
			if (results) {
				console.info("load all chambers result", { query, results });
				setChambers({ query, results });
			} else {
				setChambers({ query, results: [] });
				console.error("Could not load all chambers", { query });
			}
		}, 300);
		return () => clearTimeout(loadAllChambers);
	}, [geocoder, chambers]);

	return (
		<>
			{error && (
				<Alert isOpen className="error">
					{error}
				</Alert>
			)}
			<main className="grid h-full grid-rows-[180px_auto]">
				<Form
					method="post"
					action={"/connect"}
					onSubmit={onSubmit}
					className="form grid grid-cols-[1fr_1fr_100px] gap-5"
				>
					<div className={"flex flex-col gap-5"}>
						<h2>Customer Details</h2>
						<div className="grid grid-cols-[80px_auto]">
							<span>Postcode</span>
							<input
								type="text"
								name="postcode"
								value={customer.postcode}
								onChange={customerInput}
							/>
						</div>
						<div className="grid grid-cols-[80px_auto]">
							<span>Address</span>
							<input
								type="text"
								name="address"
								value={customer.address}
								onChange={customerInput}
							/>
						</div>
						<div className="grid grid-cols-[80px_auto]">
							<span>Name</span>
							<input
								type="text"
								name="name"
								value={customer.name}
								onChange={customerInput}
							/>
						</div>
					</div>
					<div className={"flex flex-col gap-5"}>
						<h2>Chamber Details</h2>
						<div className="grid grid-cols-[80px_auto]">
							<span>Chamber</span>
							<span>
								{chambers?.results?.length && (
									<select onChange={selectChamber}>
										<option value="">Select a chamber</option>
										{chambers?.results.map((chamber: Chamber) => {
											return (
												<option value={chamber.id} key={chamber.id}>
													{chamber.id}
													{chamber.distance && (
														<>
															{` - `}
															{(chamber?.distance / 1000).toFixed(1)}
															{"km"}
														</>
													)}
													{chamber.total_capacity > 0 && (
														<>
															{` - `}
															{(
																(chamber.used_capacity /
																	chamber.total_capacity) *
																100
															).toFixed(0)}
															{"%"}
														</>
													)}
												</option>
											);
										})}
									</select>
								)}
							</span>
						</div>
						<div className="grid grid-cols-[80px_auto]">
							<span>capacity</span>
							<span>
								{chamber.used_capacity}
								{" / "}
								{chamber.total_capacity}
							</span>
						</div>
						<div className="grid grid-cols-[80px_auto]">
							<span>requirement</span>
							<span>
								<UsageSelector
									onChange={selectUsage}
									max={
										chamber.used_capacity > chamber.total_capacity
											? 0
											: chamber.total_capacity - chamber.used_capacity
									}
								/>
							</span>
						</div>
					</div>
					<button type="submit">Add Customer</button>
				</Form>
				<div style={{ background: "#000", color: "#fff" }}>
					{geocoder?.coords?.latitude ? (
						<ChambersMap
							center={geocoder.coords}
							premises={[geocoder.coords]}
							chambers={chambers.results}
						/>
					) : (
						"Map will show here"
					)}
				</div>
			</main>
		</>
	);
}
