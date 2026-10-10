import type { PizzaType } from "../order/order";
import pricingData from "./pricing-data.json";

export const PIZZA_SIZES = ["S", "M", "L"] as const;
export type PizzaSize = (typeof PIZZA_SIZES)[number];
type PricingDataType = Record<PizzaType, Record<PizzaSize, number>>;

const pricingObject = pricingData as PricingDataType;

export function getPizzaPrice(type: PizzaType, size: PizzaSize) {
	return pricingObject[type]?.[size] ?? 0;
}
