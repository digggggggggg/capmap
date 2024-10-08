import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

// First we create our UI with the form doing a POST and the inputs with the
// names we are going to use in the strategy
export default function Screen() {
	return (
		<Form method="post" className="flex flex-col space-y-4">
			<input
				type="email"
				name="email"
				required
				className="border border-gray-300 p-2 rounded-md"
			/>
			<input
				type="password"
				name="password"
				autoComplete="current-password"
				required
				className="border border-gray-300 p-2 rounded-md"
			/>
			<button className="bg-blue-500 text-white py-2 px-4 rounded-md">
				Sign In
			</button>
		</Form>
	);
}

// Second, we need to export an action function, here we will use the
// `authenticator.authenticate method`
export async function action({ request }: ActionFunctionArgs) {
	// we call the method with the name of the strategy we want to use and the
	// request object, optionally we pass an object with the URLs we want the user
	// to be redirected to after a success or a failure
	return await authenticator.authenticate("user-pass", request, {
		successRedirect: "/dashboard",
		failureRedirect: "/login",
	});
}

// Finally, we can export a loader function where we check if the user is
// authenticated with `authenticator.isAuthenticated` and redirect to the
// dashboard if it is or return null if it's not
export async function loader({ request }: LoaderFunctionArgs) {
	// If the user is already authenticated redirect to /dashboard directly
	return await authenticator.isAuthenticated(request, {
		successRedirect: "/dashboard",
	});
}
