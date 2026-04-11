import SmallPopupProvider from "@/hooks/smallPopupsProvider";
import ReduxStoreProvider from "@/hooks/reduxStoreProvider";
import Header from "@/components/shared/header/Header";
import { CartFeed } from "@/components/catalog/feeds/productsFeeds";
import CookiePopup from "@/components/shared/popups/cookiePopup/cookiePopup";
import Footer from "@/components/shared/footer/Footer";

export default function Cart() {
    return (
        <main>
            <section className='flex-box__column'>
                <Header />
                <ReduxStoreProvider>
                    <SmallPopupProvider>
                        <CartFeed />
                    </SmallPopupProvider>
                    <CookiePopup />
                </ReduxStoreProvider>
                <Footer />
            </section>
        </main>
    );
}
