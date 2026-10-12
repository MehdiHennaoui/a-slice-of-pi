import { expect, type Locator, type Page, test } from "@playwright/test";

import type { OrderDataType } from "../src/pages/home/model/order/order";
import { getRevenueByMonth } from "../src/pages/home/model/revenue/revenue-by-month";
import { CURRENT_YEAR } from "../src/shared/config";
import orderDataFixture from "./fixtures/order-data.json" with { type: "json" };

const fixtureOrders = orderDataFixture as OrderDataType[];
const expectedRevenueByMonth = getRevenueByMonth(fixtureOrders);

test.describe("monthly revenue line chart", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("./");
	});

	test("shows the title and chart for the fixture months", async ({
		page,
	}) => {
		const section = monthlyRevenueSection(page);

		await expect(
			section.getByRole("heading", {
				name: `Monthly Revenue for ${CURRENT_YEAR}`,
			}),
		).toBeVisible();

		await expectChartState(section);
	});

	test("formats revenue values with a dollar suffix on the y-axis", async ({
		page,
	}) => {
		const section = monthlyRevenueSection(page);
		const chart = section.locator("svg.recharts-surface");

		await expect(chart).toBeVisible();

		const yAxisTicks = section.locator(
			".recharts-yAxis-tick-labels .recharts-cartesian-axis-tick-value",
		);
		await expect(yAxisTicks.first()).toBeVisible();

		const tickTexts = await yAxisTicks.allTextContents();
		expect(tickTexts.length).toBeGreaterThan(0);
		expect(tickTexts.every((tick) => tick.trim().endsWith("$"))).toBe(true);
	});

	test("ignores fixture orders outside the current year", async ({ page }) => {
		const section = monthlyRevenueSection(page);
		const outOfYearMonths = getRevenueByMonth(
			fixtureOrders.filter((order) => !order.date.startsWith(String(CURRENT_YEAR))),
		);

		expect(outOfYearMonths).toEqual([]);
		await expect(section.getByText("June", { exact: true })).toHaveCount(0);
		await expectChartState(section);
	});
});

function monthlyRevenueSection(page: Page) {
	return page
		.getByRole("heading", {
			name: `Monthly Revenue for ${CURRENT_YEAR}`,
		})
		.locator("xpath=ancestor::section[1]");
}

async function expectChartState(section: Locator) {
	const chart = section.locator("svg.recharts-surface");
	await expect(chart).toBeVisible();

	await expect(section.locator(".recharts-line-dots .recharts-dot")).toHaveCount(
		expectedRevenueByMonth.length,
	);

	for (const { month } of expectedRevenueByMonth) {
		await expect(section.getByText(month, { exact: true })).toBeVisible();
	}
}
