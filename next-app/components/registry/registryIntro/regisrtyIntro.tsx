import styles from "./registryIntro.module.scss";

export default function RegistryIntro() {
    return (
        <article className={styles.registryIntro}>
            <h1>
                <span>Оформим документы</span> на переоборудование джипов и внедорожников{" "}
                <span>под ключ</span>
            </h1>
        </article>
    );
}
