"use client";

import React, { useCallback, useEffect } from "react";
import ym, { YMInitializer } from "react-yandex-metrika";
import Router from "next/router";

const counterID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_COUNTER_ID;

type Props = {
	enabled: boolean;
};

const YandexMetrikaContainer: React.FC<Props> = ({ enabled }) => {
	const hit = useCallback(
		(url: string) => {
			if (!enabled || typeof window === "undefined") {
				console.log(`%c[YandexMetrika](HIT)`, `color: orange`, url);
				return;
			}

			if (typeof ym !== "function" || !counterID) {
				console.warn("Yandex.Metrika not initialized or counterID missing");
				return;
			}
			ym(counterID, "hit", url);
		},
		[enabled]
	);

	useEffect(() => {
		if (!counterID || !enabled) return;

		const handleRouteChange = (url: string) => hit(url);

		hit(window.location.pathname + window.location.search);

		Router.events.on("routeChangeComplete", handleRouteChange);

		return () => {
			Router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [hit, enabled]);

	if (!counterID || !enabled) return null;

	return (
		<YMInitializer
			accounts={[Number(counterID)]}
			options={{
				defer: false,
				webvisor: true,
				clickmap: true,
				trackLinks: true,
				accurateTrackBounce: true,
			}}
			version="2"
		/>
	);
};

export default YandexMetrikaContainer;
