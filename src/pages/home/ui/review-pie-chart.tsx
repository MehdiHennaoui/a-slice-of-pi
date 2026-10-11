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
			<Card>
				<CardHeader>
					<CardTitle>
						<StarIcon /> <h1>Reviews {CURRENT_YEAR} by sentiment</h1>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<ChartContainer
						config={config}
						className="mx-auto aspect-square max-h-96 w-auto"
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
