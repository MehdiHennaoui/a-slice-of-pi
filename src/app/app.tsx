import { PizzaIcon } from "lucide-react";
import { HomePage } from "@/pages/home";

export function App() {
	return (
		<div className="flex min-h-svh flex-col">
			<header className="flex h-14 shrink-0 items-center gap-3 border-b px-4 sm:px-6">
				<div className="flex items-center gap-2">
					<span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
						<PizzaIcon className="size-4" />
					</span>
					<h1 className="font-heading font-semibold text-sm">
						A Slice of Pi
						<span className="block text-muted-foreground text-xs">
							Dashboard
						</span>
					</h1>
				</div>
			</header>
			<main className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
				<HomePage />
			</main>
		</div>
	);
}
