export type ParsedRoute = {
	brand: string | null;
	categories: string[];
	models: string[];
	search?: string;
	order: "increase" | "decrease";
};
