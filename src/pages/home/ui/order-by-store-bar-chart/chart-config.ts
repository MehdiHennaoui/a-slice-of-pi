import type { ChartConfig } from "@/shared/components/ui/chart";
import { PIZZA_TYPES } from "../../model/order/order";
import { PIZZA_SIZES } from "../../model/pricing/pricing";
import { orderByStoreText } from "./order-by-store-text";

const copy = orderByStoreText["order-by-store-chart"];

export const chartConfig = {
	order_count: {
		label: copy.orderCountLabel,
	},
	kanata: {
		label: copy.stores.kanata,
		color: "var(--chart-1)",
	},
	orleans: {
		label: copy.stores.orleans,
		color: "var(--chart-2)",
	},
	downtown: {
		label: copy.stores.downtown,
		color: "var(--chart-3)",
	},
	"sandy-hill": {
		label: copy.stores["sandy-hill"],
		color: "var(--chart-4)",
	},
	"the-glebe": {
		label: copy.stores["the-glebe"],
		color: "var(--chart-5)",
	},
} satisfies ChartConfig;

export const PIZZA_FILTER_OPTIONS = ["all", ...PIZZA_TYPES] as const;
export const PIZZA_SIZE_FILTER_OPTIONS = ["all", ...PIZZA_SIZES] as const;
