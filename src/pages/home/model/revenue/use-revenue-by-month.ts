import { useMemo } from "react";

import { isDateWithinRange } from "@/shared/lib/date";

import { useChoosePeriod } from "../choose-period/use-choose-period";
import { orderDataArray } from "../order/order";
import { getRevenueByMonth } from "./revenue-by-month";

export function useRevenueByMonth() {
	const { range } = useChoosePeriod();
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
