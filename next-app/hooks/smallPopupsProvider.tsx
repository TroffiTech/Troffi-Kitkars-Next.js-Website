"use client";

import DynamicPopup from "@/components/shared/popups/dynamicPopup/dynamicPopup";
import { createContext, Dispatch, SetStateAction, useState } from "react";

const initialContext: {
    isVisible: boolean;
    setIsVisible: Dispatch<SetStateAction<boolean>> | undefined;
    popupText: string;
    setPopupText: Dispatch<SetStateAction<string>> | undefined;
} = {
    isVisible: false,
    setIsVisible: undefined,
    popupText: "",
    setPopupText: undefined,
};

export const SmallPopupContext = createContext(initialContext);

export default function SmallPopupProvider({ children }: { children: React.ReactNode }) {
    const [isVisible, setIsVisible] = useState(false);
    const [popupText, setPopupText] = useState("");

    return (
        <SmallPopupContext.Provider value={{ isVisible, setIsVisible, popupText, setPopupText }}>
            {children}
            <DynamicPopup />
        </SmallPopupContext.Provider>
    );
}
