import { isCurrentYear } from "@/shared/lib/is-current-year";
import rawReviewData from "./review_data.json";

type StoreType = "Kanata" | "Orleans" | "Downtown" | "Sandy Hill" | "The Glebe";
type ReviewData = {
	review_id: number;
	sentiment: "delighted" | "happy" | "sad" | "angry";
	store: StoreType;
	date: string;
	message: string;
};
type ObjectSentimentCount = Record<
	ReviewData["sentiment"],
	{
		count: number;
		fill: string;
		sentiment: ReviewData["sentiment"];
	}
>;

const reviewData = rawReviewData as ReviewData[];

export const reviewsBySentimentThisYear =
	countReviewsBySentimentThisYear(reviewData);

export function countReviewsBySentimentThisYear(reviewData: ReviewData[]) {
	return Object.values(
		reviewData.reduce(
			accumulateCurrentYearSentimentCount,
			{} as ObjectSentimentCount,
		),
	);
}

function accumulateCurrentYearSentimentCount(
	acc: ObjectSentimentCount,
	review: ReviewData,
): ObjectSentimentCount {
	if (isReviewNotInCurrentYear(review)) {
		return acc;
	}

	acc[review.sentiment] = {
		count: (acc[review.sentiment]?.count || 0) + 1,
		fill: `var(--color-${review.sentiment})`,
		sentiment: review.sentiment,
	};
	return acc;
}

function isReviewNotInCurrentYear(review: ReviewData) {
	return !isCurrentYear(review.date);
}
