const SPACING_UNIT_REM = 0.25;
const ROOT_FONT_SIZE_PX = 16;
const MAX_TAILWIND_SPACING_STEP = 24;

export function tailwindSpacingToPx(step: number): number {
	if (step > MAX_TAILWIND_SPACING_STEP) {
		console.error(
			`Tailwind spacing step "${step}" exceeds maximum of ${MAX_TAILWIND_SPACING_STEP}`,
		);
	}

	const clampedStep = Math.min(Math.max(step, 0), MAX_TAILWIND_SPACING_STEP);

	return clampedStep * SPACING_UNIT_REM * ROOT_FONT_SIZE_PX;
}
