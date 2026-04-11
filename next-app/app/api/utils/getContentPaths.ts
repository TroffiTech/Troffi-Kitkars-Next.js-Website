import path from "path";

export const DATA_PATHS = {
	production: path.join(process.cwd(), "app/content"),
	development: path.join(process.cwd(), "..", "content"),
};

export function getDataPath() {
	if (process.env.NODE_ENV === "production") {
		return DATA_PATHS.production;
	}
	return DATA_PATHS.development;
}

export function getFilePath(filename: string) {
	const dataPath = getDataPath();
	console.log(`📁 Using data path: ${dataPath}`);
	return path.join(dataPath, filename);
}
