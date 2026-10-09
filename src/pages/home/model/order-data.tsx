import slugify from "@sindresorhus/slugify";
import orderData from "@/pages/home/model/order_data.json";
import type { PizzaSize } from "@/pages/home/model/pricing-data";

export type StoreType =
	| "Kanata"
	| "Orleans"
	| "Downtown"
	| "Sandy Hill"
	| "The Glebe";
export type PizzaType =
	| "Cheese"
	| "Pepperoni"
	| "Deluxe"
	| "Meatlovers"
	| "Hawaiian"
	| "Margherita";

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
export const orderCountByStore = countOrdersByStore(orderDataArray);

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
