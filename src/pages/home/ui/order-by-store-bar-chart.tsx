import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

import { orderCountByStore } from "../model/order/order";
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

const chartConfig: ChartConfig = {
	order_count: {
		label: "Order count",
	},
	kanata: {
		label: "Kanata",
		color: "var(--chart-1)",
	},
	orleans: {
		label: "Orleans",
		color: "var(--chart-2)",
	},
	downtown: {
		label: "Downtown",
		color: "var(--chart-3)",
	},
	"sandy-hill": {
		label: "Sandy Hill",
		color: "var(--chart-4)",
	},
	"the-glebe": {
		label: "The Glebe",
		color: "var(--chart-5)",
	},
};

export function OrderByStoreBarChart() {
	return (
		<section>
			<Card>
				<CardHeader>
					<CardTitle>
						<h1>Order by Store</h1>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<ChartContainer config={chartConfig}>
						<BarChart data={orderCountByStore}>
							<CartesianGrid vertical={false} />
							<ChartTooltip
								content={<ChartTooltipContent labelKey="store" />}
							/>
							<Bar dataKey="order_count">
								<LabelList
									dataKey="order_count"
									position="top"
									className="fill-foreground text-sm"
								/>
							</Bar>
							<XAxis
								dataKey="store"
								tickFormatter={(value) =>
									String(
										chartConfig[value as keyof typeof chartConfig]?.label ??
											value,
									)
								}
							/>
							<YAxis dataKey="order_count" />
						</BarChart>
					</ChartContainer>
				</CardContent>
			</Card>
		</section>
	);
}
