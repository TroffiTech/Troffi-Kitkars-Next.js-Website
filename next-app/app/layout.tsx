import { Manrope } from "next/font/google";
import { Suspense } from "react";

import { YandexMetrica } from "@/components/yandexMetrika/yandexMetrika";

import "./globals.css";

const manrope = Manrope({
	variable: "--font-manrope",
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	subsets: ["latin", "cyrillic"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body className={manrope.className}>
				<Suspense fallback={null}>
					<YandexMetrica />
				</Suspense>
				{children}
			</body>
		</html>
	);
}
