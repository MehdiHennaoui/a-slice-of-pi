import { StarIcon } from "lucide-react";
import { LabelList, Pie, PieChart, type PieLabelRenderProps } from "recharts";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { CURRENT_YEAR } from "@/shared/config";
import { tailwindSpacingToPx } from "@/shared/lib/tailwind-spacing";
import { reviewsBySentimentThisYear } from "../model/review/review";

const config: ChartConfig = {
	count: {
		label: "Reviews count",
	},
	delighted: {
		label: "Delighted",
		color: "var(--chart-3)",
	},
	happy: {
		label: "Happy",
		color: "var(--chart-2)",
	},
	sad: {
		label: "Sad",
		color: "var(--chart-4)",
	},
	angry: {
		label: "Angry",
		color: "var(--chart-1)",
	},
} satisfies ChartConfig;
const CHART_MARGIN = tailwindSpacingToPx(5);

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
						<PieChart accessibilityLayer>
							<ChartTooltip
								content={
									<ChartTooltipContent
										indicator="line"
										labelKey="sentiment"
										nameKey="count"
										className="min-w-40"
									/>
								}
							/>
							<Pie
								data={reviewsBySentimentThisYear}
								dataKey="count"
								nameKey="sentiment"
							>
								<LabelList
									dataKey="count"
									className="fill-background text-sm"
								/>
							</Pie>
							<ChartLegend
								content={<ChartLegendContent nameKey="sentiment" />}
							/>
						</PieChart>
					</ChartContainer>
				</CardContent>
			</Card>
		</section>
	);
}

const RADIAN = Math.PI / 180;
function renderLabel({
	cx,
	cy,
	midAngle,
	outerRadius,
	name,
}: PieLabelRenderProps) {
	if (cx == null || cy == null || midAngle == null || outerRadius == null) {
		return null;
	}
	const radius = Number(outerRadius) + 20;
	const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
	const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);
	return (
		<text
			x={x}
			y={y}
			fill="var(--foreground)"
			textAnchor={x > Number(cx) ? "start" : "end"}
			dominantBaseline="central"
		>
			{name}
		</text>
	);
}
