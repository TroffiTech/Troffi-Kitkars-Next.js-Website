"use client";

import { useState } from "react";
import styles from "./Tabs.module.scss";
import { HitsFeed } from "@/components/catalog/feeds/ProductsFeed";

export default function Tabs() {
	const [tab, setTab] = useState<"Выгодно" | "Новинки">("Новинки");

	return (
		<div className={styles.tabs}>
			<div className={styles.tabs_head}>
				<div
					onClick={() => setTab("Новинки")}
					className={
						tab === "Новинки" ?
							styles.tabs_head_selector_selected
						:	styles.tabs_head_selector
					}
				>
					Новинки
				</div>
			</div>
			<div className={styles.tabs_feed}>
				{tab === "Новинки" && <HitsFeed />}
			</div>
		</div>
	);
}
