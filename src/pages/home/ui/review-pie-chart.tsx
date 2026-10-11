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
import { reviewsBySentimentThisYear } from "../model/review/review";

const config: ChartConfig = {
	delighted: {
		color: "var(--chart-1)",
	},
	happy: {
		color: "var(--chart-2)",
	},
	sad: {
		color: "var(--chart-3)",
	},
	angry: {
		color: "var(--chart-4)",
	},
} satisfies ChartConfig;

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
						className="mx-auto aspect-square max-h-50 w-auto"
					>
						<PieChart accessibilityLayer>
							<ChartTooltip content={<ChartTooltipContent />} />
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
