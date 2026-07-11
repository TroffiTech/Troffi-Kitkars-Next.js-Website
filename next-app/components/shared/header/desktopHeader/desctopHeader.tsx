import { Category } from "@/types/productsType";
import useSWR from "swr";
import styles from "../Header.module.scss";
import Logo from "../logo/Logo";
import { infoLinks } from "../categoriesList";
import Link from "next/link";
import CallBackButton from "../../ctaButtons/ctaButtons";

async function fetcher(url: string) {
	const res = await fetch(url);
	return await res.json();
}

export default function DesctopHeader({ pathname }: { pathname: string }) {
	const isHomePath = pathname === "/";

	if (isHomePath) return <HomeHeader />;
	else return <NotHomeHeader pathname={pathname} />;
}

function HomeHeader() {
	const { data } = useSWR("/api/store/categories/getBrands", fetcher);
	return (
		<>
			<nav className={styles.header_topInner}>
				<Logo />
				<ul className={styles.header_infoLinks}>
					{infoLinks.map((infoLink, index) => (
						<li key={index}>
							<Link href={infoLink.link}>{infoLink.name}</Link>
						</li>
					))}
				</ul>
				{/* Contacts */}
				<div className={styles.header_topInner_contacts}>
					<div>
						<p>Мы работаем ежедневно</p>
						<p>9:00 - 19:00, без выходных</p>
					</div>
				</div>
				<CallBackButton text="Заказать звонок" />
			</nav>
			<nav className={styles.header_bottomInner}>
				<ul className={styles.header_categoryLinks}>
					{data &&
						data.map((category: Category, index: number) => (
							<li key={index}>
								<Link href={`/${category.slug}/`}>{category.name}</Link>
							</li>
						))}
				</ul>
			</nav>
		</>
	);
}

function NotHomeHeader({ pathname }: { pathname: string }) {
	const autoBrand = pathname.split("/")[1];
	const { data } = useSWR(
		"/api/store/categories/getProductsCategories",
		fetcher,
	);

	function generateLinkColor(category: Category) {
		const slugFromPathname = pathname.split("/")[2];

		if (category.slug.includes(slugFromPathname)) return "var(--orange-color)";

		if (category.children)
			for (const childrenCategory of category.children) {
				if (childrenCategory.slug === slugFromPathname)
					return "var(--orange-color)";
			}
		return "var(--foreground-color)";
	}

	function isCategoryActive(category: Category): boolean {
		const slugFromPathname = pathname.split("/")[2];

		if (category.slug.includes(slugFromPathname)) return true;

		if (category.children) {
			return category.children.some(
				(childrenCategory) => childrenCategory.slug === slugFromPathname,
			);
		}

		return false;
	}

	return (
		<>
			<nav className={styles.header_topInner}>
				<Logo />
				<ul className={styles.header_infoLinks}>
					{infoLinks.map((infoLink, index) => (
						<li key={index}>
							<Link href={infoLink.link}>{infoLink.name}</Link>
						</li>
					))}
				</ul>
				{/* Contacts */}
				<div className={styles.header_topInner_contacts}>
					<div>
						<p>Мы работаем ежедневно</p>
						<p>9:00 - 19:00, без выходных</p>
					</div>
				</div>
				<CallBackButton text="Заказать звонок" />
			</nav>
			<nav className={styles.header_bottomInner}>
				<ul className={styles.header_categoryLinks}>
					{data &&
						data.map((category: Category, index: number) => (
							<li
								key={index}
								className={
									isCategoryActive(category) ? styles.activeCategory : ""
								}
							>
								<Link
									style={{
										color: generateLinkColor(category),
									}}
									href={`/${autoBrand}/${category.slug}/`}
								>
									{category.name}
								</Link>
							</li>
						))}
				</ul>
			</nav>
		</>
	);
}
