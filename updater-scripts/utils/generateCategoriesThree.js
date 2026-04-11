export default function generateCategoriesThree(allLoadedCategoriesData) {
    console.info("generating categories three object");
    const categoriesList = [];

    allLoadedCategoriesData.map((category) => {
        categoriesList.push({
            name: category.name,
            slug: category.slug,
            id: category.id,
            parent: category.parent,
            count: category.count,
        });
    });

    const categoriesThree = [];

    categoriesList.map((category) => {
        if (category.parent === 0 && category.count !== 0)
            categoriesThree.push({ ...category, childrens: [] });
    });

    categoriesList.map((categoryInList) => {
        categoriesThree.map((categoryInThree, index) => {
            if (categoryInThree.id === categoryInList.parent && categoryInList.count !== 0)
                categoriesThree[index].childrens?.push(categoryInList);
        });
    });

    console.info("categories three are builded");
    return categoriesThree;
}
