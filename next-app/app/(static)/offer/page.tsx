import OfferInfo from "@/components/offer/offerInfo/offerInfo";
import OfferIntro from "@/components/offer/offerIntro/offerIntro";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";

export default async function Sales() {
    return (
        <main>
            <section className='flex-box__column'>
                <Header />
                <OfferIntro />
                <OfferInfo />
                <Footer />
            </section>
        </main>
    );
}
