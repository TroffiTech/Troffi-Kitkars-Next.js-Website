"use client";

import useSWR from "swr";
import { useState } from "react";
import { useSelector } from "react-redux";

import CardReplacerFirstVariant, {
	CardReplacerSecondVariant,
} from "../productCards/replacerCards";
import { LinkButton } from "@/components/shared/ctaButtons/ctaButtons";
import UseInfiniteScroll, { fetcher } from "@/hooks/useInfiniteScroll";
import SortOrderSelector from "./sortSelector/sortSelector";
import styles from "./productFeeds.module.scss";
import { Product } from "@/types/productsType";
import Paginator from "./paginator/paginator";
import { RootState } from "@/store/store";
import Search from "../searchBar/Search";
import {
	CartProductCard,
	FeedProductCard,
	ProductCardSkeleton,
} from "../productCards/productCards";
import FeedFilters from "./filters/FeedFilters";

function insertMockCardsInFeed(
	data: Array<"firstFlag" | "secondFlag" | Product>,
) {
	const firstMockCardPosition = 0;
	const secondMockCardPosition = data.length + 1;
	return data
		.toSpliced(firstMockCardPosition, 0, "firstFlag")
		.toSpliced(secondMockCardPosition, 0, "secondFlag");
}

export function CategoryFeed({
	categoriesSlugs,
}: {
	categoriesSlugs: string | undefined;
}) {
	const {
		priceSortOrder,
		setPriceSortOrder,
		isLoading,
		allProducts,
		isValidating,
	} = UseInfiniteScroll({
		action: "category",
		payload: categoriesSlugs,
	});

	return (
		<div className={styles.defaultFeed_container}>
			<div className={styles.topInner}>
				<div className={styles.searchBar}>
					<Search />
				</div>
				<div className={styles.sortInputs}>
					<SortOrderSelector
						currentSortOrder={priceSortOrder}
						sortOrderSetter={setPriceSortOrder}
					/>
				</div>
			</div>
			<div className={styles.defaultFeed}>
				<FeedFilters />
				<div className={styles.cards}>
					{isLoading &&
						Array.from({ length: 12 }).map((_, index) => (
							<ProductCardSkeleton key={index} />
						))}
					{allProducts.length > 0 &&
						allProducts.map((product, index) => (
							<FeedProductCard
								key={`product-${product.id}-${index + 1}`}
								product={product}
							/>
						))}
					{(isLoading || isValidating) &&
						allProducts.length > 0 &&
						Array.from({ length: 12 }).map((_, index) => (
							<ProductCardSkeleton key={`loading-${index + 1}`} />
						))}
				</div>
			</div>
		</div>
	);
}

export function SearchFeed({ searchRequest }: { searchRequest: string }) {
	const { isLoading, allProducts, isValidating } = UseInfiniteScroll({
		action: "search",
		payload: searchRequest,
	});

	return (
		<div className={styles.defaultFeed_container}>
			<div className={styles.topInner}>
				<div className={styles.searchBar}>
					<Search />
				</div>
			</div>
			<h2
				style={{
					alignSelf: "start",
					padding: "0 15px",
				}}
			>
				Результаты поиска: <br />
				&ldquo;{decodeURI(searchRequest)}&ldquo;
			</h2>
			<div className={styles.searchFeed}>
				{isLoading &&
					Array.from({ length: 12 }).map((_, index) => (
						<ProductCardSkeleton key={index} />
					))}
				{allProducts.length > 0 &&
					allProducts.map((product, index) => (
						<FeedProductCard
							key={`product-${product.id}-${index}`}
							product={product}
						/>
					))}
				{(isLoading || isValidating) &&
					allProducts.length > 0 &&
					Array.from({ length: 12 }).map((_, index) => (
						<ProductCardSkeleton key={`loading-${index + 1}`} />
					))}
			</div>
		</div>
	);
}

