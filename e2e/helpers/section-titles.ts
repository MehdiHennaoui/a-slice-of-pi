import { expect, type Page } from "@playwright/test";

import { appText } from "../../src/app/app-text";
import { monthlyRevenueText } from "../../src/pages/home/ui/monthly-revenue-text";
import { orderByStoreText } from "../../src/pages/home/ui/order-by-store-bar-chart/order-by-store-text";
import { reviewText } from "../../src/pages/home/ui/review-pie-chart/review-text";
import { yearlyRevenueText } from "../../src/pages/home/ui/yearly-revenue-text";
import { CURRENT_YEAR } from "../../src/shared/config";

export function appBrandTitle() {
	return appText["app-header"].brand;
}

export function yearlyRevenueTitle(year = CURRENT_YEAR) {
	return `${yearlyRevenueText["yearly-revenue"].title} ${year}`;
}

export function orderByStoreTitle(year = CURRENT_YEAR) {
	return `${orderByStoreText["order-by-store-chart"].title} ${year}`;
}

export function reviewChartTitle(year = CURRENT_YEAR) {
	const { title, titleSuffix } = reviewText["review-chart"];
	return `${title} ${year} ${titleSuffix}`;
}

export function monthlyRevenueTitle(year = CURRENT_YEAR) {
	return `${monthlyRevenueText["monthly-revenue-chart"].title} ${year}`;
}

export async function expectSectionTitle(page: Page, title: string) {
	await expect(page.getByRole("heading", { name: title })).toHaveText(title);
}

export async function expectSectionTitleVisible(page: Page, title: string) {
	await expect(page.getByRole("heading", { name: title })).toBeVisible();
}
