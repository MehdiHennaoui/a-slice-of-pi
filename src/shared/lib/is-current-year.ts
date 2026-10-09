import { CURRENT_YEAR } from "@/shared/config";

export function isCurrentYear(date: string, selectedYear = CURRENT_YEAR) {
	const parsedDate = new Date(date);

	if (!isValidDate(date)) {
		console.error(`Invalid date format: "${date}"`);
		return false;
	}

	return parsedDate.getFullYear() === selectedYear;
}

function isValidDate(date: string) {
	return !Number.isNaN(new Date(date).getTime());
}
