import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useLoaderData,
	useRouteError,
} from "@remix-run/react";
import "./tailwind.css";
import Template from "./components/template/Template";
import { Status, Wrapper } from "@googlemaps/react-wrapper";

export async function loader() {
	const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "";
	return {
		ENV: {
			//TODO: change this, I don't like it but it's how remix says we should do it
			GOOGLE_API_KEY,
		},
	};
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	const data = useLoaderData<typeof loader>();
	return (
		<Template>
			<Wrapper
				apiKey={typeof window !== "undefined" ? window.ENV.GOOGLE_API_KEY : ""}
				render={(status: Status) => <h1>{status}</h1>}
			>
				<Outlet />
			</Wrapper>
			<script
				dangerouslySetInnerHTML={{
					__html: `window.ENV = ${JSON.stringify(data.ENV)}`,
				}}
			/>
			<Scripts />
		</Template>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return (
			<>
				<h1>
					{error.status} {error.statusText}
				</h1>
				<p>{error.data}</p>
			</>
		);
	}

	return (
		<>
			<h1>Error!</h1>
			<p>{error?.message ?? "Unknown error"}</p>
		</>
	);
}
