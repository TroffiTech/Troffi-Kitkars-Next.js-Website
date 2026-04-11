import PolicyInfo from "@/components/policy/policyInfo/policyInfo";
import PolicyIntro from "@/components/policy/policyIntro/policyIntro";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";

export default async function Sales() {
    return (
        <main>
            <section className='flex-box__column'>
                <Header />
                <PolicyIntro />
                <PolicyInfo />
                <Footer />
            </section>
        </main>
    );
}
