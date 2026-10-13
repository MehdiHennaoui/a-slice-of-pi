import { ChoosePeriodProvider } from "./model/choose-period/use-choose-period";
import { ChoosePeriod } from "./ui/choose-period/choose-period";
import { MonthlyRevenueLineChart } from "./ui/monthly-revenue-line-chart";
import { OrderByStoreBarChart } from "./ui/order-by-store-bar-chart/order-by-store-bar-chart";
import { ReviewPieChart } from "./ui/review-pie-chart/review-pie-chart";
import { YearlyRevenue } from "./ui/yearly-revenue";

export const Home = () => {
	return (
		<ChoosePeriodProvider>
			<div className="grid gap-4 lg:h-full lg:min-h-180 lg:grid-cols-2 lg:grid-rows-[auto_minmax(0,1fr)_minmax(0,1fr)] lg:gap-2.5">
				<div className="grid gap-4 lg:col-start-1 lg:grid-cols-2 lg:gap-2.5">
					<ChoosePeriod className="w-full animate-rise-in" />
					<YearlyRevenue className="animate-rise-in [animation-delay:60ms]" />
				</div>
				<OrderByStoreBarChart className="animate-rise-in [animation-delay:120ms] lg:col-start-1 lg:min-h-0" />
				<ReviewPieChart className="animate-rise-in [animation-delay:180ms] lg:min-h-0" />
				<MonthlyRevenueLineChart className="animate-rise-in [animation-delay:240ms] lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:min-h-0" />
			</div>
		</ChoosePeriodProvider>
	);
};
