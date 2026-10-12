import type { ChartConfig } from "@/shared/components/ui/chart";
import { PIZZA_TYPES } from "../../model/order/order";
import { PIZZA_SIZES } from "../../model/pricing/pricing";

export const chartConfig: ChartConfig = {
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

export const PIZZA_FILTER_OPTIONS = ["all", ...PIZZA_TYPES] as const;
export const PIZZA_SIZE_FILTER_OPTIONS = ["all", ...PIZZA_SIZES] as const;
