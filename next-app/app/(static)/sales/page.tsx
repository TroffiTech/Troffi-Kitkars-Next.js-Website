import { SalesFeed } from "@/components/catalog/feeds/productsFeeds";
import SalesInfo from "@/components/sales/salesInfo/salesInfo";
import SalesIntro from "@/components/sales/salesIntro/salesIntro";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import SideSlideWidget from "@/components/shared/sideSlideWidget/sideSlideWidget";
import ModalDescriptionProvider from "@/hooks/modalDescriptionProvider";
import ReduxStoreProvider from "@/hooks/reduxStoreProvider";
import SmallPopupProvider from "@/hooks/smallPopupsProvider";
import { redirect } from "next/navigation";

export default async function Sales() {
    // Managers are not ready to use sales yet :((
    redirect("/not-found");
    return (
        <main>
            <section className='flex-box__column'>
                <Header />
                <SalesIntro />
                <ReduxStoreProvider>
                    <SmallPopupProvider>
                        <ModalDescriptionProvider>
                            <SalesFeed />
                        </ModalDescriptionProvider>
                        <SideSlideWidget />
                    </SmallPopupProvider>
                </ReduxStoreProvider>
                <SalesInfo />
                <Footer />
            </section>
        </main>
    );
}
