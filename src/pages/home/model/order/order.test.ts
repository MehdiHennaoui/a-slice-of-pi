import { describe, expect, it } from "vitest";

import { countOrdersByStore, filterOrdersByPizzaTypeOrSize } from "./order";

const fakeOrders = [
	{
		order_id: 1,
		store: "Kanata",
		items: [{ type: "Cheese", size: "S" }],
		date: "2023-01-05",
	},
	{
		order_id: 2,
		store: "Orleans",
		items: [{ type: "Deluxe", size: "L" }],
		date: "2023-02-14",
	},
	{
		order_id: 3,
		store: "Kanata",
		items: [{ type: "Pepperoni", size: "M" }],
		date: "2023-03-01",
	},
	{
		order_id: 4,
		store: "Downtown",
		items: [{ type: "Hawaiian", size: "S" }],
		date: "2023-04-10",
	},
	{
		order_id: 5,
		store: "Sandy Hill",
		items: [{ type: "Meatlovers", size: "L" }],
		date: "2023-05-20",
	},
] as Parameters<typeof countOrdersByStore>[0];

describe("countOrdersByStore", () => {
	it("counts orders grouped by store and sets chart fill tokens", () => {
		const result = countOrdersByStore(fakeOrders);

		expect(result).toHaveLength(4);
		expect(result).toEqual([
			{
				store: "kanata",
				order_count: 2,
				fill: "var(--color-kanata)",
			},
			{
				store: "orleans",
				order_count: 1,
				fill: "var(--color-orleans)",
			},
			{
				store: "downtown",
				order_count: 1,
				fill: "var(--color-downtown)",
			},
			{
				store: "sandy-hill",
				order_count: 1,
				fill: "var(--color-sandy-hill)",
			},
		]);
	});

	it("returns an empty array for an empty input", () => {
		expect(countOrdersByStore([])).toEqual([]);
	});
});

const filterOrders = [
	{
		order_id: 1,
		store: "Kanata",
		items: [
			{ type: "Cheese", size: "S" },
			{ type: "Pepperoni", size: "L" },
		],
		date: "2023-01-05",
	},
	{
		order_id: 2,
		store: "Orleans",
		items: [{ type: "Deluxe", size: "L" }],
		date: "2023-02-14",
	},
	{
		order_id: 3,
		store: "Downtown",
		items: [{ type: "Cheese", size: "M" }],
		date: "2023-03-01",
	},
] as Parameters<typeof filterOrdersByPizzaTypeOrSize>[0];

describe("filterOrdersByPizzaTypeOrSize", () => {
	it("returns every order when type and size are all", () => {
		expect(filterOrdersByPizzaTypeOrSize(filterOrders, "all", "all")).toEqual(
			filterOrders,
		);
	});

	it("keeps orders that contain the selected size", () => {
		const result = filterOrdersByPizzaTypeOrSize(filterOrders, "all", "L");

		expect(result.map((order) => order.order_id)).toEqual([1, 2]);
	});

	it("keeps orders that contain the selected type", () => {
		const result = filterOrdersByPizzaTypeOrSize(filterOrders, "Cheese", "all");

		expect(result.map((order) => order.order_id)).toEqual([1, 3]);
	});

	it("keeps an order only when one item matches both type and size", () => {
		const matching = filterOrdersByPizzaTypeOrSize(
			filterOrders,
			"Cheese",
			"S",
		);
		const splitAcrossItems = filterOrdersByPizzaTypeOrSize(
			filterOrders,
			"Pepperoni",
			"S",
		);

		expect(matching.map((order) => order.order_id)).toEqual([1]);
		expect(splitAcrossItems).toEqual([]);
	});

	it("returns an empty array for an empty input", () => {
		expect(filterOrdersByPizzaTypeOrSize([], "Cheese", "S")).toEqual([]);
	});
});
