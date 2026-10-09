import { describe, expect, it, vi } from "vitest";

vi.mock("@/shared/config", () => ({
	CURRENT_YEAR: 2024,
}));

import { getTotalMoneyForOneYear } from "./yearly-revenue";

const fakeOrders = [
	{
		order_id: 1,
		store: "Kanata",
		items: [{ type: "Cheese", size: "S" }],
		date: "2024-03-12",
	},
	{
		order_id: 2,
		store: "Orleans",
		items: [
			{ type: "Pepperoni", size: "M" },
			{ type: "Deluxe", size: "L" },
		],
		date: "2024-07-01",
	},
	{
		order_id: 3,
		store: "Downtown",
		items: [],
		date: "2024-11-20",
	},
	{
		order_id: 4,
		store: "The Glebe",
		items: [{ type: "Hawaiian", size: "S" }],
		date: "2023-05-10",
	},
	{
		order_id: 5,
		store: "Sandy Hill",
		items: [{ type: "Meatlovers", size: "M" }],
		date: "2024-06-15",
	},
] as Parameters<typeof getTotalMoneyForOneYear>[0];

describe("getTotalMoneyForOneYear", () => {
	it("sums pizza prices only for orders in the selected year", () => {
		// Cheese S (8) + Pepperoni M (14) + Deluxe L (20) + Meatlovers M (16)
		expect(getTotalMoneyForOneYear(fakeOrders)).toBe(58);
	});

	it("ignores orders with no items", () => {
		const ordersWithEmptyItems = [
			{
				order_id: 1,
				store: "Kanata",
				items: [],
				date: "2024-03-12",
			},
		] as Parameters<typeof getTotalMoneyForOneYear>[0];

		expect(getTotalMoneyForOneYear(ordersWithEmptyItems)).toBe(0);
	});

	it("returns 0 when no order matches the selected year", () => {
		const olderOrders = fakeOrders.filter(
			(order) => !order.date.startsWith("2024"),
		);

		expect(getTotalMoneyForOneYear(olderOrders)).toBe(0);
	});

	it("uses the yearSelected argument when provided", () => {
		// Hawaiian S = 10
		expect(getTotalMoneyForOneYear(fakeOrders, 2023)).toBe(10);
	});

	it("returns 0 for an empty input", () => {
		expect(getTotalMoneyForOneYear([])).toBe(0);
	});
});
