import { cn } from "cn";
import { StarIcon } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { CURRENT_YEAR } from "@/shared/config";
import { tailwindSpacingToPx } from "@/shared/lib/tailwind-spacing";
import { reviewsBySentimentThisYear } from "../model/review/review";

const config: ChartConfig = {
	delighted: {
		color: "var(--chart-3)",
	},
	happy: {
		color: "var(--chart-2)",
	},
	sad: {
		color: "var(--chart-4)",
	},
	angry: {
		color: "var(--chart-1)",
	},
} satisfies ChartConfig;
const CHART_MARGIN = tailwindSpacingToPx(10);

export function ReviewPieChart({ className }: { className?: string }) {
	return (
		<section className={className}>
			<Card className="flex h-full min-h-0 flex-col">
				<CardHeader className="shrink-0">
					<CardTitle>
						<StarIcon /> <h1>Reviews {CURRENT_YEAR} by sentiment</h1>
					</CardTitle>
				</CardHeader>
				<CardContent className="flex min-h-0 flex-1 flex-col">
					<ChartContainer
						config={config}
						className="mx-auto aspect-square h-full max-h-full min-h-72 w-auto lg:min-h-0"
					>
						<PieChart
							accessibilityLayer
							margin={{
								top: CHART_MARGIN,
								right: CHART_MARGIN,
								bottom: CHART_MARGIN,
								left: CHART_MARGIN,
							}}
						>
							<ChartTooltip
								content={
									<ChartTooltipContent
										formatter={(value) => `${value} reviews`}
									/>
								}
							/>
							<Pie
								data={reviewsBySentimentThisYear}
								label={({ name }) => name}
								dataKey="count"
								nameKey="sentiment"
							>
								<LabelList
									dataKey="count"
									className="fill-background text-sm"
								/>
							</Pie>
						</PieChart>
					</ChartContainer>
				</CardContent>
			</Card>
		</section>
	);
}
