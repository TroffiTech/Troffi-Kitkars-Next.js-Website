import Link from "next/link";
import Image from "next/image";
import styles from "./HeroSection.module.scss";
import Header from "@/components/shared/header/Header";

export default function HeroSection() {
	return (
		<section className={styles.hero}>
			<Header />

			{/* Левая часть - картинка с диагональным срезом */}
			<div className={styles.imageContainer}>
				<Image
					src="/mainImages/tank.webp"
					alt="Тюнинг азиатских внедорожников"
					fill
					className={styles.image}
					priority
					quality={90}
				/>
			</div>

			{/* Правая часть - контент с glassmorphism эффектом */}
			<div className={styles.content}>
				<h1 className={styles.title}>
					Тюнинг
					<span className={styles.accent}>азиатских внедорожников</span>
				</h1>

				<p className={styles.slogan}>
					Доступные решения для японских, китайских и корейских автомобилей от отечественных
					производителей.
				</p>

				<Link href="/catalog" className={styles.button}>
					Смотреть каталог
				</Link>
			</div>
		</section>
	);
}
