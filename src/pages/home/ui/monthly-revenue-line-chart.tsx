import { ChartLineIcon } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
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
import { CURRENT_YEAR } from "@/shared/config";
import { tailwindSpacingToPx } from "@/shared/lib/tailwind-spacing";

const chartConfig: ChartConfig = {
	total: {
		label: "Revenue",
		color: "var(--chart-1)",
	},
};

export function MonthlyRevenueLineChart({ className }: { className?: string }) {
	return (
		<section className={className}>
			<Card className="flex h-full flex-col">
				<CardHeader>
					<CardTitle>
						<ChartLineIcon />
						<h1>Monthly Revenue for {CURRENT_YEAR}</h1>
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-1 flex-col justify-end">
					<ChartContainer config={chartConfig} className="h-full">
						<LineChart accessibilityLayer data={revenueByMonth}>
							<CartesianGrid vertical={false} strokeDasharray="3 3" />
							<Line
								type="monotone"
								dataKey="total"
								strokeWidth={2.5}
								stroke="var(--chart-1)"
								dot={{ r: 3, fill: "var(--chart-1)" }}
								activeDot={{ r: 5 }}
							/>
							<XAxis
								dataKey="month"
								padding={{
									left: tailwindSpacingToPx(2),
									right: tailwindSpacingToPx(2),
								}}
							/>
							<YAxis dataKey="total" tickFormatter={(value) => `${value} $`} />
							<ChartTooltip
								cursor={false}
								content={
									<ChartTooltipContent
										indicator="line"
										formatter={(value) => `${value} $`}
									/>
								}
							/>
						</LineChart>
					</ChartContainer>
				</CardContent>
			</Card>
		</section>
	);
}
