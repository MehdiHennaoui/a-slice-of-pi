import { getCurrentLocale } from "./lang";

export function displayMonthName(date: string) {
	if (!isValidDate(date)) {
		return "";
	}

	return new Intl.DateTimeFormat(getCurrentLocale(), { month: "long" }).format(
		new Date(date),
	);
}

export function getMonthNumber(date: string) {
	if (!isValidDate(date)) {
		return null;
	}

	return new Date(date).getMonth();
}

export function isValidDate(date: string) {
	const isValid = !Number.isNaN(new Date(date).getTime());

	if (!isValid) {
		console.error(`Invalid date format: "${date}"`);
	}

	return isValid;
}
