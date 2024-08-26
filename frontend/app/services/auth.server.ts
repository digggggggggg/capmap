// app/services/auth.server.ts
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import { generateToken } from "~/lib/security";

export let authenticator = new Authenticator<User | null>(sessionStorage);

authenticator.use(
	new FormStrategy(async ({ form }) => {
		const email = form.get("email") as string;
		const password = form.get("password") as string;
		if (!email) return null;
		let user = await login(email, password);
		return user;
	}),
	"user-pass"
);


type User = { email: string; token: string };
const login = async (email: string, password: string) => {
	if (password !== 'password') return null;
	//TODO: actual verirfication of the user would happen here
	const token = generateToken({ email })
	const user = { email, token };
	return user;
}
