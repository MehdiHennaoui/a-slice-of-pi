import { LabelList, Pie, PieChart } from "recharts";

import { reviewsBySentimentThisYear } from "@/pages/home/model/review-data";
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

export function ReviewPieChart() {
	return (
		<section>
			<Card>
				<CardHeader>
					<CardTitle>
						<h1>Review Pie Chart 2026 by sentiment</h1>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<ChartContainer
						config={config}
						className="mx-auto aspect-square max-h-50 w-auto"
					>
						<PieChart>
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
