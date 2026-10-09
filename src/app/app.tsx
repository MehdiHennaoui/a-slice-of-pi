import { HomePage } from "@/pages/home";

export function App() {
	return (
		<div className="container mx-auto flex min-h-screen flex-col gap-2 p-2">
			<h1 className="font-bold text-2xl">A Slice of Pi</h1>
			<main className="flex grow flex-col">
				<HomePage />
			</main>
		</div>
	);
}
