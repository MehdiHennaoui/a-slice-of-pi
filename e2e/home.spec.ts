import { test } from "@playwright/test";

import {
	appBrandTitle,
	expectSectionTitleVisible,
	monthlyRevenueTitle,
	orderByStoreTitle,
	reviewChartTitle,
	yearlyRevenueTitle,
} from "./helpers/section-titles";

test.describe("home dashboard", () => {
	test("loads the brand and main charts", async ({ page }) => {
		await page.goto("./");

		await expectSectionTitleVisible(page, appBrandTitle());
		await expectSectionTitleVisible(page, yearlyRevenueTitle());
		await expectSectionTitleVisible(page, orderByStoreTitle());
		await expectSectionTitleVisible(page, reviewChartTitle());
		await expectSectionTitleVisible(page, monthlyRevenueTitle());
	});
});
