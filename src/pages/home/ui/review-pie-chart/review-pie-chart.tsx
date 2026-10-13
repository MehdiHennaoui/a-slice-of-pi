import { StarIcon } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
import { useDateRange } from "@/features/date-range";
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
import { DataGuard } from "@/shared/components/ui/data-guard/data-guard";
import { formatDateRange } from "@/shared/lib/date";
import { useReviewsBySentiment } from "../../model/review/use-reviews-by-sentiment";
import { chartConfig } from "./chart-config";
import { reviewText } from "./review-text";

const copy = reviewText["review-chart"];

export function ReviewPieChart({ className }: { className?: string }) {
	const { range } = useDateRange();
	const period = formatDateRange(range.from, range.to ?? range.from);
	const reviewsBySentiment = useReviewsBySentiment();

	return (
		<section className={className}>
			<Card className="flex h-full min-h-0 flex-col">
				<CardHeader className="shrink-0">
					<CardTitle>
						<StarIcon />{" "}
						<h1>
							{copy.title} {period} {copy.titleSuffix}
						</h1>
					</CardTitle>
				</CardHeader>
				<CardContent className="flex min-h-0 flex-1 flex-col">
					<DataGuard data={reviewsBySentiment}>
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
									data={reviewsBySentiment}
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
					</DataGuard>
				</CardContent>
			</Card>
		</section>
	);
}
