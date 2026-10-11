import { LayoutDashboardIcon, PizzaIcon } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/shared/components/ui/sidebar";

export function AppSidebar() {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<div className="flex items-center gap-2 py-1">
					<span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
						<PizzaIcon className="size-4" />
					</span>
					<div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
						<h1 className="truncate font-heading font-semibold text-sidebar-foreground text-sm">
							A Slice of Pi
						</h1>
					</div>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton isActive tooltip="Dashboard">
									<LayoutDashboardIcon />
									<span>Dashboard</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
