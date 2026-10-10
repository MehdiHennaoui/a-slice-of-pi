import type { OrderDataType } from "@/pages/home/model/order/order";
import { orderDataArray } from "@/pages/home/model/order/order";
import { getTotalMoneyForOneOrder } from "@/pages/home/model/revenue/get-total-money-for-one-order";
import { isCurrentYear } from "@/shared/lib/is-current-year";

export const totalMoneyForOneYear = getTotalMoneyForOneYear(orderDataArray);

export function getTotalMoneyForOneYear(orderDataArray: OrderDataType[]) {
	return orderDataArray.reduce((acc, order) => {
		if (order.items.length === 0 || !isCurrentYear(order.date)) {
			return acc;
		}

		return acc + getTotalMoneyForOneOrder(order);
	}, 0);
}
