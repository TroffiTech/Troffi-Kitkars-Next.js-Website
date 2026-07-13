import Link from "next/link";
import styles from "./MenuPopup.module.scss";
import CallBackButton from "@/components/shared/ctaButtons/ctaButtons";
import { serverConfig } from "@/lib/config/server";

export default function MenuContacts() {
	return (
		<div className={styles.menuPopup_innerContent_contacts}>
			<div>
				<p>Мы работаем ежедневно</p>
				<p>9:00 - 19:00, без выходных</p>
			</div>
			<Link
				className={styles.menuPopup_innerContent_contacts_phoneNumber}
				href={`tel: ${serverConfig.mainTel}`}
				onClick={() => document.body.classList.remove("blockScroll")}
			>
				{serverConfig.mainTel}
			</Link>
			<CallBackButton text="Заказать звонок" />
		</div>
	);
}
