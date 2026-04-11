import SectionRegistrateChanges from "@/components/shared/registrateChanges/sectionRegistrateChanges";
import SideSlideWidget from "@/components/shared/sideSlideWidget/sideSlideWidget";
import CookiePopup from "@/components/shared/popups/cookiePopup/cookiePopup";
import ModalDescriptionProvider from "@/hooks/modalDescriptionProvider";
import HeroArticle from "@/components/main/heroArticle/heroArticle";
import ReduxStoreProvider from "@/hooks/reduxStoreProvider";
import SmallPopupProvider from "@/hooks/smallPopupsProvider";
import Footer from "@/components/shared/footer/Footer";
import Tabs from "@/components/main/tabs/Tabs";
import HeroSection from "@/components/main/heroSection/HeroSection";
import SubcategoriesGrid from "@/components/main/subCategoriesGrid/SubCategoriesGrid";

export default function Home() {
	return (
		<main>
			<section className="flex-box__mainPage">
				<HeroSection />
				<SubcategoriesGrid />
				<SmallPopupProvider>
					<ReduxStoreProvider>
						<ModalDescriptionProvider>
							<Tabs />
						</ModalDescriptionProvider>
						<SideSlideWidget />
						<CookiePopup />
					</ReduxStoreProvider>
					<SectionRegistrateChanges />
				</SmallPopupProvider>
				<HeroArticle />
				<Footer />
			</section>
		</main>
	);
}
