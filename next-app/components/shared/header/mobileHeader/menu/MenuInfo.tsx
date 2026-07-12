import Link from "next/link";
import { infoLinks } from "../../categoriesList";
import styles from "./MenuPopup.module.scss";

export default function MenuInfo() {
	return (
		<ul className={styles.menuPopup_innerContent_infoLinks}>
			{infoLinks.map((category, index) => (
				<li key={index}>
					<Link
						href={category.link}
						onClick={() => document.body.classList.remove("blockScroll")}
					>
						{category.name}
					</Link>
				</li>
			))}
		</ul>
	);
}
