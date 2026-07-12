import Link from "next/link";
import { infoLinks } from "../categoriesList";
import Logo from "../logo/Logo";
import CallBackButton from "../../ctaButtons/ctaButtons";
import styles from "./DesctopHeader.module.scss";

export default function TopBar() {
	return (
		<nav className={styles.header_topInner}>
			<Logo />
			<ul className={styles.header_infoLinks}>
				{infoLinks.map((infoLink, index) => (
					<li key={infoLink.link}>
						<Link href={infoLink.link}>{infoLink.name}</Link>
					</li>
				))}
			</ul>
			<div className={styles.header_topInner_contacts}>
				<div>
					<p>Мы работаем ежедневно</p>
					<p>9:00 - 19:00, без выходных</p>
				</div>
			</div>
			<CallBackButton text="Заказать звонок" />
		</nav>
	);
}
