import path from "node:path";
import { fileURLToPath } from "node:url";

import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vitest/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const orderDataJson = path.resolve(
	__dirname,
	"./src/pages/home/model/order/order-data.json",
);
const reviewDataJson = path.resolve(
	__dirname,
	"./src/pages/home/model/review/review-data.json",
);
const orderDataE2eFixture = path.resolve(
	__dirname,
	"./e2e/fixtures/order-data.json",
);
const reviewDataE2eFixture = path.resolve(
	__dirname,
	"./e2e/fixtures/review-data.json",
);

function e2eDataFixturePlugin(mode: string): Plugin {
	const fixtures = [
		{
			sourceFile: orderDataJson,
			fixtureFile: orderDataE2eFixture,
			importerDir: `${path.sep}order${path.sep}`,
			fileName: "order-data.json",
		},
		{
			sourceFile: reviewDataJson,
			fixtureFile: reviewDataE2eFixture,
			importerDir: `${path.sep}review${path.sep}`,
			fileName: "review-data.json",
		},
	] as const;

	return {
		name: "e2e-data-fixture",
		enforce: "pre",
		async resolveId(source, importer, options) {
			if (mode !== "e2e" || !importer) {
				return null;
			}

			for (const fixture of fixtures) {
				const resolvedSource = path.resolve(path.dirname(importer), source);
				const isTargetImport =
					source === `./${fixture.fileName}` ||
					source.endsWith(`/${fixture.fileName}`) ||
					resolvedSource === fixture.sourceFile;

				if (!isTargetImport || !importer.includes(fixture.importerDir)) {
					continue;
				}

				return this.resolve(fixture.fixtureFile, importer, {
					...options,
					skipSelf: true,
				});
			}

			return null;
		},
	};
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
	base: "/a-slice-of-pi/",
	plugins: [
		e2eDataFixturePlugin(mode),
		react(),
		babel({ presets: [reactCompilerPreset()] }),
		tailwindcss(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	test: {
		exclude: ["**/node_modules/**", "**/dist/**", "e2e/**"],
	},
}));
