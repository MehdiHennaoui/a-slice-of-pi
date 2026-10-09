import { CURRENT_YEAR } from "@/shared/config";
import { isCurrentYear } from "@/shared/lib/is-current-year";
import type { OrderDataType } from "../order/order";
import { orderDataArray } from "../order/order";
import { getPizzaPrice } from "../pricing/pricing";

export const totalMoneyForOneYear = getTotalMoneyForOneYear(
	orderDataArray,
	CURRENT_YEAR,
);

export function getTotalMoneyForOneYear(
	orderDataArray: OrderDataType[],
	yearSelected = CURRENT_YEAR,
) {
	return orderDataArray.reduce((acc, order) => {
		if (order.items.length === 0 || !isCurrentYear(order.date, yearSelected)) {
			return acc;
		}

		return acc + getTotalMoneyForOneOrder(order);
	}, 0);
}

function getTotalMoneyForOneOrder({ items }: OrderDataType) {
	if (!items || items.length === 0) {
		return 0;
	}

	return items.reduce((acc, item) => {
		return acc + getPizzaPrice(item.type, item.size);
	}, 0);
}
