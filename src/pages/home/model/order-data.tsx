import slugify from "@sindresorhus/slugify";

import orderData from "./order_data.json";

type StoreType = "Kanata" | "Orleans" | "Downtown" | "Sandy Hill" | "The Glebe";
type PizzaType =
	| "Cheese"
	| "Pepperoni"
	| "Deluxe"
	| "Meatlovers"
	| "Hawaiian"
	| "Margherita";

type OrderDataType = {
	order_id: number;
	store: StoreType;
	items: {
		type: PizzaType;
		size: string;
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

const orderDataArray = orderData as OrderDataType[];
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
