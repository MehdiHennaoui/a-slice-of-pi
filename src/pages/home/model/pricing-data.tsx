import type { PizzaType } from "./order-data";
import pricingData from "./pricing_data.json";

export type PizzaSize = "S" | "M" | "L";
type PricingDataType = Record<PizzaType, Record<PizzaSize, number>>;

const pricingObject = pricingData as PricingDataType;

export function getPizzaPrice(type: PizzaType, size: PizzaSize) {
	return pricingObject[type]?.[size] ?? 0;
}
