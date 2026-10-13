import { expect, test } from "@playwright/test";

import { countReviewsBySentiment } from "../src/pages/home/model/review/review";
import { reviewText } from "../src/pages/home/ui/review-pie-chart/review-text";
import { CURRENT_YEAR } from "../src/shared/config";
import { isDateWithinRange, yearDateRange } from "../src/shared/lib/date";
import reviewDataFixture from "./fixtures/review-data.json" with {
	type: "json",
};
import { expectSectionTitle, reviewChartTitle } from "./helpers/section-titles";

type ReviewData = Parameters<typeof countReviewsBySentiment>[0];
const fixtureReviews = reviewDataFixture as ReviewData;
const defaultRange = yearDateRange(CURRENT_YEAR);
const expectedSentiments = countReviewsBySentiment(
	fixtureReviews.filter((review) =>
		isDateWithinRange(review.date, defaultRange.from, defaultRange.to),
	),
);
const copy = reviewText["review-chart"];

test.describe("review pie chart", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("./");
	});

	test("shows the heading with the expected text", async ({ page }) => {
		await expectSectionTitle(page, reviewChartTitle());
	});

	test("shows legend labels for each fixture sentiment", async ({ page }) => {
		await expectSectionTitle(page, reviewChartTitle());

		for (const { sentiment } of expectedSentiments) {
			await expect(
				page.getByText(copy.legend[sentiment], { exact: true }),
			).toBeVisible();
		}
	});

	test("hides fixture sentiments outside the default year range", async ({
		page,
	}) => {
		await expectSectionTitle(page, reviewChartTitle());

		await expect(
			page.getByText(copy.legend.angry, { exact: true }),
		).toHaveCount(0);
	});
});
