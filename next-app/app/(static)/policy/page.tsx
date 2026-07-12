import type { Metadata } from "next";

import PolicyInfo from "@/components/policy/policyInfo/policyInfo";
import PolicyIntro from "@/components/policy/policyIntro/policyIntro";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";

export const metadata: Metadata = {
	title: "Политика конфиденциальности",

	description:
		"Политика конфиденциальности KITKARS.RU. Порядок обработки, хранения и защиты персональных данных пользователей интернет-магазина в соответствии с законодательством РФ.",

	alternates: {
		canonical: "/policy",
	},
};

export default function Policy() {
	return (
		<main>
			<section className="flex-box__column">
				<Header />
				<PolicyIntro />
				<PolicyInfo />
				<Footer />
			</section>
		</main>
	);
}
