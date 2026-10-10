import { describe, expect, it, vi } from "vitest";

vi.mock("@/shared/config", () => ({
	CURRENT_YEAR: 2024,
	DEFAULT_LOCALE: "en-CA",
}));

import { getRevenueByMonth } from "./revenue-by-month";

const fakeOrders = [
	{
		order_id: 1,
		store: "Kanata",
		items: [{ type: "Cheese", size: "S" }],
		date: "2024-03-15",
	},
	{
		order_id: 2,
		store: "Orleans",
		items: [
			{ type: "Pepperoni", size: "M" },
			{ type: "Deluxe", size: "L" },
		],
		date: "2024-07-15",
	},
	{
		order_id: 3,
		store: "Downtown",
		items: [],
		date: "2024-11-15",
	},
	{
		order_id: 4,
		store: "The Glebe",
		items: [{ type: "Hawaiian", size: "S" }],
		date: "2023-05-15",
	},
	{
		order_id: 5,
		store: "Sandy Hill",
		items: [{ type: "Meatlovers", size: "M" }],
		date: "2024-03-20",
	},
	{
		order_id: 6,
		store: "Kanata",
		items: [{ type: "Cheese", size: "M" }],
		date: "2024-01-15",
	},
] as Parameters<typeof getRevenueByMonth>[0];

describe("getRevenueByMonth", () => {
	it("groups pizza totals by month for the current year", () => {
		expect(getRevenueByMonth(fakeOrders)).toEqual([
			{ month: "January", total: 12 }, // Cheese M
			{ month: "March", total: 24 }, // Cheese S (8) + Meatlovers M (16)
			{ month: "July", total: 34 }, // Pepperoni M (14) + Deluxe L (20)
			{ month: "November", total: 0 }, // empty items
		]);
	});

	it("sums multiple orders in the same month", () => {
		const sameMonthOrders = [
			{
				order_id: 1,
				store: "Kanata",
				items: [{ type: "Cheese", size: "S" }],
				date: "2024-06-10",
			},
			{
				order_id: 2,
				store: "Orleans",
				items: [{ type: "Pepperoni", size: "M" }],
				date: "2024-06-25",
			},
		] as Parameters<typeof getRevenueByMonth>[0];

		expect(getRevenueByMonth(sameMonthOrders)).toEqual([
			{ month: "June", total: 22 },
		]);
	});

	it("ignores orders outside the current year", () => {
		const olderOrders = fakeOrders.filter(
			(order) => !order.date.startsWith("2024"),
		);

		expect(getRevenueByMonth(olderOrders)).toEqual([]);
	});

	it("returns an empty array for an empty input", () => {
		expect(getRevenueByMonth([])).toEqual([]);
	});
});
