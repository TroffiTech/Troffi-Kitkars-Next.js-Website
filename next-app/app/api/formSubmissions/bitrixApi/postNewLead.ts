import { serverConfig } from "@/lib/config/server";

export default async function postNewLead(leadData: string) {
	try {
		const res = await fetch(
			`https://troffi.bitrix24.ru/rest/253/${serverConfig.bitixSecret}/crm.lead.add.json/`,
			{
				method: "post",
				headers: {
					"content-type": "application/json",
				},
				body: leadData,
			},
		);
		return +(await res.json()).result;
	} catch (error) {
		console.error(error);
	}
}
