import { BadgeDollarSignIcon } from "lucide-react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { CURRENT_YEAR } from "@/shared/config";
import { totalMoneyForOneYear } from "../model/revenue/yearly-revenue";

export function YearlyRevenue({ className }: { className?: string }) {
	return (
		<section className={className}>
			<Card>
				<CardHeader>
					<CardTitle>
						<BadgeDollarSignIcon />
						<h1>Yearly Revenue for {CURRENT_YEAR}</h1>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="font-heading font-semibold text-4xl text-primary tabular-nums tracking-tight sm:text-5xl">
						{totalMoneyForOneYear}
						<span className="pl-1 text-3xl sm:text-4xl">{"$"}</span>
					</p>
				</CardContent>
			</Card>
		</section>
	);
}
