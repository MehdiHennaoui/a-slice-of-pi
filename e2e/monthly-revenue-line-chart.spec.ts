import { expect, test } from "@playwright/test";

import type { OrderDataType } from "../src/pages/home/model/order/order";
import { getRevenueByMonth } from "../src/pages/home/model/revenue/revenue-by-month";
import { CURRENT_YEAR } from "../src/shared/config";
import { isDateWithinRange, yearDateRange } from "../src/shared/lib/date";
import orderDataFixture from "./fixtures/order-data.json" with { type: "json" };
import {
	expectSectionTitle,
	monthlyRevenueTitle,
} from "./helpers/section-titles";

const fixtureOrders = orderDataFixture as OrderDataType[];
const defaultRange = yearDateRange(CURRENT_YEAR);
const expectedRevenueByMonth = getRevenueByMonth(
	fixtureOrders.filter((order) =>
		isDateWithinRange(order.date, defaultRange.from, defaultRange.to),
	),
);

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

	test("hides fixture months outside the default year range", async ({
		page,
	}) => {
		await expectSectionTitle(page, monthlyRevenueTitle());

		await expect(page.getByText("June", { exact: true })).toHaveCount(0);
	});
});
