import { useMemo } from "react";

import { isDateWithinRange } from "@/shared/lib/date";

import { useChoosePeriod } from "../choose-period/use-choose-period";
import { countReviewsBySentiment, reviewData } from "./review";

export function useReviewsBySentiment() {
	const { range } = useChoosePeriod();
	const to = range.to ?? range.from;

	return useMemo(
		() =>
			countReviewsBySentiment(
				reviewData.filter((review) =>
					isDateWithinRange(review.date, range.from, to),
				),
			),
		[range.from, to],
	);
}
