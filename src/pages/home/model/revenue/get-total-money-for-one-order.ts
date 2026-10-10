import type { OrderDataType } from "../order/order";
import { getPizzaPrice } from "../pricing/pricing";

export function getTotalMoneyForOneOrder({ items }: OrderDataType) {
	if (!items || items.length === 0) {
		return 0;
	}

	return items.reduce((acc, item) => {
		return acc + getPizzaPrice(item.type, item.size);
	}, 0);
}
