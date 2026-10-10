import { MonthlyRevenueLineChart } from "./ui/monthly-revenue-line-chart";
import { OrderByStoreBarChart } from "./ui/order-by-store-bar-chart";
import { ReviewPieChart } from "./ui/review-pie-chart";
import { YearlyRevenue } from "./ui/yearly-revenue";

export const HomePage = () => {
	return (
		<div className="flex flex-col gap-2">
			<ReviewPieChart />
			<OrderByStoreBarChart />
			<YearlyRevenue />
			<MonthlyRevenueLineChart />
		</div>
	);
};
