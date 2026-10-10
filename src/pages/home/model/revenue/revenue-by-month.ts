import type { OrderDataType } from "@/pages/home/model/order/order";
import { orderDataArray } from "@/pages/home/model/order/order";
import { getTotalMoneyForOneOrder } from "@/pages/home/model/revenue/get-total-money-for-one-order";
import { displayMonthName, getMonthNumber } from "@/shared/lib/date";
import { isCurrentYear } from "@/shared/lib/is-current-year";

type RevenueByMonthType = { month: string; total: number };
type OrderPerMonthAndYear = Record<string, { month: string; total: number }>;

export const revenueByMonth = getRevenueByMonth(orderDataArray);

export function getRevenueByMonth(
	orders: OrderDataType[],
): RevenueByMonthType[] {
	return Object.values(groupOrdersByMonthAndYear(orders));
}

function groupOrdersByMonthAndYear(
	orders: OrderDataType[],
): OrderPerMonthAndYear {
	return orders.reduce((acc, order) => {
		const { date } = order;

		if (!isCurrentYear(date)) {
			return acc;
		}

		const monthName = displayMonthName(date);
		const monthNumber = getMonthNumber(date);

		if (monthNumber === null) {
			return acc;
		}

		const previousTotal = acc[monthNumber]?.total ?? 0;

		acc[monthNumber] = {
			month: monthName,
			total: previousTotal + getTotalMoneyForOneOrder(order),
		};
		return acc;
	}, {} as OrderPerMonthAndYear);
}
