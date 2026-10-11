import { MonthlyRevenueLineChart } from "./ui/monthly-revenue-line-chart";
import { OrderByStoreBarChart } from "./ui/order-by-store-bar-chart";
import { ReviewPieChart } from "./ui/review-pie-chart";
import { YearlyRevenue } from "./ui/yearly-revenue";

export const HomePage = () => {
	return (
		<div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
			<YearlyRevenue className="animate-rise-in [animation-delay:60ms] lg:col-span-2" />
			<OrderByStoreBarChart className="animate-rise-in [animation-delay:120ms]" />
			<MonthlyRevenueLineChart className="animate-rise-in [animation-delay:180ms]" />
			<ReviewPieChart className="animate-rise-in [animation-delay:240ms] lg:col-span-2" />
		</div>
	);
};
