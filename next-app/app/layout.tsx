import { Manrope } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import YandexMetrikaContainer from "@/components/yandexMetrika/yandexMetrika";

const montserratSans = Manrope({
	variable: "--font-montserrat-sans",
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
	title: `${process.env.NEXT_PUBLIC_SITE_NAME}`,
	description: `Запчасти для тюнинга ${process.env.NEXT_PUBLIC_SITE_NAME} в Москве по доступным ценам! Звоните ☎️${process.env.NEXT_PUBLIC_MAIN_TEL}`,
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
					content={`${process.env.NEXT_PUBLIC_SITE_NAME}, тюнинг, троффи, ${process.env.NEXT_PUBLIC_CITY_LOCATION}`}
				/>
			</head>
			<body className={`${montserratSans.className}`}>
				{children}
				{/* <Analytics />
                <SpeedInsights /> */}
				<YandexMetrikaContainer enabled={true} />
			</body>
		</html>
	);
}
