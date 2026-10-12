import path from "node:path";
import { fileURLToPath } from "node:url";

import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const orderDataJson = path.resolve(
	__dirname,
	"./src/pages/home/model/order/order-data.json",
);
const orderDataE2eFixture = path.resolve(
	__dirname,
	"./e2e/fixtures/order-data.json",
);

function e2eOrderDataFixturePlugin(mode: string): Plugin {
	return {
		name: "e2e-order-data-fixture",
		enforce: "pre",
		async resolveId(source, importer, options) {
			if (mode !== "e2e") {
				return null;
			}

			const isOrderDataImport =
				source === "./order-data.json" ||
				source.endsWith("/order-data.json") ||
				path.resolve(path.dirname(importer ?? ""), source) === orderDataJson;

			if (!isOrderDataImport || !importer?.includes(`${path.sep}order${path.sep}`)) {
				return null;
			}

			return this.resolve(orderDataE2eFixture, importer, {
				...options,
				skipSelf: true,
			});
		},
	};
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
	base: "/a-slice-of-pi/",
	plugins: [
		e2eOrderDataFixturePlugin(mode),
		react(),
		babel({ presets: [reactCompilerPreset()] }),
		tailwindcss(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
}));
