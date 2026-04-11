import styles from "./contactsInfo.module.scss";
import { contactsData } from "@/components/contactsData";

export default function ContactsInfo() {
	return (
		<article className={styles.contactsInfo}>
			<h2>Менеджеры сайта:</h2>
			{contactsData.map((contactData, index) => (
				<ul key={index}>
					<p>{contactData.name}</p>
					<a href={`tel:${contactData.phone}`}>{contactData.phone}</a>
					<a href={`mailto:${contactData.email}`}>{contactData.email}</a>
				</ul>
			))}
			<h2>Адрес:</h2>
			<p>{process.env.NEXT_PUBLIC_ADDRESS}</p>

			<h2>Реквизиты компании ООО «ВИП»</h2>
			<p>
				ИНН 1840100161 / КПП 184101001 <br />
				ОГРН 1201800019871 / ОКПО 46150294
			</p>
			<h2>Банковские реквизиты:</h2>
			<p>
				р/с 40702810970010243485 в АО КБ “МОДУЛЬБАНК” <br />
				к/с 30101810645250000092 <br />
				БИК 044525092
			</p>
		</article>
	);
}
