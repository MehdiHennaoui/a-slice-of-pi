import type { ChartConfig } from "@/shared/components/ui/chart";

export const chartConfig = {
	count: {
		label: "Reviews count",
	},
	delighted: {
		label: "Delighted",
		color: "var(--chart-3)",
	},
	happy: {
		label: "Happy",
		color: "var(--chart-2)",
	},
	sad: {
		label: "Sad",
		color: "var(--chart-4)",
	},
	angry: {
		label: "Angry",
		color: "var(--chart-1)",
	},
} satisfies ChartConfig;
