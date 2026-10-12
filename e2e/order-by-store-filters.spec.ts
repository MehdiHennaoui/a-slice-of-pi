import { expect, type Page, test } from "@playwright/test";

import {
	countOrdersByStore,
	filterOrdersByPizzaTypeOrSize,
	type PizzaType,
} from "../src/pages/home/model/order/order";
import type { PizzaSize } from "../src/pages/home/model/pricing/pricing";
import {
	PIZZA_FILTER_OPTIONS,
	PIZZA_SIZE_FILTER_OPTIONS,
} from "../src/pages/home/ui/order-by-store-bar-chart/chart-config";
import { CURRENT_YEAR } from "../src/shared/config";
import orderDataFixture from "./fixtures/order-data.json" with { type: "json" };

const STORE_LABEL_BY_SLUG: Record<string, string> = {
	kanata: "Kanata",
	orleans: "Orleans",
	downtown: "Downtown",
	"sandy-hill": "Sandy Hill",
	"the-glebe": "The Glebe",
};

const STORE_LABELS = Object.values(STORE_LABEL_BY_SLUG);
const orderByStoreHeading = `Order by Store for ${CURRENT_YEAR}`;

type OrderData = Parameters<typeof filterOrdersByPizzaTypeOrSize>[0];
const fixtureOrders = orderDataFixture as OrderData;

test.describe("order by store filters", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("./");
	});

	test("shows fixture stores and default counts before filtering", async ({
		page,
	}) => {
		await expect(
			page.getByRole("heading", { name: orderByStoreHeading }),
		).toHaveText(orderByStoreHeading);

		await expect(
			page.getByRole("heading", { name: "Filters" }),
		).toBeVisible();
		await expect(
			page.getByRole("button", { name: "Reset filters" }),
		).toBeDisabled();

		await expect(page.getByRole("combobox").nth(0)).toContainText(
			PIZZA_FILTER_OPTIONS[0],
		);
		await expect(page.getByRole("combobox").nth(1)).toContainText(
			PIZZA_SIZE_FILTER_OPTIONS[0],
		);

		await expectChartState(page, "all", "all");
	});

	test("filters the chart by pizza type", async ({ page }) => {
		const pizzaType = PIZZA_FILTER_OPTIONS[1];

		await selectFilter(page, 0, pizzaType);

		await expect(page.getByRole("combobox").nth(0)).toContainText(pizzaType);
		await expect(
			page.getByRole("button", { name: "Reset filters" }),
		).toBeEnabled();

		await expectChartState(page, pizzaType, "all");
	});

	test("filters the chart by pizza size", async ({ page }) => {
		const pizzaSize = PIZZA_SIZE_FILTER_OPTIONS[1];

		await selectFilter(page, 1, pizzaSize);

		await expect(page.getByRole("combobox").nth(1)).toContainText(pizzaSize);
		await expectChartState(page, "all", pizzaSize);
	});

	test("combines pizza and size filters and narrows visible stores", async ({
		page,
	}) => {
		const pizzaType = PIZZA_FILTER_OPTIONS[1];
		const pizzaSize = PIZZA_SIZE_FILTER_OPTIONS[1];

		await selectFilter(page, 0, pizzaType);
		await selectFilter(page, 1, pizzaSize);

		await expectChartState(page, pizzaType, pizzaSize);
	});

	test("shows empty state when no orders match", async ({ page }) => {
		const pizzaType = PIZZA_FILTER_OPTIONS[4];
		const pizzaSize = PIZZA_SIZE_FILTER_OPTIONS[1];

		await selectFilter(page, 0, pizzaType);
		await selectFilter(page, 1, pizzaSize);

		await expect(page.locator(".recharts-bar-rectangle")).toHaveCount(0);
		await expect(
			page.getByText("No orders found for the selected filters"),
		).toBeVisible();
	});

	test("resets filters and restores the default chart", async ({ page }) => {
		const resetButton = page.getByRole("button", { name: "Reset filters" });
		const pizzaType = PIZZA_FILTER_OPTIONS[5];
		const pizzaSize = PIZZA_SIZE_FILTER_OPTIONS[3];

		await selectFilter(page, 0, pizzaType);
		await selectFilter(page, 1, pizzaSize);
		await expectChartState(page, pizzaType, pizzaSize);

		await resetButton.click();

		await expect(page.getByRole("combobox").nth(0)).toContainText(
			PIZZA_FILTER_OPTIONS[0],
		);
		await expect(page.getByRole("combobox").nth(1)).toContainText(
			PIZZA_SIZE_FILTER_OPTIONS[0],
		);
		await expect(resetButton).toBeDisabled();
		await expectChartState(page, "all", "all");
	});
});

function expectedChartState(
	pizzaType: PizzaType | "all",
	pizzaSize: PizzaSize | "all",
) {
	return countOrdersByStore(
		filterOrdersByPizzaTypeOrSize(fixtureOrders, pizzaType, pizzaSize),
	).map((entry) => STORE_LABEL_BY_SLUG[entry.store] ?? entry.store);
}

async function selectFilter(
	page: Page,
	filterIndex: 0 | 1,
	optionValue: string,
) {
	await page.getByRole("combobox").nth(filterIndex).click();
	await page.getByRole("option", { name: optionValue, exact: true }).click();
}

async function expectChartState(
	page: Page,
	pizzaType: PizzaType | "all",
	pizzaSize: PizzaSize | "all",
) {
	const stores = expectedChartState(pizzaType, pizzaSize);

	await expect(page.locator(".recharts-bar-rectangle")).toHaveCount(
		stores.length,
	);

	for (const label of STORE_LABELS) {
		const tick = page.getByText(label, { exact: true });
		if (stores.includes(label)) {
			await expect(tick).toBeVisible();
		} else {
			await expect(tick).toHaveCount(0);
		}
	}
}
