import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";

import writeCategoriesTreeFile from "./utils/writeCategoriesThreeFile.js";
import { generateCategoriesTree } from "./utils/generateCategoriesThree.js";
import writeAllProductsFile from "./utils/writeAllProductsFile.js";
import loadAllProducts from "./utils/loadAllProducts.js";
import loadCategories from "./utils/loadCategories.js";
import splitCategoriesTree from "./utils/splitCategoriesTree.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Получаем аргументы командной строки
const args = process.argv.slice(2);

// Если переданы аргументы, используем их, иначе используем значения по умолчанию
const ENV_FILE = args[0] || path.resolve(__dirname, "./.env");
const CONTENT_DATA_DIR = args[1] || path.resolve(__dirname, "../content-data");

console.log(`[Debug] Using env file: ${ENV_FILE}`);
console.log(`[Debug] Using content dir: ${CONTENT_DATA_DIR}`);

// Загружаем .env с переданным путем
dotenv.config({ path: ENV_FILE });

export async function update(envFile, outputDir) {
	try {
		// Создаем папку для данных, если её нет
		await fs.mkdir(outputDir, { recursive: true });

		console.log(`Writing content to: ${outputDir}`);

		// Загружаем категории
		console.log("Loading categories...");
		const loadedCategories = await loadCategories();
		const CategoriesTree = generateCategoriesTree(loadedCategories);
		const { brandsTree, categoriesTree } = splitCategoriesTree(CategoriesTree);
		await writeCategoriesTreeFile(
			categoriesTree,
			outputDir,
			"CategoriesTree.json",
		);
		await writeCategoriesTreeFile(brandsTree, outputDir, "BrandsTree.json");

		// Загружаем продукты
		console.log("Loading products...");
		const allProductsLoaded = await loadAllProducts();
		await writeAllProductsFile(allProductsLoaded, outputDir);

		console.log("✅ Update completed successfully");
	} catch (e) {
		console.error("❌ Update failed:", e);
		process.exit(1);
	}
}

// Запускаем с переданными аргументами
update(ENV_FILE, CONTENT_DATA_DIR);
