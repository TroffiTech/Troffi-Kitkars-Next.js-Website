import type { Metadata } from "next";

import OfferInfo from "@/components/offer/offerInfo/offerInfo";
import OfferIntro from "@/components/offer/offerIntro/offerIntro";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";

export const metadata: Metadata = {
	title: "Публичная оферта",

	description:
		"Публичная оферта интернет-магазина KITKARS.RU. Условия оформления заказа, оплаты, доставки, возврата товаров и права покупателей.",

	alternates: {
		canonical: "/offer",
	},
};

export default function Sales() {
	return (
		<main>
			<section className="flex-box__column">
				<Header />
				<OfferIntro />
				<OfferInfo />
				<Footer />
			</section>
		</main>
	);
}
