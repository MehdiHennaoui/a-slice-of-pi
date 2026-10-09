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
	}
>;

const orderDataArray = orderData as OrderDataType[];

export const orderCountByStore = orderDataArray.reduce(
	(acc, order: OrderDataType) => {
		acc[order.store] = {
			order_count: (acc[order.store]?.order_count || 0) + 1,
			fill: `var(--color-store-${order.store})`,
		};
		return acc;
	},
	{} as OrderCountByStoreType,
);
