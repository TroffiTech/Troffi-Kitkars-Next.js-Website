"use client";

import Link from "next/link";
import styles from "./cookiePopup.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setIsMember } from "@/store/client/clientSlice";

export default function CookiePopup() {
    const dispatch = useDispatch();
    const isMember = useSelector((state: RootState) => state.client.value.isMember);

    if (isMember) return;
    else
        return (
            <div className={styles.cookiePopup}>
                <div
                    style={{
                        background: "transparent",
                    }}>
                    <p>
                        <span>Этот сайт испульзует куки</span>
                    </p>
                    <p>
                        Ознакомтесь с{" "}
                        <Link className={styles.link} href='/'>
                            Политикой конфиденциальности
                        </Link>
                    </p>
                </div>
                <button
                    onClick={() => {
                        dispatch(setIsMember(true));
                    }}>
                    Понятно
                </button>
            </div>
        );
}
