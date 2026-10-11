import {
	ListFilterIcon,
	PizzaIcon,
	RotateCcwIcon,
	ScalingIcon,
	StoreIcon,
} from "lucide-react";
import { type ReactNode, useMemo, useState } from "react";
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
import { CURRENT_YEAR } from "@/shared/config";
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

export function OrderByStoreBarChart({ className }: { className?: string }) {
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

	const hasActiveFilters =
		pizzaSelected !== "all" || pizzaSizeSelected !== "all";

	const handleResetFilters = () => {
		setPizzaSelected("all");
		setPizzaSizeSelected("all");
	};

	return (
		<section className={className}>
			<Card>
				<CardHeader className="gap-4 border-b pb-(--card-spacing)">
					<CardTitle>
						<StoreIcon /> <h1>Order by Store for {CURRENT_YEAR}</h1>
					</CardTitle>
					<div className="rounded-xl border border-border/70 bg-muted/35 p-3">
						<h2 className="mb-3 flex items-center gap-1.5 font-medium text-foreground text-sm">
							<ListFilterIcon className="size-3.5 text-muted-foreground" />
							Filters
						</h2>
						<FieldGroup className="gap-3 sm:flex-row sm:items-end">
							<SelectFilter
								label="Pizza"
								icon={<PizzaIcon className="size-3.5 text-muted-foreground" />}
								value={pizzaSelected}
								options={PIZZA_FILTER_OPTIONS}
								placeholder="for example: Margherita"
								onValueChange={setPizzaSelected}
								className="min-w-0 flex-1"
							/>
							<SelectFilter
								label="Size"
								icon={
									<ScalingIcon className="size-3.5 text-muted-foreground" />
								}
								value={pizzaSizeSelected}
								options={PIZZA_SIZE_FILTER_OPTIONS}
								placeholder="for example: S"
								onValueChange={setPizzaSizeSelected}
								className="min-w-0 flex-1"
							/>
							<Button
								variant="outline"
								className="w-full shrink-0 bg-card sm:w-auto"
								disabled={!hasActiveFilters}
								onClick={handleResetFilters}
							>
								<RotateCcwIcon data-icon="inline-start" />
								Reset filters
							</Button>
						</FieldGroup>
					</div>
				</CardHeader>
				<CardContent>
					{orderCountByStore.length > 0 ? (
						<ChartContainer config={chartConfig}>
							<BarChart accessibilityLayer data={orderCountByStore}>
								<CartesianGrid vertical={false} />
								<ChartTooltip
									content={<ChartTooltipContent labelKey="store" />}
								/>
								<Bar
									dataKey="order_count"
									fill="var(--chart-1)"
									radius={[6, 6, 0, 0]}
								>
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
						<div className="flex min-h-40 items-center justify-center rounded-lg border border-border/80 border-dashed bg-muted/20 px-4 text-center text-muted-foreground text-sm">
							No orders found for the selected filters
						</div>
					)}
				</CardContent>
			</Card>
		</section>
	);
}

type SelectFilterOption = string;
type SelectFilterProps<T extends SelectFilterOption> = {
	label: string;
	icon?: ReactNode;
	value: T;
	options: readonly T[];
	placeholder: string;
	onValueChange: (value: T) => void;
	className?: string;
};

const SIZE_LABELS: Record<string, string> = {
	all: "All",
	S: "Small",
	M: "Medium",
	L: "Large",
};

function formatFilterOption(option: string) {
	return SIZE_LABELS[option] ?? option;
}

function SelectFilter<T extends SelectFilterOption>({
	label,
	icon,
	value,
	options,
	placeholder,
	onValueChange,
	className,
}: SelectFilterProps<T>) {
	return (
		<Field className={className}>
			<FieldLabel className="items-center font-medium text-foreground text-xs tracking-[0.08em]">
				{icon}
				{label}
			</FieldLabel>
			<Select
				value={value}
				onValueChange={(nextValue) => onValueChange(nextValue as T)}
			>
				<SelectTrigger className="w-full bg-card">
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem key={option} value={option}>
							{formatFilterOption(option)}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</Field>
	);
}
