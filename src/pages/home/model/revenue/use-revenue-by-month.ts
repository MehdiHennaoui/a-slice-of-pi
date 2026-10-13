import { useMemo } from "react";

import { useDateRange } from "@/features/date-range";
import { orderDataArray } from "@/pages/home/model/order/order";
import { isDateWithinRange } from "@/shared/lib/date";

import { getRevenueByMonth } from "./revenue-by-month";

export function useRevenueByMonth() {
	const { range } = useDateRange();
	const to = range.to ?? range.from;

	return useMemo(
		() =>
			getRevenueByMonth(
				orderDataArray.filter((order) =>
					isDateWithinRange(order.date, range.from, to),
				),
			),
		[range.from, to],
	);
}
