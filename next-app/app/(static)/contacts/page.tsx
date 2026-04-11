import ContactsIntro from "@/components/contacts/contacsIntro/contactsIntro";
import ContactsInfo from "@/components/contacts/contactsInfo/contactsInfo";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";

export default async function Contacts() {
    return (
        <main>
            <section className='flex-box__column'>
                <Header />
                <ContactsIntro />
                <ContactsInfo />
                <Footer />
            </section>
        </main>
    );
}
