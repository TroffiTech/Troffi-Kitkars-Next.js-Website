import styles from "./tarrifs.module.scss";

export default function TarrifsCards() {
	return (
		<article className={styles.tarrifsCards}>
			<h2>
				<span>Сколько стоит</span> оформить переоборудование джипа
			</h2>
			<ul className={styles.cards}>
				<div className={styles.card}>
					<h3>Минимальный пакет</h3>
					<div className={styles.price}>до 26900 руб.</div>
					<div className={styles.description}>
						Подойдет для самостоятельной регистрации несложных переоборудований в ГИБДД
					</div>
					<div className={styles.tarrifInfo}>
						<p>Включает в себя пакет документов от аккредитованной лаборатории:</p>
						<ul>
							<li>Заключение</li>
							<li> Протокол</li>
						</ul>
					</div>
				</div>

				<div className={styles.card}>
					<h3>Полный пакет</h3>
					<div className={styles.price}>до 49000 руб.</div>
					<div className={styles.description}>
						Самый популярный и удобный формат сотрудничества. Вам останется только посетить ГИБДД
					</div>
					<div className={styles.tarrifInfo}>
						<p>Включает в себя пакет документов от аккредитованной лаборатории и СТО:</p>
						<ul>
							<li>Заключение</li>
							<li> Протокол</li>
							<li> Заявление-декларация</li>
							<li> Сертификаты</li>
							<li> Заявления в ГИБДД</li>
						</ul>
					</div>
				</div>

				<div className={styles.card}>
					<h3>
						Тариф <br />
						«ПОД КЛЮЧ»
					</h3>
					<div className={styles.price}>от 49000 руб.</div>
					<div className={styles.description}>
						Максимально комфортный тариф, минимум вашего времени и участия.
					</div>
					<div className={styles.tarrifInfo}>
						<p>Включает в себя все необходимые документы из полного тарифа</p>
						<ul>
							<li> Оплату гос. пошлин</li>
							<li> Посещения всех инстанций за вас</li>
						</ul>
					</div>
				</div>
			</ul>
		</article>
	);
}
