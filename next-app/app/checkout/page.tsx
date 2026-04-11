import CheckoutSection from "@/components/checkout/checkoutSection";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import ReduxStoreProvider from "@/hooks/reduxStoreProvider";
import SmallPopupProvider from "@/hooks/smallPopupsProvider";

export default function Chekout() {
    return (
        <main>
            <section className='flex-box__column'>
                <Header />
                <ReduxStoreProvider>
                    <SmallPopupProvider>
                        <CheckoutSection />
                    </SmallPopupProvider>
                </ReduxStoreProvider>
                <Footer />
            </section>
        </main>
    );
}
