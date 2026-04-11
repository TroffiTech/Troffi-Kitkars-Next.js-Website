import NotFoundInfo from "@/components/404/notFoundInfo";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";

export default function NotFoundPage() {
    return (
        <main>
            <section className='flex-box__column'>
                <Header />
                <NotFoundInfo />
                <Footer />
            </section>
        </main>
    );
}
