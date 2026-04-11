import { useCallback, useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";

import { Product } from "@/types/productsType";
import throttle from "@/lib/throttle";

export async function fetcher(url: string) {
	const res = await fetch(url);
	const totalPages = res.headers.get("x-total-count");
	return {
		data: (await res.json()) as Product[],
		totalPages: totalPages ? +totalPages : 0,
	};
}

export default function UseInfiniteScroll(
	opt: {
		action: "default" | "category" | "search";
		payload?: string;
	} = { action: "default" },
) {
	const [priceSortOrder, setPriceSortOrder] = useState("increase");
	const getSWRKey = useCallback(
		(pageIndex: number, prevPageData: any) => {
			if (
				prevPageData &&
				(prevPageData.data?.length === 0 || (pageIndex > 0 && !prevPageData.data))
			) {
				return null;
			}

			switch (opt.action) {
				case "default":
					return `/api/store/products/getAllProducts/?page=${
						pageIndex + 1
					}&order=${priceSortOrder}`;
				case "category":
					return `/api/store/categories/getProductsInCategory/?page=${pageIndex + 1}&category=${
						opt.payload
					}&order=${priceSortOrder}`;
				case "search":
					return `/api/store/products/getSearchedProducts/?request=${opt.payload}&page=${
						pageIndex + 1
					}`;
				default:
					return null;
			}
		},
		[opt.action, opt.payload, priceSortOrder],
	);

	const { data, size, setSize, isLoading, isValidating } = useSWRInfinite(getSWRKey, fetcher, {
		revalidateFirstPage: false,
	});

	const allProducts = data ? data.flatMap((page) => page.data) : [];

	const isEmpty = data?.[0]?.data.length === 0;
	const isReachingEnd = isEmpty || (data && data[data.length - 1]?.data.length < 10);
	const isRefreshing = isValidating && data && data.length === size;

	const loadMore = useCallback(() => {
		if (!isLoading && !isReachingEnd && !isRefreshing) {
			setSize(size + 1);
		}
	}, [isLoading, isReachingEnd, isRefreshing, setSize, size]);

	const throttledScrollHandler = useCallback(
		throttle(() => {
			if (
				window.innerHeight + document.documentElement.scrollTop >=
				document.documentElement.offsetHeight - window.innerHeight - window.innerHeight * 2
			)
				loadMore();
		}, 500),
		[loadMore],
	);

	useEffect(() => {
		window.addEventListener("scroll", throttledScrollHandler);
		return () => window.removeEventListener("scroll", throttledScrollHandler);
	}, [throttledScrollHandler]);

	useEffect(() => {
		setSize(1);
	}, [priceSortOrder, setSize]);

	return { priceSortOrder, setPriceSortOrder, isLoading, allProducts, isValidating };
}
