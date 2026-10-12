import { StarIcon } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { CURRENT_YEAR } from "@/shared/config";
import { reviewsBySentimentThisYear } from "../../model/review/review";
import { chartConfig } from "./chart-config";

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
						config={chartConfig}
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
