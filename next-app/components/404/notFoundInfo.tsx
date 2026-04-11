import styles from "./notFoundInfo.module.scss";

export default function NotFoundInfo() {
    return (
        <div className={styles.notFound}>
            <h1>404</h1>
            <p>Страница не найдена</p>
        </div>
    );
}
