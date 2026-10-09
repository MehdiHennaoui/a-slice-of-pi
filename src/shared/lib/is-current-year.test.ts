import { describe, expect, it, vi } from "vitest";

vi.mock("@/shared/config", () => ({
	CURRENT_YEAR: 2024,
}));

import { isCurrentYear } from "./is-current-year";

describe("isCurrentYear", () => {
	it("returns true when the date year matches the mocked current year", () => {
		expect(isCurrentYear("2024-06-15")).toBe(true);
	});

	it("returns false when the date year differs from the mocked current year", () => {
		expect(isCurrentYear("2023-01-01")).toBe(false);
	});

	it("uses selectedYear when provided instead of CURRENT_YEAR", () => {
		expect(isCurrentYear("2023-06-15", 2023)).toBe(true);
		expect(isCurrentYear("2024-06-15", 2023)).toBe(false);
	});

	it("returns false and logs an error when the value is not a valid date", () => {
		const consoleError = vi
			.spyOn(console, "error")
			.mockImplementation(() => {});

		expect(isCurrentYear("not-a-date")).toBe(false);
		expect(isCurrentYear("hello")).toBe(false);
		expect(isCurrentYear("")).toBe(false);
		expect(isCurrentYear("15-06-2024")).toBe(false);

		expect(consoleError).toHaveBeenCalledTimes(4);
		expect(consoleError).toHaveBeenCalledWith(
			'Invalid date format: "not-a-date"',
		);
		expect(consoleError).toHaveBeenCalledWith(
			'Invalid date format: "15-06-2024"',
		);

		consoleError.mockRestore();
	});

	it("accepts different parseable date formats for the current year", () => {
		expect(isCurrentYear("2024-06-15")).toBe(true);
		expect(isCurrentYear("2024/06/15")).toBe(true);
		expect(isCurrentYear("06/15/2024")).toBe(true);
		expect(isCurrentYear("June 15, 2024")).toBe(true);
		expect(isCurrentYear("2024-06-15T12:00:00Z")).toBe(true);
	});
});
