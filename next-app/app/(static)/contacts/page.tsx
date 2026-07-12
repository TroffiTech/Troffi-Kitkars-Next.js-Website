import type { Metadata } from "next";

import ContactsIntro from "@/components/contacts/contacsIntro/contactsIntro";
import ContactsInfo from "@/components/contacts/contactsInfo/contactsInfo";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";

export const metadata: Metadata = {
	title: "Контакты",

	description:
		"Контакты KITKARS.RU. Телефон, адрес, режим работы и способы связи. Поможем подобрать внедорожное оборудование и ответим на любые вопросы.",

	alternates: {
		canonical: "/contacts",
	},
};

export default function Contacts() {
	return (
		<main>
			<section className="flex-box__column">
				<Header />
				<ContactsIntro />
				<ContactsInfo />
				<Footer />
			</section>
		</main>
	);
}
