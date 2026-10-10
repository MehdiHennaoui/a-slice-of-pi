import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { CURRENT_YEAR } from "@/shared/config";
import { totalMoneyForOneYear } from "../model/revenue/yearly-revenue";

export function YearlyRevenue() {
	return (
		<section>
			<Card>
				<CardHeader>
					<CardTitle>
						<h1>Yearly Revenue for {CURRENT_YEAR}</h1>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="font-semibold text-2xl tabular-nums">
						{totalMoneyForOneYear}
						<span className="pl-1">{"$"}</span>
					</p>
				</CardContent>
			</Card>
		</section>
	);
}
