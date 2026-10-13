import { expect, test } from "@playwright/test";

import type { OrderDataType } from "../src/pages/home/model/order/order";
import { getRevenueByMonth } from "../src/pages/home/model/revenue/revenue-by-month";
import { CURRENT_YEAR } from "../src/shared/config";
import orderDataFixture from "./fixtures/order-data.json" with { type: "json" };
import {
	expectSectionTitle,
	monthlyRevenueTitle,
} from "./helpers/section-titles";

const fixtureOrders = orderDataFixture as OrderDataType[];
const expectedRevenueByMonth = getRevenueByMonth(fixtureOrders);

test.describe("monthly revenue line chart", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("./");
	});

	test("shows the heading with the expected text", async ({ page }) => {
		await expectSectionTitle(page, monthlyRevenueTitle());
	});

	test("shows fixture month labels on the chart", async ({ page }) => {
		await expectSectionTitle(page, monthlyRevenueTitle());

		for (const { month } of expectedRevenueByMonth) {
			await expect(page.getByText(month, { exact: true })).toBeVisible();
		}
	});

	test("ignores fixture orders outside the current year", async ({ page }) => {
		await expectSectionTitle(page, monthlyRevenueTitle());

		expect(
			getRevenueByMonth(
				fixtureOrders.filter(
					(order) => !order.date.startsWith(String(CURRENT_YEAR)),
				),
			),
		).toEqual([]);

		await expect(page.getByText("June", { exact: true })).toHaveCount(0);
	});
});
