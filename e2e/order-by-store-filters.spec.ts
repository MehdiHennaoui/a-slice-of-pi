import { expect, type Locator, type Page, test } from "@playwright/test";

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

type OrderData = Parameters<typeof filterOrdersByPizzaTypeOrSize>[0];
const fixtureOrders = orderDataFixture as OrderData;

test.describe("order by store filters", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("./");
	});

	test("shows fixture stores and default counts before filtering", async ({
		page,
	}) => {
		const section = orderByStoreSection(page);

		await expect(
			filtersPanel(section).getByRole("heading", { name: "Filters" }),
		).toBeVisible();
		await expect(
			filtersPanel(section).getByRole("button", { name: "Reset filters" }),
		).toBeDisabled();

		await expect(
			filtersPanel(section).getByRole("combobox").nth(0),
		).toContainText(PIZZA_FILTER_OPTIONS[0]);
		await expect(
			filtersPanel(section).getByRole("combobox").nth(1),
		).toContainText(PIZZA_SIZE_FILTER_OPTIONS[0]);

		await expectChartState(section, "all", "all");
	});

	test("filters the chart by pizza type", async ({ page }) => {
		const section = orderByStoreSection(page);
		const pizzaType = PIZZA_FILTER_OPTIONS[1];

		await selectFilter(section, 0, pizzaType);

		await expect(
			filtersPanel(section).getByRole("combobox").nth(0),
		).toContainText(pizzaType);
		await expect(
			filtersPanel(section).getByRole("button", { name: "Reset filters" }),
		).toBeEnabled();

		await expectChartState(section, pizzaType, "all");
	});

	test("filters the chart by pizza size", async ({ page }) => {
		const section = orderByStoreSection(page);
		const pizzaSize = PIZZA_SIZE_FILTER_OPTIONS[1];

		await selectFilter(section, 1, pizzaSize);

		await expect(
			filtersPanel(section).getByRole("combobox").nth(1),
		).toContainText(pizzaSize);
		await expectChartState(section, "all", pizzaSize);
	});

	test("combines pizza and size filters and narrows visible stores", async ({
		page,
	}) => {
		const section = orderByStoreSection(page);
		const pizzaType = PIZZA_FILTER_OPTIONS[1];
		const pizzaSize = PIZZA_SIZE_FILTER_OPTIONS[1];

		await selectFilter(section, 0, pizzaType);
		await selectFilter(section, 1, pizzaSize);

		await expectChartState(section, pizzaType, pizzaSize);
	});

	test("shows empty state when no orders match", async ({ page }) => {
		const section = orderByStoreSection(page);
		const pizzaType = PIZZA_FILTER_OPTIONS[4];
		const pizzaSize = PIZZA_SIZE_FILTER_OPTIONS[1];

		await selectFilter(section, 0, pizzaType);
		await selectFilter(section, 1, pizzaSize);

		await expect(section.locator("svg.recharts-surface")).toHaveCount(0);
		await expect(
			section.getByText("No orders found for the selected filters"),
		).toBeVisible();
	});

	test("resets filters and restores the default chart", async ({ page }) => {
		const section = orderByStoreSection(page);
		const resetButton = filtersPanel(section).getByRole("button", {
			name: "Reset filters",
		});
		const pizzaType = PIZZA_FILTER_OPTIONS[5];
		const pizzaSize = PIZZA_SIZE_FILTER_OPTIONS[3];

		await selectFilter(section, 0, pizzaType);
		await selectFilter(section, 1, pizzaSize);
		await expectChartState(section, pizzaType, pizzaSize);

		await resetButton.click();

		await expect(
			filtersPanel(section).getByRole("combobox").nth(0),
		).toContainText(PIZZA_FILTER_OPTIONS[0]);
		await expect(
			filtersPanel(section).getByRole("combobox").nth(1),
		).toContainText(PIZZA_SIZE_FILTER_OPTIONS[0]);
		await expect(resetButton).toBeDisabled();
		await expectChartState(section, "all", "all");
	});
});

function expectedChartState(
	pizzaType: PizzaType | "all",
	pizzaSize: PizzaSize | "all",
) {
	const counts = countOrdersByStore(
		filterOrdersByPizzaTypeOrSize(fixtureOrders, pizzaType, pizzaSize),
	);

	return {
		stores: counts.map(
			(entry) => STORE_LABEL_BY_SLUG[entry.store] ?? entry.store,
		),
		counts: counts.map((entry) => String(entry.order_count)),
	};
}

function orderByStoreSection(page: Page) {
	return page
		.getByRole("heading", {
			name: `Order by Store for ${CURRENT_YEAR}`,
		})
		.locator("xpath=ancestor::section[1]");
}

function filtersPanel(section: Locator) {
	return section.locator("aside");
}

async function selectFilter(
	section: Locator,
	filterIndex: 0 | 1,
	optionValue: string,
) {
	const trigger = filtersPanel(section).getByRole("combobox").nth(filterIndex);
	await trigger.click();
	await section
		.page()
		.getByRole("option", { name: optionValue, exact: true })
		.click();
}

async function expectChartState(
	section: Locator,
	pizzaType: PizzaType | "all",
	pizzaSize: PizzaSize | "all",
) {
	const state = expectedChartState(pizzaType, pizzaSize);
	const chart = section.locator("svg.recharts-surface");
	await expect(chart).toBeVisible();

	await expect(section.locator(".recharts-bar-rectangle")).toHaveCount(
		state.stores.length,
	);

	for (const label of STORE_LABELS) {
		const tick = section.getByText(label, { exact: true });
		if (state.stores.includes(label)) {
			await expect(tick).toBeVisible();
		} else {
			await expect(tick).toHaveCount(0);
		}
	}

	await expect(section.locator(".recharts-label-list text")).toHaveText(
		state.counts,
	);
}
