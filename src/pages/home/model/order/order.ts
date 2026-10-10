import slugify from "@sindresorhus/slugify";
import type { PizzaSize } from "../pricing/pricing";
import orderData from "./order-data.json";

export const PIZZA_TYPES = [
	"Cheese",
	"Pepperoni",
	"Deluxe",
	"Meatlovers",
	"Hawaiian",
	"Margherita",
] as const;
export type StoreType =
	| "Kanata"
	| "Orleans"
	| "Downtown"
	| "Sandy Hill"
	| "The Glebe";
export type PizzaType = (typeof PIZZA_TYPES)[number];
export type OrderDataType = {
	order_id: number;
	store: StoreType;
	items: {
		type: PizzaType;
		size: PizzaSize;
	}[];
	date: string;
};
type OrderCountByStoreType = Record<
	StoreType,
	{
		order_count: number;
		fill: string;
		store: string;
	}
>;

export const orderDataArray = orderData as OrderDataType[];

export function countOrdersByStore(orderDataArray: OrderDataType[]) {
	return Object.values(
		orderDataArray.reduce((acc, order: OrderDataType) => {
			const storeSlug = slugify(order.store);
			acc[order.store] = {
				store: storeSlug,
				order_count: (acc[order.store]?.order_count || 0) + 1,
				fill: `var(--color-${storeSlug})`,
			};
			return acc;
		}, {} as OrderCountByStoreType),
	);
}

export function filterOrdersByPizzaTypeOrSize(
	orderDataArray: OrderDataType[],
	pizzaType: PizzaType | "all",
	pizzaSize: PizzaSize | "all",
) {
	if (pizzaType === "all" && pizzaSize === "all") {
		return orderDataArray;
	}

	if (pizzaType === "all") {
		return orderDataArray.filter((order) =>
			order.items.some((item) => item.size === pizzaSize),
		);
	}

	if (pizzaSize === "all") {
		return orderDataArray.filter((order) =>
			order.items.some((item) => item.type === pizzaType),
		);
	}

	return orderDataArray.filter((order) =>
		order.items.some(
			(item) => item.type === pizzaType && item.size === pizzaSize,
		),
	);
}
