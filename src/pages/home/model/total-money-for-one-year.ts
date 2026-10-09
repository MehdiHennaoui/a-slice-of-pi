import type { OrderDataType } from "@/pages/home/model/order-data";
import { orderDataArray } from "@/pages/home/model/order-data";
import { getPizzaPrice } from "@/pages/home/model/pricing-data";
import { CURRENT_YEAR } from "@/shared/config";
import { isCurrentYear } from "@/shared/lib/is-current-year";

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
