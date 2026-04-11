import styles from "./paginator.module.scss";
import { Dispatch, SetStateAction } from "react";

export default function Paginator({
    pagesStateSetter,
    curPage,
    totalPages,
}: {
    pagesStateSetter: Dispatch<SetStateAction<number>>;
    curPage: number;
    totalPages: number;
}) {
    function scrollToTop() {
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }, 100);
    }

    return (
        <div className={styles.paginator}>
            <button
                onClick={() =>
                    pagesStateSetter(() => {
                        scrollToTop();
                        return 1;
                    })
                }>
                {"<<"}
            </button>
            <button
                onClick={() =>
                    pagesStateSetter((prev) => {
                        if (prev === 1) return prev;
                        scrollToTop();
                        return prev - 1;
                    })
                }>
                -
            </button>
            <p>
                <span>{curPage}</span>/{totalPages}
            </p>
            <button
                onClick={() =>
                    pagesStateSetter((prev) => {
                        if (prev === totalPages) return totalPages;
                        scrollToTop();
                        return prev + 1;
                    })
                }>
                +
            </button>
            <button
                onClick={() =>
                    pagesStateSetter(() => {
                        scrollToTop();
                        return totalPages;
                    })
                }>
                {">>"}
            </button>
        </div>
    );
}
