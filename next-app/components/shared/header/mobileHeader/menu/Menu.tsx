import { useEffect, useState } from "react";
import useSWR from "swr";
import styles from "./Menu.module.css";
import { infoLinks } from "../../categoriesList";
import { CategoriesTree } from "@/types/productsType";
import CallBackButton from "../../../ctaButtons/ctaButtons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MenuPopup({
	isVisible,
	fetcher,
}: {
	isVisible: boolean;
	fetcher: (url: string) => Promise<CategoriesTree>;
}) {
	const pathname = usePathname();
	const isHomePath = pathname === "/";

	if (isHomePath) return <HomeHeader isVisible={isVisible} fetcher={fetcher} />;
	else
		return (
			<NotHomeHeader
				isVisible={isVisible}
				fetcher={fetcher}
				pathname={pathname}
			/>
		);
}

function HomeHeader({
	isVisible,
	fetcher,
}: {
	isVisible: boolean;
	fetcher: (url: string) => Promise<CategoriesTree>;
}) {
	const { data } = useSWR("/api/store/categories/getbrands", fetcher);
	const [shouldRender, setShouldRender] = useState(false);

	useEffect(() => {
		if (isVisible) {
			setShouldRender(true);
			document.body.classList.add("blockScroll");
		} else {
			document.body.classList.remove("blockScroll");
			// Задержка перед скрытием для завершения анимации
			const timer = setTimeout(() => {
				setShouldRender(false);
			}, 400);
			return () => clearTimeout(timer);
		}
	}, [isVisible]);

	if (!shouldRender && !isVisible) return null;

	const menuClass = `${styles.menuPopup} ${isVisible ? styles.menuEnter : styles.menuExit}`;

	return (
		<div className={menuClass}>
			<div className={styles.menuPopup_innerContent}>
				{/* Categories Links */}
				<ul className={styles.menuPopup_innerContent_categories}>
					{data &&
						data.map((category, index) => (
							<li key={index}>
								<Link
									href={`/${category.slug}`}
									onClick={() => document.body.classList.remove("blockScroll")}
								>
									{category.name}
								</Link>
							</li>
						))}
				</ul>

				{/* Info Links */}
				<ul className={styles.menuPopup_innerContent_infoLinks}>
					{infoLinks.map((category, index) => (
						<li key={index}>
							<Link
								href={category.link}
								onClick={() => document.body.classList.remove("blockScroll")}
							>
								{category.name}
							</Link>
						</li>
					))}
				</ul>

				{/* Contacts */}
				<div className={styles.menuPopup_innerContent_contacts}>
					<div>
						<p>Мы работаем ежедневно</p>
						<p>9:00 - 19:00, без выходных</p>
					</div>
					<Link
						className={styles.menuPopup_innerContent_contacts_phoneNumber}
						href={`tel: ${process.env.MAIN_TEL}`}
						onClick={() => document.body.classList.remove("blockScroll")}
					>
						{process.env.MAIN_TEL}
					</Link>
					<CallBackButton text="Заказать звонок" />
				</div>
			</div>
		</div>
	);
}

function NotHomeHeader({
	pathname,
	isVisible,
	fetcher,
}: {
	pathname: string;
	isVisible: boolean;
	fetcher: (url: string) => Promise<CategoriesTree>;
}) {
	const autoBrand = pathname.split("/")[1];
	const { data } = useSWR(
		"/api/store/categories/getProductsCategories",
		fetcher,
	);
	const [shouldRender, setShouldRender] = useState(false);

	useEffect(() => {
		if (isVisible) {
			setShouldRender(true);
			document.body.classList.add("blockScroll");
		} else {
			document.body.classList.remove("blockScroll");
			const timer = setTimeout(() => {
				setShouldRender(false);
			}, 400);
			return () => clearTimeout(timer);
		}
	}, [isVisible]);

	if (!shouldRender && !isVisible) return null;

	const menuClass = `${styles.menuPopup} ${isVisible ? styles.menuEnter : styles.menuExit}`;

	return (
		<div className={menuClass}>
			<div className={styles.menuPopup_innerContent}>
				{/* Categories Links */}
				<ul className={styles.menuPopup_innerContent_categories}>
					{data &&
						data.map((category, index) => (
							<li key={index}>
								<Link
									href={`/${autoBrand}/${category.slug}/`}
									onClick={() => document.body.classList.remove("blockScroll")}
								>
									{category.name}
								</Link>
							</li>
						))}
				</ul>

				{/* Info Links */}
				<ul className={styles.menuPopup_innerContent_infoLinks}>
					{infoLinks.map((category, index) => (
						<li key={index}>
							<Link
								href={category.link}
								onClick={() => document.body.classList.remove("blockScroll")}
							>
								{category.name}
							</Link>
						</li>
					))}
				</ul>

				{/* Contacts */}
				<div className={styles.menuPopup_innerContent_contacts}>
					<div>
						<p>Мы работаем ежедневно</p>
						<p>9:00 - 19:00, без выходных</p>
					</div>
					<Link
						className={styles.menuPopup_innerContent_contacts_phoneNumber}
						href={`tel: ${process.env.MAIN_TEL}`}
						onClick={() => document.body.classList.remove("blockScroll")}
					>
						{process.env.MAIN_TEL}
					</Link>
					<CallBackButton text="Заказать звонок" />
				</div>
			</div>
		</div>
	);
}

export function MenuTrigger({
	isVisible,
	stateDriver,
}: {
	isVisible: boolean;
	stateDriver: () => void;
}) {
	return (
		<button
			onClick={stateDriver}
			className={styles.triggerButton}
			aria-label={isVisible ? "Закрыть меню" : "Открыть меню"}
		>
			<div className={styles.triggerButton_container}>
				{[1, 2, 3].map((num) => (
					<div
						key={num}
						className={
							isVisible ?
								styles.triggerButton_container_item__pressed
							:	styles.triggerButton_container_item
						}
					/>
				))}
			</div>
		</button>
	);
}
