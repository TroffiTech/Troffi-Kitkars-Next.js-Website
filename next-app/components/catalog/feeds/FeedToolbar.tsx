"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import Search from "../searchBar/Search";
import SortOrderSelector from "./sortSelector/SortSelector";

import { buildRoute } from "@/lib/routeParser";
import { useFeedQuery } from "@/hooks/useFeedQuery";

import styles from "./ProductFeeds.module.scss";

export default function FeedToolbar() {
	const router = useRouter();
	const route = useFeedQuery();

	const setOrder = useCallback(
		(order: "increase" | "decrease") => {
			router.push(
				buildRoute({
					...route,
					order,
				}),
				{ scroll: false },
			);
		},
		[route, router],
	);

	return (
		<div className={styles.topInner}>
			<div className={styles.searchBar}>
				<Search />
			</div>

			<div className={styles.sortInputs}>
				<SortOrderSelector value={route.order} onChange={setOrder} />
			</div>
		</div>
	);
}
