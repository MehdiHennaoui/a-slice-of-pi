import { expect, type Page, test } from "@playwright/test";

import {
	countOrdersByStore,
	filterOrdersByPizzaTypeOrSize,
	type OrderDataType,
} from "../src/pages/home/model/order/order";
import { getRevenueByMonth } from "../src/pages/home/model/revenue/revenue-by-month";
import { countReviewsBySentiment } from "../src/pages/home/model/review/review";
import { choosePeriodText } from "../src/pages/home/ui/choose-period/choose-period-text";
import { monthlyRevenueText } from "../src/pages/home/ui/monthly-revenue-text";
import { orderByStoreText } from "../src/pages/home/ui/order-by-store-bar-chart/order-by-store-text";
import { reviewText } from "../src/pages/home/ui/review-pie-chart/review-text";
import { dataGuardText } from "../src/shared/components/ui/data-guard/data-guard-text";
import { dateRangePickerText } from "../src/shared/components/ui/date-range-picker-text";
import { CURRENT_YEAR } from "../src/shared/config";
import { isDateWithinRange, yearDateRange } from "../src/shared/lib/date";
import orderDataFixture from "./fixtures/order-data.json" with { type: "json" };
import reviewDataFixture from "./fixtures/review-data.json" with {
	type: "json",
};
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
const dataGuardCopy = dataGuardText["data-guard"];
const orderCopy = orderByStoreText["order-by-store-chart"];
const reviewCopy = reviewText["review-chart"];
const STORE_LABELS = Object.values(orderCopy.stores);

type ReviewData = Parameters<typeof countReviewsBySentiment>[0];
const fixtureOrders = orderDataFixture as OrderDataType[];
const fixtureReviews = reviewDataFixture as ReviewData;

const defaultRange = yearDateRange(CURRENT_YEAR);
const defaultLabel = periodLabel(defaultRange.from, defaultRange.to);

const populatedFrom = new Date(CURRENT_YEAR, 0, 15);
const populatedTo = new Date(CURRENT_YEAR, 0, 22);
const populatedLabel = periodLabel(populatedFrom, populatedTo);

/** One fixture order + one fixture review (2023-01-15). */
const easyFrom = new Date(CURRENT_YEAR, 0, 15);
const easyTo = new Date(CURRENT_YEAR, 0, 16);
const easyLabel = periodLabel(easyFrom, easyTo);

const emptyFrom = new Date(CURRENT_YEAR, 0, 1);
const emptyTo = new Date(CURRENT_YEAR, 0, 10);
const emptyLabel = periodLabel(emptyFrom, emptyTo);

