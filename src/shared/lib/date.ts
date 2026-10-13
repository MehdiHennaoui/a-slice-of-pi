import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

import { getCurrentLocale } from "./lang";

dayjs.extend(isBetween);

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
	const isValid = dayjs(date).isValid();

	if (!isValid) {
		console.error(`Invalid date format: "${date}"`);
	}

	return isValid;
}

export function yearDateRange(year: number) {
	return {
		from: new Date(year, 0, 1),
		to: new Date(year, 11, 31),
	};
}

export function isDateWithinRange(date: string, from: Date, to: Date) {
	if (!isValidDate(date)) {
		return false;
	}

	const start = dayjs(from);
	const end = dayjs(to);
	const [min, max] = start.isAfter(end, "day") ? [end, start] : [start, end];

	return dayjs(date).isBetween(min, max, "day", "[]");
}

export function formatDateRange(from: Date, to: Date) {
	const a = dayjs(from);
	const b = dayjs(to);
	const [min, max] = a.isAfter(b, "day") ? [b, a] : [a, b];
	const formatter = new Intl.DateTimeFormat(getCurrentLocale(), {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	if (min.isSame(max, "day")) {
		return formatter.format(min.toDate());
	}

	return formatter.formatRange(min.toDate(), max.toDate());
}
