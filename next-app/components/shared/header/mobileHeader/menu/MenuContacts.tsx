import Link from "next/link";
import styles from "./MenuPopup.module.scss";
import CallBackButton from "@/components/shared/ctaButtons/ctaButtons";

export default function MenuContacts() {
	return (
		<div className={styles.menuPopup_innerContent_contacts}>
			<div>
				<p>Мы работаем ежедневно</p>
				<p>9:00 - 19:00, без выходных</p>
			</div>
			<Link
				className={styles.menuPopup_innerContent_contacts_phoneNumber}
				href={`tel: ${process.env.MAIN_TEL}`}
				onClick={() => document.body.classList.remove("blockScroll")}
			>
				{process.env.MAIN_TEL}
			</Link>
			<CallBackButton text="Заказать звонок" />
		</div>
	);
}
