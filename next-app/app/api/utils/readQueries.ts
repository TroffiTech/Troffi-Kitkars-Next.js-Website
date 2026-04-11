export function getQueries(url: string) {
    const queriesObj: { [key: string]: string } = {};

    const queriesArr = url.split("?")[1].split("&");
    queriesArr.map((query) => {
        const queryName = query.split("=")[0];
        const queryValue = query.split("=")[1];

        queriesObj[queryName] = queryValue;
    });

    return queriesObj;
}
