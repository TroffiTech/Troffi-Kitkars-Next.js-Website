"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./sideSlideWidget.module.scss";
import { dotsSVG } from "../icons/icons";
import CartButton from "./cartButton/cartButton";
import { RootState } from "@/store/store";

export default function SideSlideWidget() {
	const count = useSelector((state: RootState) => state.cart.value.length);
	const [isExpanded, setIsExpanded] = useState(false);

	useEffect(() => {
		if (count === 1) setIsExpanded(true);
	}, [count]);

	return (
		<nav
			style={{
				right: isExpanded ? "0" : "-60px",
			}}
			className={styles.sideSlide}
		>
			{!isExpanded && count !== 0 && <div className={styles.cartIndicator} />}
			<div onClick={() => setIsExpanded((prev) => !prev)} className={styles.arrow}>
				{dotsSVG}
			</div>
			<CartButton count={count} />
		</nav>
	);
}
