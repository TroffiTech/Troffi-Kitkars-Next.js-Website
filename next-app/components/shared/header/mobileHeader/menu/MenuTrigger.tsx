import styles from "./MenuPopup.module.scss";

export default function MenuTrigger({
	isOpen,
	onToggle,
}: {
	isOpen: boolean;
	onToggle: () => void;
}) {
	const LINES = [0, 1, 2];
	return (
		<button
			onClick={onToggle}
			className={styles.triggerButton}
			aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
		>
			<div className={styles.triggerButton_container}>
				{LINES.map((line) => (
					<div
						key={line}
						className={
							isOpen ?
								styles.triggerButton_container_item__pressed
							:	styles.triggerButton_container_item
						}
					/>
				))}
			</div>
		</button>
	);
}
