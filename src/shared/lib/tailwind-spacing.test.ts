import { describe, expect, it, vi } from "vitest";
import {
	MAX_TAILWIND_SPACING_STEP,
	tailwindSpacingToPx,
} from "./tailwind-spacing";

describe("tailwindSpacingToPx", () => {
	it("maps spacing steps with the default Tailwind formula", () => {
		expect(tailwindSpacingToPx(0)).toBe(0);
		expect(tailwindSpacingToPx(1)).toBe(4);
		expect(tailwindSpacingToPx(4)).toBe(16);
		expect(tailwindSpacingToPx(6)).toBe(24);
	});

	it("clamps steps above the maximum and logs an error", () => {
		const consoleError = vi
			.spyOn(console, "error")
			.mockImplementation(() => {});

		expect(tailwindSpacingToPx(MAX_TAILWIND_SPACING_STEP + 10)).toBe(
			MAX_TAILWIND_SPACING_STEP * 4,
		);
		expect(consoleError).toHaveBeenCalledWith(
			`Tailwind spacing step "${MAX_TAILWIND_SPACING_STEP + 10}" exceeds maximum of ${MAX_TAILWIND_SPACING_STEP}`,
		);

		consoleError.mockRestore();
	});

	it("clamps negative steps to 0", () => {
		expect(tailwindSpacingToPx(-3)).toBe(0);
	});
});
