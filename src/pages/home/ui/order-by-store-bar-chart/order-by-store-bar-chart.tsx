import {
	ListFilterIcon,
	PizzaIcon,
	RotateCcwIcon,
	RulerDimensionLineIcon,
	StoreIcon,
} from "lucide-react";
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
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { FieldGroup } from "@/shared/components/ui/field";
import { CURRENT_YEAR } from "@/shared/config";
import { tailwindSpacingToPx } from "@/shared/lib/tailwind-spacing";
import {
	countOrdersByStore,
	filterOrdersByPizzaTypeOrSize,
	orderDataArray,
	type PizzaType,
} from "../../model/order/order";
import type { PizzaSize } from "../../model/pricing/pricing";
import {
	chartConfig,
	PIZZA_FILTER_OPTIONS,
	PIZZA_SIZE_FILTER_OPTIONS,
} from "./chart-config";
import { SelectFilter } from "./select-filter";

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
			<Card className="flex h-full flex-col">
				<CardHeader className="shrink-0">
					<CardTitle>
						<StoreIcon /> <h1>Order by Store for {CURRENT_YEAR}</h1>
					</CardTitle>
				</CardHeader>
				<CardContent className="flex min-h-0 flex-1 flex-col gap-2 lg:flex-row">
					<aside className="w-full lg:w-40">
						<div className="rounded-xl border border-border/70 bg-muted/35 p-3">
							<h2 className="mb-3 flex items-center gap-1.5 font-medium text-foreground text-sm">
								<ListFilterIcon className="size-3.5 text-muted-foreground" />
								Filters
							</h2>
							<FieldGroup className="gap-3">
								<SelectFilter
									label="Pizza"
									icon={
										<PizzaIcon className="size-3.5 text-muted-foreground" />
									}
									value={pizzaSelected}
									options={PIZZA_FILTER_OPTIONS}
									placeholder="for example: Margherita"
									onValueChange={setPizzaSelected}
									className="w-full"
								/>
								<SelectFilter
									label="Size"
									icon={
										<RulerDimensionLineIcon className="size-3.5 text-muted-foreground" />
									}
									value={pizzaSizeSelected}
									options={PIZZA_SIZE_FILTER_OPTIONS}
									placeholder="for example: S"
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
									Reset filters
								</Button>
							</FieldGroup>
						</div>
					</aside>
					<div className="flex min-h-0 min-w-0 flex-1 flex-col">
						{orderCountByStore.length > 0 ? (
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
									<YAxis dataKey="order_count" />
								</BarChart>
							</ChartContainer>
						) : (
							<div className="flex h-full min-h-40 items-center justify-center rounded-lg border border-border/80 border-dashed bg-muted/20 px-4 text-center text-muted-foreground text-sm">
								No orders found for the selected filters
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
