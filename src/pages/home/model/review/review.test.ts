import { describe, expect, it } from "vitest";

import { countReviewsBySentiment } from "./review";

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
] as Parameters<typeof countReviewsBySentiment>[0];

describe("countReviewsBySentiment", () => {
	it("counts all reviews grouped by sentiment", () => {
		const result = countReviewsBySentiment(fakeReviews);

		expect(result).toEqual([
			{ sentiment: "happy", count: 2, fill: "var(--color-happy)" },
			{ sentiment: "angry", count: 1, fill: "var(--color-angry)" },
			{ sentiment: "sad", count: 1, fill: "var(--color-sad)" },
			{ sentiment: "delighted", count: 1, fill: "var(--color-delighted)" },
		]);
	});

	it("returns an empty array for an empty input", () => {
		expect(countReviewsBySentiment([])).toEqual([]);
	});
});
