import { mapSVG } from "../icons/icons";
import { FormRegisterChangesVariant } from "./formRegisterChanges/FormRegisterChanges";
import styles from "./sectionRegistrateChanges.module.scss";

export default function SectionRegistrateChanges() {
	return (
		<div className={styles.mainContainer}>
			<h2>Профессиональная консультация по переоборудованию ТС</h2>
			<p>
				Лаборатория «Тест-Драйв» осуществляет регистрацию изменений конструкции автомобиля под ключ.
				Благодаря опыту и квалификации специалистов производится быстрое оформление самых сложных
				трансформаций и тюнинга транспортных средств.
			</p>

			<div className={styles.formWrapper}>
				<FormRegisterChangesVariant />
			</div>

			<div className={styles.mapContainer}>{mapSVG}</div>
		</div>
	);
}
