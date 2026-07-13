"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { clientConfig } from "@/lib/config/client";

declare global {
	interface Window {
		ym: (counterId: number, action: string, ...args: any[]) => void;
	}
}

export function YandexMetrica() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		const counterId = Number(clientConfig.metrikaId);

		if (!counterId) return;

		const script = document.createElement("script");
		script.innerHTML = `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
      ym(${counterId}, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
      });
    `;
		document.head.appendChild(script);

		const noscript = document.createElement("noscript");
		noscript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${counterId}" style="position:absolute; left:-9999px;" alt="" /></div>`;
		document.body.appendChild(noscript);

		return () => {
			document.head.removeChild(script);
			document.body.removeChild(noscript);
		};
	}, []);

	useEffect(() => {
		const counterId = Number(clientConfig.metrikaId);
		if (!counterId || !window.ym) return;

		const url =
			pathname +
			(searchParams?.toString() ? `?${searchParams.toString()}` : "");
		window.ym(counterId, "hit", url);
	}, [pathname, searchParams]);

	return null;
}
