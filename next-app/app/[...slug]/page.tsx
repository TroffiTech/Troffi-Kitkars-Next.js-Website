import type { Metadata } from "next";

import { ProductsFeed } from "@/components/catalog/feeds/ProductsFeed";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import SideSlideWidget from "@/components/shared/sideSlideWidget/sideSlideWidget";

import ModalDescriptionProvider from "@/hooks/modalDescriptionProvider";
import ReduxStoreProvider from "@/hooks/reduxStoreProvider";
import SmallPopupProvider from "@/hooks/smallPopupsProvider";

import { generateMetadata as createMetadata } from "@/lib/seo/generateMetadata";

type PageProps = {
	params: Promise<{ slug?: string[] }>;
	searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const generateMetadata = (props: PageProps): Promise<Metadata> =>
	createMetadata(props);

export default function CatalogPage() {
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
