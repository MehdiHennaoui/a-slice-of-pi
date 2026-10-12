import { expect, test } from "@playwright/test";

import { CURRENT_YEAR } from "../src/shared/config";

test.describe("home dashboard", () => {
	test("loads the brand and main charts", async ({ page }) => {
		await page.goto("./");

		await expect(
			page.getByRole("heading", { name: "A Slice of Pi" }),
		).toBeVisible();

		await expect(
			page.getByRole("heading", {
				name: `Yearly Revenue for ${CURRENT_YEAR}`,
			}),
		).toBeVisible();
		await expect(
			page.getByRole("heading", {
				name: `Order by Store for ${CURRENT_YEAR}`,
			}),
		).toBeVisible();
		await expect(
			page.getByRole("heading", {
				name: `Reviews ${CURRENT_YEAR} by sentiment`,
			}),
		).toBeVisible();
		await expect(
			page.getByRole("heading", {
				name: `Monthly Revenue for ${CURRENT_YEAR}`,
			}),
		).toBeVisible();
	});
});
