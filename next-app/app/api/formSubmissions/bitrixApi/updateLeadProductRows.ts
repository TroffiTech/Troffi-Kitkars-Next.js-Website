export const updateLeadProductRows = async (id: number, productRows: string) => {
	try {
		const res = await fetch(
			`https://troffi.bitrix24.ru/rest/253/${process.env.BITRIX_KEY}/crm.lead.productrows.set/?id=${id}`,
			{
				method: "post",
				headers: {
					"content-type": "application/json",
				},
				body: productRows,
			}
		);
		return res.json();
	} catch (error) {
		console.error(error);
	}
};
