import {
	CartesianGrid,
	LabelList,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "recharts";
import { revenueByMonth } from "@/pages/home/model/revenue/revenue-by-month";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import type { ChartConfig } from "@/shared/components/ui/chart";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shared/components/ui/chart";

const chartConfig: ChartConfig = {};

export function MonthlyRevenueLineChart() {
	return (
		<section>
			<Card>
				<CardHeader>
					<CardTitle>
						<h1>Monthly Revenue</h1>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<ChartContainer config={chartConfig}>
						<LineChart accessibilityLayer data={revenueByMonth}>
							<CartesianGrid />
							<Line type="monotone" dataKey="total">
								<LabelList
									dataKey="total"
									position="top"
									offset={12}
									className="fill-foreground"
									formatter={(value) => `${value} $`}
								/>
							</Line>
							<XAxis dataKey="month" />
							<YAxis dataKey="total" tickFormatter={(value) => `${value} $`} />
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent indicator="line" />}
							/>
						</LineChart>
					</ChartContainer>
				</CardContent>
			</Card>
		</section>
	);
}
