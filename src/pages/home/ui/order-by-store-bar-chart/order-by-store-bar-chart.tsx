import {
	ListFilterIcon,
	PizzaIcon,
	RotateCcwIcon,
	RulerDimensionLineIcon,
	StoreIcon,
} from "lucide-react";
import { useState } from "react";
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
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { DataGuard } from "@/shared/components/ui/data-guard/data-guard";
import { FieldGroup } from "@/shared/components/ui/field";
import { formatDateRange } from "@/shared/lib/date";
import { tailwindSpacingToPx } from "@/shared/lib/tailwind-spacing";
import { useChoosePeriod } from "../../model/choose-period/use-choose-period";
import type { PizzaType } from "../../model/order/order";
import { useOrdersByStore } from "../../model/order/use-orders-by-store";
import type { PizzaSize } from "../../model/pricing/pricing";
import {
	chartConfig,
	PIZZA_FILTER_OPTIONS,
	PIZZA_SIZE_FILTER_OPTIONS,
} from "./chart-config";
import { orderByStoreText } from "./order-by-store-text";
import { SelectFilter } from "./select-filter";

const copy = orderByStoreText["order-by-store-chart"];

export function OrderByStoreBarChart({ className }: { className?: string }) {
	const [pizzaSelected, setPizzaSelected] = useState<PizzaType | "all">("all");
	const [pizzaSizeSelected, setPizzaSizeSelected] = useState<PizzaSize | "all">(
		"all",
	);

	const { range } = useChoosePeriod();
	const period = formatDateRange(range.from, range.to ?? range.from);
	const orderCountByStore = useOrdersByStore(pizzaSelected, pizzaSizeSelected);

	const hasActiveFilters =
		pizzaSelected !== "all" || pizzaSizeSelected !== "all";

	const handleResetFilters = () => {
		setPizzaSelected("all");
		setPizzaSizeSelected("all");
	};

	return (
		<section className={className}>
			<Card className="flex h-full flex-col">
				<CardHeader className="shrink-0">
					<CardTitle>
						<StoreIcon />{" "}
						<h1>
							{copy.title} {period}
						</h1>
					</CardTitle>
				</CardHeader>
				<CardContent className="flex min-h-0 flex-1 flex-col gap-2 lg:flex-row">
					<aside className="w-full lg:w-40">
						<div className="rounded-xl border border-border/70 bg-muted/35 p-3">
							<h2 className="mb-3 flex items-center gap-1.5 font-medium text-foreground text-sm">
								<ListFilterIcon className="size-3.5 text-muted-foreground" />
								{copy.filters.heading}
							</h2>
							<FieldGroup className="gap-3">
								<SelectFilter
									label={copy.filters.pizzaLabel}
									icon={
										<PizzaIcon className="size-3.5 text-muted-foreground" />
									}
									value={pizzaSelected}
									options={PIZZA_FILTER_OPTIONS}
									placeholder={copy.filters.pizzaPlaceholder}
									onValueChange={setPizzaSelected}
									className="w-full"
								/>
								<SelectFilter
									label={copy.filters.sizeLabel}
									icon={
										<RulerDimensionLineIcon className="size-3.5 text-muted-foreground" />
									}
									value={pizzaSizeSelected}
									options={PIZZA_SIZE_FILTER_OPTIONS}
									placeholder={copy.filters.sizePlaceholder}
									onValueChange={setPizzaSizeSelected}
									className="w-full"
								/>
								<Button
									variant="outline"
									className="w-full shrink-0 bg-card"
									disabled={!hasActiveFilters}
									onClick={handleResetFilters}
								>
									<RotateCcwIcon data-icon="inline-start" />
									{copy.filters.reset}
								</Button>
							</FieldGroup>
						</div>
					</aside>
					<div className="flex min-h-0 min-w-0 flex-1 flex-col">
						<DataGuard data={orderCountByStore}>
							<ChartContainer
								config={chartConfig}
								className="aspect-auto! h-full min-h-72 w-full lg:min-h-0"
							>
								<BarChart
									accessibilityLayer
									data={orderCountByStore}
									margin={{ top: tailwindSpacingToPx(5) }}
								>
									<CartesianGrid vertical={false} />
									<ChartTooltip
										content={
											<ChartTooltipContent indicator="line" labelKey="store" />
										}
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
									<YAxis dataKey="order_count" allowDecimals={false} />
								</BarChart>
							</ChartContainer>
						</DataGuard>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
