import { BadgeDollarSignIcon } from "lucide-react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { CURRENT_YEAR } from "@/shared/config";
import { totalMoneyForOneYear } from "../model/revenue/yearly-revenue";
import { yearlyRevenueText } from "./yearly-revenue-text";

const copy = yearlyRevenueText["yearly-revenue"];

export function YearlyRevenue({ className }: { className?: string }) {
	return (
		<section className={className}>
			<Card className="flex h-full min-h-0 flex-col">
				<CardHeader>
					<CardTitle>
						<BadgeDollarSignIcon />
						<h1>
							{copy.title} {CURRENT_YEAR}
						</h1>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="font-heading font-semibold text-4xl text-primary tabular-nums tracking-tight sm:text-5xl">
						{totalMoneyForOneYear}
						<span className="pl-1">{"$"}</span>
					</p>
				</CardContent>
			</Card>
		</section>
	);
}
