import { useMemo } from "react";

import { useDateRange } from "@/features/date-range";
import { isDateWithinRange } from "@/shared/lib/date";

import type { PizzaSize } from "../pricing/pricing";
import {
	countOrdersByStore,
	filterOrdersByPizzaTypeOrSize,
	orderDataArray,
	type PizzaType,
} from "./order";

export function useOrdersByStore(
	pizzaType: PizzaType | "all",
	pizzaSize: PizzaSize | "all",
) {
	const { range } = useDateRange();
	const to = range.to ?? range.from;

	return useMemo(() => {
		const ordersInRange = orderDataArray.filter((order) =>
			isDateWithinRange(order.date, range.from, to),
		);

		return countOrdersByStore(
			filterOrdersByPizzaTypeOrSize(ordersInRange, pizzaType, pizzaSize),
		);
	}, [pizzaType, pizzaSize, range.from, to]);
}