export function DefaultFeed() {
	const {
		priceSortOrder,
		setPriceSortOrder,
		isLoading,
		allProducts,
		isValidating,
	} = UseInfiniteScroll();

	return (
		<div className={styles.defaultFeed_container}>
			<div className={styles.topInner}>
				<div className={styles.searchBar}>
					<Search />
				</div>
				<SortOrderSelector
					currentSortOrder={priceSortOrder}
					sortOrderSetter={setPriceSortOrder}
				/>
			</div>
			<div className={styles.defaultFeed}>
				<FeedFilters />
				<div className={styles.cards}>
					{isLoading &&
						Array.from({ length: 12 }).map((_, index) => (
							<ProductCardSkeleton key={index} />
						))}
					{allProducts.length > 0 &&
						allProducts.map((product, index) => (
							<FeedProductCard
								key={`product-${product.id}-${index}`}
								product={product}
							/>
						))}
					{(isLoading || isValidating) &&
						allProducts.length > 0 &&
						Array.from({ length: 12 }).map((_, index) => (
							<ProductCardSkeleton key={`loading-${index + 1}`} />
						))}
				</div>
			</div>
		</div>
	);
}

export function SalesFeed() {
	const [curPage, setCurPage] = useState(1);
	const [priceSortOrder, setPriceSortOrder] = useState("increase");

	const { data, isLoading } = useSWR(
		`/api/store/products/getAllOnSaleProducts/?page=${curPage}&order=${priceSortOrder}`,
		fetcher,
	);

	return (
		<div className={styles.defaultFeed_container}>
			<div className={styles.topInner}>
				<div className={styles.searchBar}>
					<Search />
				</div>
				<SortOrderSelector
					currentSortOrder={priceSortOrder}
					sortOrderSetter={setPriceSortOrder}
				/>
			</div>
			<div className={styles.defaultFeed}>
				{isLoading &&
					Array.from({ length: 12 }).map((_, index) => (
						<ProductCardSkeleton key={index} />
					))}
				{data &&
					insertMockCardsInFeed(data.data).map((product, index) => {
						if (product === "firstFlag")
							return <CardReplacerFirstVariant key={index} />;
						if (product === "secondFlag")
							return <CardReplacerSecondVariant key={index} />;
						return <FeedProductCard key={index} product={product} />;
					})}
			</div>
			{data && (
				<Paginator
					pagesStateSetter={setCurPage}
					totalPages={data.totalPages}
					curPage={curPage}
				/>
			)}
		</div>
	);
}

export function HeroSaleFeed() {
	const { data, isLoading } = useSWR(
		"/api/store/products/getOnSaleProducts",
		fetcher,
	);

	return (
		<>
			{isLoading &&
				Array.from({ length: 8 }).map((_, index) => (
					<ProductCardSkeleton key={index} />
				))}
			{data &&
				insertMockCardsInFeed(data.data).map((product, index) => {
					if (product === "firstFlag")
						return <CardReplacerFirstVariant key={index} />;
					if (product === "secondFlag")
						return <CardReplacerSecondVariant key={index} />;
					return <FeedProductCard key={index} product={product} />;
				})}
		</>
	);
}

export function HitsFeed() {
	const { data, isLoading } = useSWR(
		"/api/store/products/getNewestProducts",
		fetcher,
	);
	return (
		<>
			{isLoading &&
				Array.from({ length: 12 }).map((_, index) => (
					<ProductCardSkeleton key={index} />
				))}
			{data &&
				insertMockCardsInFeed(data.data).map((product, index) => {
					if (product === "firstFlag")
						return <CardReplacerFirstVariant key={index} />;
					if (product === "secondFlag")
						return <CardReplacerSecondVariant key={index} />;
					return <FeedProductCard key={index} product={product} />;
				})}
		</>
	);
}

export function CartFeed() {
	const data = useSelector((state: RootState) => state.cart.value);
	let totalPrice = 0;
	data.map((elem) => {
		totalPrice += +elem.price * elem.quantity;
	});
	return (
		<div className={styles.cartFeed_container}>
			{data.length === 0 ?
				<h2>Корзина пуста</h2>
			:	<h2>Корзина</h2>}
			{data.length !== 0 && (
				<div className={styles.feedContent}>
					<div className={styles.cardsContainer}>
						{data.map((product, index) => (
							<CartProductCard key={product.id + index} product={product} />
						))}
					</div>
					<div className={styles.cartFeed_cta}>
						<div className={styles.buttonContainer}>
							<LinkButton text="Оформить заказ" link="/checkout" />
							<p>
								Способ доставки и оплаты можно будет выбрать при оформлении
								заказа
							</p>
						</div>
						<div className={styles.totalPrice}>
							<p>Итого:</p>
							<p>{totalPrice} руб.</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
