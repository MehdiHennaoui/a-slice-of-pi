import { GaugeIcon } from "lucide-react";
import { HomePage } from "@/pages/home";
import { Separator } from "@/shared/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { AppSidebar } from "./ui/app-sidebar";

export function App() {
	return (
		<TooltipProvider>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="my-auto mr-2 h-4" />
						<div className="flex items-center gap-2">
							<GaugeIcon className="size-4" />
							<h2 className="font-heading font-semibold text-base">
								Dashboard
							</h2>
						</div>
					</header>
					<main className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
						<HomePage />
					</main>
				</SidebarInset>
			</SidebarProvider>
		</TooltipProvider>
	);
}
