import { useCallback, useEffect } from "react";
import useSWRInfinite from "swr/infinite";

import throttle from "@/lib/throttle";
import type { Product } from "@/types/productsType";

export async function fetcher(url: string) {
	const res = await fetch(url);

	return {
		data: (await res.json()) as Product[],
		totalPages: Number(res.headers.get("x-total-count") ?? 0),
	};
}

type FeedQuery = {
	brand: string | null;
	categories: string[];
	models: string[];
	search?: string;
	order: "increase" | "decrease";
};

export default function UseInfiniteScroll(query: FeedQuery) {
	const { brand, categories, models, search, order } = query;
	const getKey = useCallback(
		(pageIndex: number, previousPageData: any) => {
			if (
				previousPageData &&
				(previousPageData.data.length === 0 ||
					(pageIndex > 0 && !previousPageData.data))
			) {
				return null;
			}

			const params = new URLSearchParams();

			params.set("page", String(pageIndex + 1));
			params.set("order", query.order);

			if (brand) params.set("brand", brand);
			if (categories.length) params.set("categories", categories.join(","));
			if (models.length) params.set("models", models.join(","));
			if (search) params.set("search", search);

			return `/api/store/categories/getProductsInCategories/?${params.toString()}`;
		},
		[brand, order, search, categories.join(","), models.join(",")],
	);

	const { data, size, setSize, isLoading, isValidating } = useSWRInfinite(
		getKey,
		fetcher,
		{
			revalidateFirstPage: false,
		},
	);

	const allProducts = data?.flatMap((page) => page.data) ?? [];

	const isEmpty = data?.[0]?.data.length === 0;

	const isReachingEnd =
		isEmpty || (data && data[data.length - 1].data.length < 10);

	const isRefreshing = isValidating && data && data.length === size;

	const loadMore = useCallback(() => {
		if (!isLoading && !isReachingEnd && !isRefreshing) {
			setSize((prev) => prev + 1);
		}
	}, [isLoading, isReachingEnd, isRefreshing, setSize]);

	const throttledScrollHandler = useCallback(
		throttle(() => {
			if (
				window.innerHeight + window.scrollY >=
				document.documentElement.offsetHeight - window.innerHeight * 2
			) {
				loadMore();
			}
		}, 500),
		[loadMore],
	);

	useEffect(() => {
		window.addEventListener("scroll", throttledScrollHandler);

		return () => window.removeEventListener("scroll", throttledScrollHandler);
	}, [throttledScrollHandler]);

	const queryKey = [
		brand,
		order,
		search,
		categories.join(","),
		models.join(","),
	].join("|");

	useEffect(() => {
		setSize(1);
	}, [queryKey, setSize]);

	return {
		allProducts,
		isLoading,
		isValidating,
	};
}
