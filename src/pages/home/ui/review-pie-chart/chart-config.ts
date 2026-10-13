import type { ChartConfig } from "@/shared/components/ui/chart";
import { reviewText } from "./review-text";

const copy = reviewText["review-chart"];

export const chartConfig = {
	count: {
		label: copy.countLabel,
	},
	delighted: {
		label: copy.legend.delighted,
		color: "var(--chart-3)",
	},
	happy: {
		label: copy.legend.happy,
		color: "var(--chart-2)",
	},
	sad: {
		label: copy.legend.sad,
		color: "var(--chart-4)",
	},
	angry: {
		label: copy.legend.angry,
		color: "var(--chart-1)",
	},
} satisfies ChartConfig;
