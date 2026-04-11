import Image from "next/image";
import styles from "./benefits.module.scss";

export default function Benefits() {
	return (
		<article className={styles.benefits}>
			<ul className={styles.points}>
				<li>
					<Image
						className={styles.image}
						src={"/registry/deal.png"}
						width={126}
						height={126}
						alt="drawed deal"
					/>
					<h3>
						Договор <br />
						<span>со 100% гарантией</span>
						<br />
						результата
					</h3>
				</li>
				<li>
					<Image
						className={styles.image}
						src={"/registry/handshake.png"}
						width={126}
						height={126}
						alt="drawed handhsake"
					/>
					<h3>
						Заявление на переоборудование
						<br />
						<span>за 1 день</span>
					</h3>
				</li>
				<li>
					<Image
						className={styles.image}
						src={"/registry/laboratory.png"}
						width={126}
						height={126}
						alt="drawed lab"
					/>
					<h3>
						Регистрируем <br />
						<span>«под ключ»</span>
					</h3>
				</li>
				<li>
					<Image
						className={styles.image}
						src={"/registry/papers.png"}
						width={126}
						height={126}
						alt="drawed papers"
					/>
					<h3>
						Лаборатория
						<br />
						<span>с гос.аккредитацией</span>
					</h3>
				</li>
			</ul>
			<div className={styles.title}>
				<h1>
					Уже внесли изменения в авто и нужно срочно их зарегистрировать?
					<br />
					<span>Мы сможем помочь!</span>
				</h1>
			</div>
		</article>
	);
}
