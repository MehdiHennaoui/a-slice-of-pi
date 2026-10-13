import { describe, expect, it } from "vitest";

import { formatDateRange, isDateWithinRange, yearDateRange } from "./date";

describe("isDateWithinRange", () => {
	const from = new Date(2023, 0, 10);
	const to = new Date(2023, 0, 20);

	it("includes both bounds", () => {
		expect(isDateWithinRange("2023-01-10", from, to)).toBe(true);
		expect(isDateWithinRange("2023-01-20", from, to)).toBe(true);
	});

	it("excludes days outside the range", () => {
		expect(isDateWithinRange("2023-01-09", from, to)).toBe(false);
		expect(isDateWithinRange("2023-01-21", from, to)).toBe(false);
	});

	it("compares the calendar day, not the UTC instant of a date-only string", () => {
		const day = new Date(2023, 0, 1);

		expect(isDateWithinRange("2023-01-01", day, day)).toBe(true);
	});
});

describe("formatDateRange", () => {
	it("formats a single day when both ends are the same calendar day", () => {
		expect(formatDateRange(new Date(2023, 2, 5), new Date(2023, 2, 5))).toBe(
			"Mar 5, 2023",
		);
	});

	it("formats the full year used as the default period", () => {
		const { from, to } = yearDateRange(2023);

		expect(formatDateRange(from, to)).toBe("Jan 1–Dec 31, 2023");
	});
});
