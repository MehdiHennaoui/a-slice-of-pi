import { ChartLineIcon } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { useDateRange } from "@/features/date-range";
import { useRevenueByMonth } from "@/pages/home/model/revenue/use-revenue-by-month";
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
import { DataGuard } from "@/shared/components/ui/data-guard/data-guard";
import { formatDateRange } from "@/shared/lib/date";
import { tailwindSpacingToPx } from "@/shared/lib/tailwind-spacing";
import { monthlyRevenueText } from "./monthly-revenue-text";

const copy = monthlyRevenueText["monthly-revenue-chart"];

const chartConfig: ChartConfig = {
	total: {
		label: copy.seriesLabel,
		color: "var(--chart-1)",
	},
};

export function MonthlyRevenueLineChart({ className }: { className?: string }) {
	const { range } = useDateRange();
	const period = formatDateRange(range.from, range.to ?? range.from);
	const revenueByMonth = useRevenueByMonth();

	return (
		<section className={className}>
			<Card className="flex h-full flex-col">
				<CardHeader className="shrink-0">
					<CardTitle>
						<ChartLineIcon />
						<h1>
							{copy.title} {period}
						</h1>
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-1 flex-col">
					<DataGuard data={revenueByMonth}>
						<ChartContainer
							config={chartConfig}
							className="aspect-auto! h-full min-h-72 w-full lg:min-h-0"
						>
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
								<YAxis
									dataKey="total"
									tickFormatter={(value) => `${value} $`}
								/>
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
					</DataGuard>
				</CardContent>
			</Card>
		</section>
	);
}
