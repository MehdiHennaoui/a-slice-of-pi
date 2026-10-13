import { expect, type Page, test } from "@playwright/test";

import { choosePeriodText } from "../src/pages/home/ui/choose-period/choose-period-text";
import { monthlyRevenueText } from "../src/pages/home/ui/monthly-revenue-text";
import { orderByStoreText } from "../src/pages/home/ui/order-by-store-bar-chart/order-by-store-text";
import { reviewText } from "../src/pages/home/ui/review-pie-chart/review-text";
import { dateRangePickerText } from "../src/shared/components/ui/date-range-picker-text";
import { CURRENT_YEAR } from "../src/shared/config";
import { yearDateRange } from "../src/shared/lib/date";
import {
	choosePeriodTitle,
	expectSectionTitle,
	monthlyRevenueTitle,
	orderByStoreTitle,
	periodLabel,
	reviewChartTitle,
} from "./helpers/section-titles";

const copy = choosePeriodText["choose-period"];
const pickerCopy = dateRangePickerText["date-range-picker"];
const defaultRange = yearDateRange(CURRENT_YEAR);
const defaultLabel = periodLabel(defaultRange.from, defaultRange.to);
const selectedFrom = new Date(CURRENT_YEAR, 0, 15);
const selectedTo = new Date(CURRENT_YEAR, 0, 22);
const selectedLabel = periodLabel(selectedFrom, selectedTo);

test.describe("choose period", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("./");
	});

	test("shows the default period with reset disabled", async ({ page }) => {
		await expectSectionTitle(page, choosePeriodTitle());

		await expect(periodTrigger(page, defaultLabel)).toBeVisible();
		await expect(
			page.getByRole("button", { name: copy.reset }),
		).toBeDisabled();

		await expectSectionTitle(page, orderByStoreTitle());
		await expectSectionTitle(page, reviewChartTitle());
		await expectSectionTitle(page, monthlyRevenueTitle());
	});

	test("updates the label and chart titles when a range is selected", async ({
		page,
	}) => {
		await selectPeriod(page, selectedFrom, selectedTo);

		await expect(periodTrigger(page, selectedLabel)).toBeVisible();
		await expect(page.getByRole("button", { name: copy.reset })).toBeEnabled();

		await expectSectionTitle(
			page,
			`${orderByStoreText["order-by-store-chart"].title} ${selectedLabel}`,
		);
		await expectSectionTitle(
			page,
			`${reviewText["review-chart"].title} ${selectedLabel} ${reviewText["review-chart"].titleSuffix}`,
		);
		await expectSectionTitle(
			page,
			`${monthlyRevenueText["monthly-revenue-chart"].title} ${selectedLabel}`,
		);
	});

	test("resets to the default year period", async ({ page }) => {
		const resetButton = page.getByRole("button", { name: copy.reset });

		await selectPeriod(page, selectedFrom, selectedTo);
		await expect(resetButton).toBeEnabled();

		await resetButton.click();

		await expect(periodTrigger(page, defaultLabel)).toBeVisible();
		await expect(resetButton).toBeDisabled();
		await expectSectionTitle(page, orderByStoreTitle());
		await expectSectionTitle(page, reviewChartTitle());
		await expectSectionTitle(page, monthlyRevenueTitle());
	});
});

function periodTrigger(page: Page, label: string) {
	return page.getByRole("button", { name: label });
}

async function selectPeriod(page: Page, from: Date, to: Date) {
	await periodTrigger(page, defaultLabel).click();
	await clickDay(page, from);
	await clickDay(page, to);
	await page.getByRole("button", { name: pickerCopy.close }).click();
}

async function clickDay(page: Page, date: Date) {
	const isoDate = [
		date.getFullYear(),
		String(date.getMonth() + 1).padStart(2, "0"),
		String(date.getDate()).padStart(2, "0"),
	].join("-");

	await page
		.locator(`[role="gridcell"][data-day="${isoDate}"]`)
		.getByRole("button")
		.click();
}
