import type { Metadata } from "next";

import DeliveryInfo from "@/components/delivery/deliveryInfo/deliveryInfo";
import DelivryIntro from "@/components/delivery/deliveryIntro/deliveryIntro";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";

export const metadata: Metadata = {
	title: "Доставка",

	description:
		"Доставка внедорожного оборудования и аксессуаров по всей России. Отправка транспортными компаниями, удобные способы получения заказа и консультация по доставке.",

	alternates: {
		canonical: "/delivery",
	},
};

export default function Delivery() {
	return (
		<main>
			<section className="flex-box__column">
				<Header />
				<DelivryIntro />
				<DeliveryInfo />
				<Footer />
			</section>
		</main>
	);
}
