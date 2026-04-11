import SmallPopupProvider from "@/hooks/smallPopupsProvider";
import ModalDescriptionProvider from "@/hooks/modalDescriptionProvider";
import ReduxStoreProvider from "@/hooks/reduxStoreProvider";
import Header from "@/components/shared/header/Header";
import { DefaultFeed } from "@/components/catalog/feeds/productsFeeds";
import SideSlideWidget from "@/components/shared/sideSlideWidget/sideSlideWidget";
import Footer from "@/components/shared/footer/Footer";

export default function Catalog() {
    return (
        <main>
            <section className='flex-box__column'>
                <Header />
                <ReduxStoreProvider>
                    <SmallPopupProvider>
                        <ModalDescriptionProvider>
                            <DefaultFeed />
                        </ModalDescriptionProvider>
                    </SmallPopupProvider>
                    <SideSlideWidget />
                </ReduxStoreProvider>
                <Footer />
            </section>
        </main>
    );
}
