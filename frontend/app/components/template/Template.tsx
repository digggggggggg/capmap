import Sidebar from "./Sidebar";

export default function Template({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen">
			<aside className="w-120 flex-col">
				<Sidebar />
			</aside>
			<div className="flex-col flex-1 p-2">
				<main className="h-full flex-1 overflow-y-auto">{children}</main>
			</div>
		</div>
	);
}
