import { BarChart, CartesianGrid } from "recharts";
import orderData from "@/pages/home/model/order_data.json";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/shared/components/ui/chart";

const chartConfig: ChartConfig = {};

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
						<BarChart data={orderData}>
							<CartesianGrid vertical={false} />
						</BarChart>
					</ChartContainer>
				</CardContent>
			</Card>
		</section>
	);
}
