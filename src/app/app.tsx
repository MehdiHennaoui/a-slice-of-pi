import { PizzaIcon } from "lucide-react";
import { DateRangeProvider } from "@/features/date-range";
import { Home } from "@/pages/home/home";
import { appText } from "./app-text";

const copy = appText["app-header"];

export function App() {
	return (
		<DateRangeProvider>
			<div className="flex h-svh flex-col">
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sm:gap-3 sm:px-6">
					<div className="flex min-w-0 items-center gap-2">
						<span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
							<PizzaIcon className="size-4" />
						</span>
						<h1 className="truncate font-heading font-semibold text-sm">
							{copy.brand}
						</h1>
					</div>
				</header>
				<main className="min-h-0 flex-1 overflow-auto p-4 sm:p-6">
					<Home />
				</main>
			</div>
		</DateRangeProvider>
	);
}
