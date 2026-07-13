import { serverConfig } from "@/lib/config/server";

export const contactsData = [
	{
		phone: serverConfig.firstManagerTel,
		name: serverConfig.firstManagerName,
		email: serverConfig.firstManagerEmail,
	},
	{
		phone: serverConfig.secondManagerTel,
		name: serverConfig.secondManagerName,
		email: serverConfig.secondManagerEmail,
	},
];
