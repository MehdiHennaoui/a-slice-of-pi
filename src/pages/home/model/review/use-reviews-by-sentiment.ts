import { useMemo } from "react";

import { useDateRange } from "@/features/date-range";
import { isDateWithinRange } from "@/shared/lib/date";

import { countReviewsBySentimentThisYear, reviewData } from "./review";

export function useReviewsBySentiment() {
	const { range } = useDateRange();
	const to = range.to ?? range.from;

	return useMemo(
		() =>
			countReviewsBySentimentThisYear(
				reviewData.filter((review) =>
					isDateWithinRange(review.date, range.from, to),
				),
			),
		[range.from, to],
	);
}
