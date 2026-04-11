import DeliveryInfo from "@/components/delivery/deliveryInfo/deliveryInfo";
import DelivryIntro from "@/components/delivery/deliveryIntro/deliveryIntro";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";

export default async function Delivery() {
    return (
        <main>
            <section className='flex-box__column'>
                <Header />
                <DelivryIntro />
                <DeliveryInfo />
                <Footer />
            </section>
        </main>
    );
}
