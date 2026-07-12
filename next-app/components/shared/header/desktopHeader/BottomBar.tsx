import { useFeedQuery } from "@/hooks/useFeedQuery";
import { Category } from "@/types/productsType";
import useSWR from "swr";
import fetcher from "../heplers/fetcher";
import styles from "./DesctopHeader.module.scss";
import Link from "next/link";
import { buildRoute } from "@/lib/routeParser";

export default function BottomBar() {
	const route = useFeedQuery();

	const { data = [] } = useSWR<Category[]>(
		route.brand ?
			"/api/store/categories/getProductsCategories"
		:	"/api/store/categories/getBrands",
		fetcher,
	);

	function isActive(category: Category) {
		if (route.categories.includes(category.slug)) {
			return true;
		}

		return category.children.some((child) =>
			route.categories.includes(child.slug),
		);
	}

	function getHref(category: Category) {
		return buildRoute({
			...route,
			categories: [category.slug],
		});
	}

	return (
		<nav className={styles.header_bottomInner}>
			<ul className={styles.header_categoryLinks}>
				{data.map((category) => (
					<li
						key={category.id}
						className={isActive(category) ? styles.activeCategory : ""}
					>
						<Link href={getHref(category)}>{category.name}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
