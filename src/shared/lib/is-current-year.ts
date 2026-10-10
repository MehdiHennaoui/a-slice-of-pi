import { CURRENT_YEAR } from "@/shared/config";
import { isValidDate } from "./date";

export function isCurrentYear(date: string, selectedYear = CURRENT_YEAR) {
	const parsedDate = new Date(date);

	if (!isValidDate(date)) {
		console.error(`Invalid date format: "${date}"`);
		return false;
	}

	return parsedDate.getFullYear() === selectedYear;
}
