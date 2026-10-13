import { expect, test } from "@playwright/test";

import { countReviewsBySentimentThisYear } from "../src/pages/home/model/review/review";
import { reviewText } from "../src/pages/home/ui/review-pie-chart/review-text";
import { CURRENT_YEAR } from "../src/shared/config";
import reviewDataFixture from "./fixtures/review-data.json" with { type: "json" };
import {
	expectSectionTitle,
	reviewChartTitle,
} from "./helpers/section-titles";

type ReviewData = Parameters<typeof countReviewsBySentimentThisYear>[0];
const fixtureReviews = reviewDataFixture as ReviewData;
const expectedSentiments = countReviewsBySentimentThisYear(fixtureReviews);
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

	test("ignores fixture reviews outside the current year", async ({
		page,
	}) => {
		await expectSectionTitle(page, reviewChartTitle());

		expect(
			countReviewsBySentimentThisYear(
				fixtureReviews.filter(
					(review) => !review.date.startsWith(String(CURRENT_YEAR)),
				),
			),
		).toEqual([]);

		await expect(
			page.getByText(copy.legend.angry, { exact: true }),
		).toHaveCount(0);
	});
});
