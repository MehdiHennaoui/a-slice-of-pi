import { OrderByStoreBarChart } from "@/pages/home/ui/order-by-store-bar-chart";
import { ReviewPieChart } from "@/pages/home/ui/review-pie-chart";

export const HomePage = () => {
	return (
		<div className="flex flex-col gap-2">
			<ReviewPieChart />
			<OrderByStoreBarChart />
		</div>
	);
};
