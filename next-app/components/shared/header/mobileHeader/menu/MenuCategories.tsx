import { useFeedQuery } from "@/hooks/useFeedQuery";
import { Category } from "@/types/productsType";
import useSWR from "swr";
import fetcher from "../../heplers/fetcher";
import { buildRoute } from "@/lib/routeParser";
import Link from "next/link";

import styles from "./MenuPopup.module.scss";

export default function MenuCategories() {
	const route = useFeedQuery();

	const endpoint =
		route.brand ?
			"/api/store/categories/getProductsCategories"
		:	"/api/store/categories/getBrands";

	const { data } = useSWR(endpoint, fetcher);
	function isActive(category: Category) {
		if (route.categories.includes(category.slug)) {
			return true;
		}

		return category.children.some((child) =>
			route.categories.includes(child.slug),
		);
	}

	return (
		<ul className={styles.menuPopup_innerContent_categories}>
			{data &&
				data.map((category: Category) => (
					<li
						key={category.id}
						className={isActive(category) ? styles.activeCategory : ""}
					>
						<Link
							href={buildRoute({
								...route,
								categories: [category.slug],
							})}
						>
							{category.name}
						</Link>
					</li>
				))}
		</ul>
	);
}
