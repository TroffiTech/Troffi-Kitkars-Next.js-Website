import SmallPopupProvider from "@/hooks/smallPopupsProvider";
import ModalDescriptionProvider from "@/hooks/modalDescriptionProvider";
import ReduxStoreProvider from "@/hooks/reduxStoreProvider";
import Header from "@/components/shared/header/Header";
import { CategoryFeed } from "@/components/catalog/feeds/productsFeeds";
import SideSlideWidget from "@/components/shared/sideSlideWidget/sideSlideWidget";
import Footer from "@/components/shared/footer/Footer";

export default async function Category(props: {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const searchParams = await props.searchParams;
	const categoryIds = searchParams?.id as string | undefined;

	return (
		<main>
			<section className="flex-box__column">
				<Header />
				<ReduxStoreProvider>
					<SmallPopupProvider>
						<ModalDescriptionProvider>
							<CategoryFeed filterCategoryIds={categoryIds} />
						</ModalDescriptionProvider>
					</SmallPopupProvider>
					<SideSlideWidget />
				</ReduxStoreProvider>
				<Footer />
			</section>
		</main>
	);
}
