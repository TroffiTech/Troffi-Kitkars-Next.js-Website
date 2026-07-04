import { YandexMetrica } from "@/components/yandexMetrika/yandexMetrika";
import { Manrope } from "next/font/google";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

const montserratSans = Manrope({
	variable: "--font-montserrat-sans",
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
	title: `${process.env.SITE_NAME || "Запчасти для азиатских автомобилей"}`,
	description: `Отечесвенные запчасти для тюнинга азиатских внедорожников по доступным ценам! Звоните ☎️${process.env.MAIN_TEL || "+7 (922) 520-77-71"}`,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=0.8" />
				<meta name="robots" content="all" />
				<meta
					name="keywords"
					content={`${process.env.SITE_NAME}, тюнинг, троффи, ${process.env.CITY_LOCATION || "Ижевск"}`}
				/>
			</head>
			<body className={`${montserratSans.className}`}>
				<Suspense fallback={null}>
					<YandexMetrica />
				</Suspense>
				{children}
			</body>
		</html>
	);
}
