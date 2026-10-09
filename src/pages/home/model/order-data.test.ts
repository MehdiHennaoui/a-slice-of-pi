import { describe, expect, it } from "vitest";

import { countOrdersByStore } from "./order-data";

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
		items: [{ type: "Margherita", size: "L" }],
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
