import { useMemo, useState } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	XAxis,
	YAxis,
} from "recharts";
import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { Field, FieldGroup, FieldLabel } from "@/shared/components/ui/field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import {
	countOrdersByStore,
	filterOrdersByPizzaTypeOrSize,
	orderDataArray,
	PIZZA_TYPES,
	type PizzaType,
} from "../model/order/order";
import { PIZZA_SIZES, type PizzaSize } from "../model/pricing/pricing";

const chartConfig: ChartConfig = {
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
const PIZZA_FILTER_OPTIONS = ["all", ...PIZZA_TYPES] as const;
const PIZZA_SIZE_FILTER_OPTIONS = ["all", ...PIZZA_SIZES] as const;

export function OrderByStoreBarChart() {
	const [pizzaSelected, setPizzaSelected] = useState<PizzaType | "all">("all");
	const [pizzaSizeSelected, setPizzaSizeSelected] = useState<PizzaSize | "all">(
		"all",
	);

	const orderCountByStore = useMemo(() => {
		return countOrdersByStore(
			filterOrdersByPizzaTypeOrSize(
				orderDataArray,
				pizzaSelected,
				pizzaSizeSelected,
			),
		);
	}, [pizzaSelected, pizzaSizeSelected]);

	const handleResetFilters = () => {
		setPizzaSelected("all");
		setPizzaSizeSelected("all");
	};

	return (
		<section>
			<Card>
				<CardHeader>
					<CardTitle>
						<h1>Order by Store</h1>
					</CardTitle>
					<CardDescription>
						<FieldGroup>
							<SelectFilter
								label="Filter by Pizza"
								value={pizzaSelected}
								options={PIZZA_FILTER_OPTIONS}
								placeholder="Select a pizza"
								onValueChange={setPizzaSelected}
							/>
							<SelectFilter
								label="Filter by Pizza Size"
								value={pizzaSizeSelected}
								options={PIZZA_SIZE_FILTER_OPTIONS}
								placeholder="Select a pizza size"
								onValueChange={setPizzaSizeSelected}
							/>
							<Button onClick={handleResetFilters}>Reset Filters</Button>
						</FieldGroup>
					</CardDescription>
				</CardHeader>
				<CardContent>
					{orderCountByStore.length > 0 ? (
						<ChartContainer config={chartConfig}>
							<BarChart data={orderCountByStore}>
								<CartesianGrid vertical={false} />
								<ChartTooltip
									content={<ChartTooltipContent labelKey="store" />}
								/>
								<Bar dataKey="order_count">
									<LabelList
										dataKey="order_count"
										position="top"
										className="fill-foreground text-sm"
									/>
								</Bar>
								<XAxis
									dataKey="store"
									tickFormatter={(value) =>
										String(
											chartConfig[value as keyof typeof chartConfig]?.label ??
												value,
										)
									}
								/>
								<YAxis dataKey="order_count" />
							</BarChart>
						</ChartContainer>
					) : (
						<div>No orders found for the selected filters</div>
					)}
				</CardContent>
			</Card>
		</section>
	);
}

type SelectFilterOption = string;
type SelectFilterProps<T extends SelectFilterOption> = {
	label: string;
	value: T;
	options: readonly T[];
	placeholder: string;
	onValueChange: (value: T) => void;
};

function SelectFilter<T extends SelectFilterOption>({
	label,
	value,
	options,
	placeholder,
	onValueChange,
}: SelectFilterProps<T>) {
	return (
		<Field>
			<FieldLabel>
				{label} {value}
			</FieldLabel>
			<Select
				value={value}
				onValueChange={(nextValue) => onValueChange(nextValue as T)}
			>
				<SelectTrigger>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem key={option} value={option}>
							{option}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</Field>
	);
}
