import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">{`Let's get lit!`}</h1>
      <ul className="list-disc mt-4 pl-6 space-y-2">
        <li><Link to="/login">Login</Link></li>
      </ul>
    </div>
  );
}
