"use client";

import { useState } from "react";
import styles from "./Tabs.module.scss";
import { HitsFeed } from "@/components/catalog/feeds/productsFeeds";

export default function Tabs() {
	const [tab, setTab] = useState<"Выгодно" | "Новинки">("Новинки");

	return (
		<div className={styles.tabs}>
			<div className={styles.tabs_head}>
				{/* Managers are not ready to sales yet :((  */}
				{/* <div
              onClick={() => setTab("Выгодно")}
              className={
                tab === "Выгодно"
                  ? styles.tabs_head_selector_selected
                  : styles.tabs_head_selector
            }>
            Скидки
            </div> */}
				<div
					onClick={() => setTab("Новинки")}
					className={
						tab === "Новинки" ? styles.tabs_head_selector_selected : styles.tabs_head_selector
					}
				>
					Новинки
				</div>
			</div>
			<div className={styles.tabs_feed}>
				{/* {tab === "Выгодно" && <HeroSaleFeed />} */}
				{tab === "Новинки" && <HitsFeed />}
			</div>
		</div>
	);
}
