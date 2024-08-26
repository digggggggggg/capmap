import { Link } from "@remix-run/react";

export default function Navigation() {
	return (
		<ul>
			<li className="text-white hover:bg-gray-700">
				<Link className="block p-4 h-full w-full" to="/dashboard">
					Dashboard
				</Link>
			</li>
			<li className="text-white hover:bg-gray-700">
				<Link className="block p-4 h-full w-full" to="/connect">
					Connect
				</Link>
			</li>
			<li className="text-white hover:bg-gray-700">
				<Link className="block p-4 h-full w-full" to="/chambers">
					Chambers
				</Link>
			</li>
			<li className="text-white hover:bg-gray-700">
				<Link className="block p-4 h-full w-full" to="/customers">
					Customers
				</Link>
			</li>
		</ul>
	);
}
