import { expect, test } from "@playwright/test";

import { countReviewsBySentimentThisYear } from "../src/pages/home/model/review/review";
import { chartConfig } from "../src/pages/home/ui/review-pie-chart/chart-config";
import { CURRENT_YEAR } from "../src/shared/config";
import reviewDataFixture from "./fixtures/review-data.json" with { type: "json" };

type ReviewData = Parameters<typeof countReviewsBySentimentThisYear>[0];
const fixtureReviews = reviewDataFixture as ReviewData;
const expectedSentiments = countReviewsBySentimentThisYear(fixtureReviews);
const reviewHeading = `Reviews ${CURRENT_YEAR} by sentiment`;

test.describe("review pie chart", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("./");
	});

	test("shows the heading with the expected text", async ({ page }) => {
		await expect(
			page.getByRole("heading", { name: reviewHeading }),
		).toHaveText(reviewHeading);
	});

	test("shows legend labels for each fixture sentiment", async ({ page }) => {
		await expect(
			page.getByRole("heading", { name: reviewHeading }),
		).toHaveText(reviewHeading);

		for (const { sentiment } of expectedSentiments) {
			await expect(
				page.getByText(chartConfig[sentiment].label, { exact: true }),
			).toBeVisible();
		}
	});

	test("ignores fixture reviews outside the current year", async ({
		page,
	}) => {
		await expect(
			page.getByRole("heading", { name: reviewHeading }),
		).toHaveText(reviewHeading);

		expect(
			countReviewsBySentimentThisYear(
				fixtureReviews.filter(
					(review) => !review.date.startsWith(String(CURRENT_YEAR)),
				),
			),
		).toEqual([]);

		await expect(
			page.getByText(chartConfig.angry.label, { exact: true }),
		).toHaveCount(0);
	});
});
