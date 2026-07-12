import SmallPopupProvider from "@/hooks/smallPopupsProvider";
import ModalDescriptionProvider from "@/hooks/modalDescriptionProvider";
import ReduxStoreProvider from "@/hooks/reduxStoreProvider";
import Header from "@/components/shared/header/Header";
import { ProductsFeed } from "@/components/catalog/feeds/ProductsFeed";
import SideSlideWidget from "@/components/shared/sideSlideWidget/sideSlideWidget";
import Footer from "@/components/shared/footer/Footer";

export default async function Category({
	params,
}: {
	params: Promise<{ slug: string[] }>;
}) {
	const categoriesSlugs = (await params).slug.join(",");

	return (
		<main>
			<section className="flex-box__column">
				<Header />
				<ReduxStoreProvider>
					<SmallPopupProvider>
						<ModalDescriptionProvider>
							<ProductsFeed />
						</ModalDescriptionProvider>
					</SmallPopupProvider>
					<SideSlideWidget />
				</ReduxStoreProvider>
				<Footer />
			</section>
		</main>
	);
}