test.describe("choose period", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("./");
	});

	test("shows the default period with reset disabled", async ({ page }) => {
		await expectSectionTitle(page, choosePeriodTitle());

		await expect(periodTrigger(page, defaultLabel)).toBeVisible();
		await expect(page.getByRole("button", { name: copy.reset })).toBeDisabled();

		await expectSectionTitle(page, orderByStoreTitle());
		await expectSectionTitle(page, reviewChartTitle());
		await expectSectionTitle(page, monthlyRevenueTitle());
	});

	test("updates chart titles and values for the selected period", async ({
		page,
	}) => {
		const expectedStores = expectedOrderStores(populatedFrom, populatedTo);
		const expectedSentiments = expectedReviewSentiments(
			populatedFrom,
			populatedTo,
		);
		const expectedMonths = expectedRevenueMonths(populatedFrom, populatedTo);

		await selectPeriod(page, populatedFrom, populatedTo);

		await expect(periodTrigger(page, populatedLabel)).toBeVisible();
		await expect(page.getByRole("button", { name: copy.reset })).toBeEnabled();

		await expectSectionTitle(page, `${orderCopy.title} ${populatedLabel}`);
		await expectSectionTitle(
			page,
			`${reviewCopy.title} ${populatedLabel} ${reviewCopy.titleSuffix}`,
		);
		await expectSectionTitle(
			page,
			`${monthlyRevenueText["monthly-revenue-chart"].title} ${populatedLabel}`,
		);

		await expect(page.getByText(dataGuardCopy.empty)).toHaveCount(0);
		await expect(page.getByText(dataGuardCopy.loading)).toHaveCount(0);

		await expect(page.locator(".recharts-bar-rectangle")).toHaveCount(
			expectedStores.length,
		);
		for (const label of STORE_LABELS) {
			const tick = page.getByText(label, { exact: true });
			if (expectedStores.includes(label)) {
				await expect(tick).toBeVisible();
			} else {
				await expect(tick).toHaveCount(0);
			}
		}

		for (const { sentiment } of expectedSentiments) {
			await expect(
				page.getByText(reviewCopy.legend[sentiment], { exact: true }),
			).toBeVisible();
		}
		for (const sentiment of Object.keys(
			reviewCopy.legend,
		) as (keyof typeof reviewCopy.legend)[]) {
			if (expectedSentiments.some((entry) => entry.sentiment === sentiment)) {
				continue;
			}
			await expect(
				page.getByText(reviewCopy.legend[sentiment], { exact: true }),
			).toHaveCount(0);
		}

		for (const { month } of expectedMonths) {
			await expect(page.getByText(month, { exact: true })).toBeVisible();
		}
		await expect(page.getByText("February", { exact: true })).toHaveCount(0);
		await expect(page.getByText("May", { exact: true })).toHaveCount(0);
	});

	test("shows the correct chart values for an easy single-order range", async ({
		page,
	}) => {
		const expectedOrders = countOrdersByStore(
			filterOrdersByPizzaTypeOrSize(
				ordersInRange(easyFrom, easyTo),
				"all",
				"all",
			),
		);
		const expectedReviews = expectedReviewSentiments(easyFrom, easyTo);
		const expectedMonths = expectedRevenueMonths(easyFrom, easyTo);

		expect(expectedOrders).toEqual([
			expect.objectContaining({ store: "kanata", order_count: 1 }),
		]);
		expect(expectedReviews).toEqual([
			expect.objectContaining({ sentiment: "delighted", count: 1 }),
		]);
		expect(expectedMonths).toEqual([{ month: "January", total: 8 }]);

		await selectPeriod(page, easyFrom, easyTo);

		const orderSection = chartSection(page, `${orderCopy.title} ${easyLabel}`);
		const reviewSection = chartSection(
			page,
			`${reviewCopy.title} ${easyLabel} ${reviewCopy.titleSuffix}`,
		);
		const revenueSection = chartSection(
			page,
			`${monthlyRevenueText["monthly-revenue-chart"].title} ${easyLabel}`,
		);

		const [order] = expectedOrders;
		const [review] = expectedReviews;
		const [month] = expectedMonths;

		await expect(reviewSection.locator(".recharts-pie-sector")).toHaveCount(1);
		await expect(
			reviewSection.getByText(reviewCopy.legend.delighted, { exact: true }),
		).toBeVisible();
		await reviewSection.locator(".recharts-sector").hover({ force: true });
		await expect(
			reviewSection
				.locator(".recharts-tooltip-wrapper")
				.filter({ hasText: reviewCopy.legend.delighted }),
		).toContainText(String(review.count));

		await expect(orderSection.locator(".recharts-bar-rectangle")).toHaveCount(
			1,
		);
		await expect(
			orderSection.getByText(orderCopy.stores.kanata, { exact: true }),
		).toBeVisible();
		await orderSection
			.locator(".recharts-bar-rectangle")
			.hover({ force: true });
		await expect(
			orderSection
				.locator(".recharts-tooltip-wrapper")
				.filter({ hasText: orderCopy.stores.kanata }),
		).toContainText(String(order.order_count));

		await expect(
			revenueSection.getByText(month.month, { exact: true }),
		).toBeVisible();
		await expect(
			revenueSection.getByText(`${month.total} $`, { exact: true }),
		).toBeVisible();
	});

	test("shows the empty period message when charts have no data", async ({
		page,
	}) => {
		await selectPeriod(page, emptyFrom, emptyTo);

		await expect(periodTrigger(page, emptyLabel)).toBeVisible();
		await expectSectionTitle(page, `${orderCopy.title} ${emptyLabel}`);
		await expectSectionTitle(
			page,
			`${reviewCopy.title} ${emptyLabel} ${reviewCopy.titleSuffix}`,
		);
		await expectSectionTitle(
			page,
			`${monthlyRevenueText["monthly-revenue-chart"].title} ${emptyLabel}`,
		);

		await expect(page.locator(".recharts-bar-rectangle")).toHaveCount(0);
		await expect(page.locator(".recharts-pie-sector")).toHaveCount(0);
		await expect(page.locator(".recharts-line")).toHaveCount(0);

		await expect(page.getByText(dataGuardCopy.loading)).toHaveCount(0);
		await expect(page.getByText(dataGuardCopy.empty)).toHaveCount(3);
	});

	test("resets to the default year period", async ({ page }) => {
		const resetButton = page.getByRole("button", { name: copy.reset });

		await selectPeriod(page, populatedFrom, populatedTo);
		await expect(resetButton).toBeEnabled();

		await resetButton.click();

		await expect(periodTrigger(page, defaultLabel)).toBeVisible();
		await expect(resetButton).toBeDisabled();
		await expectSectionTitle(page, orderByStoreTitle());
		await expectSectionTitle(page, reviewChartTitle());
		await expectSectionTitle(page, monthlyRevenueTitle());
		await expect(page.getByText(dataGuardCopy.empty)).toHaveCount(0);
	});
});

function ordersInRange(from: Date, to: Date) {
	return fixtureOrders.filter((order) =>
		isDateWithinRange(order.date, from, to),
	);
}

function expectedOrderStores(from: Date, to: Date) {
	return countOrdersByStore(
		filterOrdersByPizzaTypeOrSize(ordersInRange(from, to), "all", "all"),
	).map(
		(entry) =>
			orderCopy.stores[entry.store as keyof typeof orderCopy.stores] ??
			entry.store,
	);
}

function expectedReviewSentiments(from: Date, to: Date) {
	return countReviewsBySentiment(
		fixtureReviews.filter((review) => isDateWithinRange(review.date, from, to)),
	);
}

function expectedRevenueMonths(from: Date, to: Date) {
	return getRevenueByMonth(ordersInRange(from, to));
}

function periodTrigger(page: Page, label: string) {
	return page.getByRole("button", { name: label });
}

function chartSection(page: Page, title: string) {
	return page.locator("section").filter({
		has: page.getByRole("heading", { name: title }),
	});
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
