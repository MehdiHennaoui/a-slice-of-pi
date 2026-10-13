import rawReviewData from "./review-data.json" with { type: "json" };

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

export const reviewData = rawReviewData as ReviewData[];

export function countReviewsBySentiment(reviewData: ReviewData[]) {
	return Object.values(
		reviewData.reduce(accumulateSentimentCount, {} as ObjectSentimentCount),
	);
}

function accumulateSentimentCount(
	acc: ObjectSentimentCount,
	review: ReviewData,
): ObjectSentimentCount {
	acc[review.sentiment] = {
		count: (acc[review.sentiment]?.count || 0) + 1,
		fill: `var(--color-${review.sentiment})`,
		sentiment: review.sentiment,
	};
	return acc;
}
