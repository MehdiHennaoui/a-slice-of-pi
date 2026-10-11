import { MonthlyRevenueLineChart } from "./ui/monthly-revenue-line-chart";
import { OrderByStoreBarChart } from "./ui/order-by-store-bar-chart";
import { ReviewPieChart } from "./ui/review-pie-chart";
import { YearlyRevenue } from "./ui/yearly-revenue";

export const HomePage = () => {
	return (
		<div className="grid gap-4 lg:h-full lg:min-h-[36rem] lg:grid-cols-2 lg:grid-rows-[auto_minmax(0,1fr)_minmax(0,1fr)] lg:gap-2.5">
			<YearlyRevenue className="animate-rise-in [animation-delay:60ms] lg:col-span-2" />
			<OrderByStoreBarChart className="animate-rise-in [animation-delay:120ms] lg:min-h-0" />
			<MonthlyRevenueLineChart className="animate-rise-in [animation-delay:180ms] lg:min-h-0" />
			<ReviewPieChart className="animate-rise-in [animation-delay:240ms] lg:col-span-2 lg:min-h-0" />
		</div>
	);
};
