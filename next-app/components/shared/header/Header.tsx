"use client";

import useSWR from "swr";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MenuPopup, MenuTrigger } from "./menu/Menu";
import styles from "./Header.module.scss";
import Logo from "./logo/Logo";
import { checkIsMobile } from "@/lib/deviceTypeChecker";
import { infoLinks } from "./categoriesList";
import CallBackButton from "../ctaButtons/ctaButtons";
import { Category } from "@/types/productsType";
import Link from "next/link";
import { usePathname } from "next/navigation";

async function fetcher(url: string) {
	const res = await fetch(url);
	return await res.json();
}

export default function Header() {
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const [isScrolled, setIsScrolled] = useState(false);

	function setView() {
		if (checkIsMobile() || window.innerWidth <= 900) setIsMobile(true);
		else setIsMobile(false);
	}

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", setView);

		setView();

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", setView);
		};
	}, []);

	const headerClass = `${styles.header} ${isScrolled ? styles.scrolled : ""}`;

	return (
		<header className={headerClass}>
			{isMobile && (
				<MobileHeader isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible} />
			)}
			{!isMobile && <DesctopHeader />}
		</header>
	);
}

function DesctopHeader() {
	const pathname = usePathname();
	const { data } = useSWR("/api/store/categories/getCategoriesFile", fetcher);
	function generateLinkColor(category: Category) {
		const slugFromPathname = pathname.split("/")[3];

		if (category.slug.includes(slugFromPathname)) return "var(--orange-color)";

		if (category.children)
			for (const childrenCategory of category.children) {
				if (childrenCategory.slug === slugFromPathname) return "var(--orange-color)";
			}
		return "var(--foreground-color)";
	}

	function isCategoryActive(category: Category): boolean {
		const slugFromPathname = pathname.split("/")[3];

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
							<li key={index} className={isCategoryActive(category) ? styles.activeCategory : ""}>
								<Link
									style={{
										color: generateLinkColor(category),
									}}
									href={`/catalog/category/?id=${category.id}`}
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

function MobileHeader({
	isMenuVisible,
	setIsMenuVisible,
}: {
	isMenuVisible: boolean;
	setIsMenuVisible: Dispatch<SetStateAction<boolean>>;
}) {
	return (
		<div className={styles.mobileHeader}>
			<Logo />
			<MenuTrigger
				isVisible={isMenuVisible}
				stateDriver={() => {
					setIsMenuVisible((prev) => !prev);
				}}
			/>
			<MenuPopup isVisible={isMenuVisible} fetcher={fetcher} />
		</div>
	);
}
