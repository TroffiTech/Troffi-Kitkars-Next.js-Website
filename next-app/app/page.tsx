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
import { Metadata } from "next";
import { serverConfig } from "@/lib/config/server";
import { clientConfig } from "@/lib/config/client";

export const metadata: Metadata = {
	metadataBase: new URL(clientConfig.siteUrl!),

	title: {
		default: serverConfig.siteName ?? "KITKARS.RU — внедорожное оборудование",
		template: `%s | ${serverConfig.siteName ?? "KITKARS.RU"}`,
	},

	description:
		"Внедорожное оборудование и аксессуары для азиатских автомобилей. Большой выбор силовых бамперов, багажников, защит, лебедок и аксессуаров.",

	alternates: {
		canonical: "/",
	},

	robots: {
		index: true,
		follow: true,
	},

	openGraph: {
		type: "website",
		locale: "ru_RU",
		siteName: serverConfig.siteName,
		title: serverConfig.siteName,
		description:
			"Внедорожное оборудование и аксессуары для азиатских автомобилей.",
	},

	twitter: {
		card: "summary_large_image",
		title: serverConfig.siteName,
		description:
			"Внедорожное оборудование и аксессуары для азиатских автомобилей.",
	},
};

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
