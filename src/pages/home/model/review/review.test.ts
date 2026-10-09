import { describe, expect, it, vi } from "vitest";

vi.mock("@/shared/config", () => ({
	CURRENT_YEAR: 2024,
}));

import { countReviewsBySentimentThisYear } from "./review";

const fakeReviews = [
	{
		review_id: 1,
		sentiment: "happy",
		store: "Kanata",
		date: "2024-03-12",
		message: "Great pizza",
	},
	{
		review_id: 2,
		sentiment: "happy",
		store: "Orleans",
		date: "2024-07-01",
		message: "Loved it",
	},
	{
		review_id: 3,
		sentiment: "angry",
		store: "Downtown",
		date: "2024-11-20",
		message: "Cold slice",
	},
	{
		review_id: 4,
		sentiment: "sad",
		store: "The Glebe",
		date: "2023-05-10",
		message: "Too salty",
	},
	{
		review_id: 5,
		sentiment: "delighted",
		store: "Sandy Hill",
		date: "2022-01-01",
		message: "Perfect",
	},
] as Parameters<typeof countReviewsBySentimentThisYear>[0];

describe("countReviewsBySentimentThisYear", () => {
	it("counts only reviews from the mocked current year, grouped by sentiment", () => {
		const result = countReviewsBySentimentThisYear(fakeReviews);

		expect(result).toHaveLength(2);
		expect(result).toEqual([
			{ sentiment: "happy", count: 2, fill: "var(--color-happy)" },
			{ sentiment: "angry", count: 1, fill: "var(--color-angry)" },
		]);
	});

	it("returns an empty array when no review matches the current year", () => {
		const olderReviews = fakeReviews.filter(
			(review) => !review.date.startsWith("2024"),
		);

		expect(countReviewsBySentimentThisYear(olderReviews)).toEqual([]);
	});

	it("returns an empty array for an empty input", () => {
		expect(countReviewsBySentimentThisYear([])).toEqual([]);
	});
});
