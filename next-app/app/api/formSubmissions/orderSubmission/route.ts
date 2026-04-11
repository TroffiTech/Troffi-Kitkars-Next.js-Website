import postNewLead from "../bitrixApi/postNewLead";
import { updateLeadProductRows } from "../bitrixApi/updateLeadProductRows";
import generateBitrixLeadFields from "../utils/generateBitrixLeadFields";
import { generateBitrixProductsFields } from "../utils/generateBitrixProductsFields";

export async function POST(req: Request) {
	const { nameValue, telValue, additionalInfoValue, deliveryAddressValue, cart } = await req.json();

	const { bitrixProductRows, totalPrice } = generateBitrixProductsFields(cart);
	const leadFields = generateBitrixLeadFields(
		telValue,
		nameValue,
		additionalInfoValue,
		deliveryAddressValue,
		totalPrice
	);

	const bitrixPostedLeadId = await postNewLead(JSON.stringify(leadFields));

	if (bitrixPostedLeadId)
		updateLeadProductRows(bitrixPostedLeadId, JSON.stringify({ ROWS: bitrixProductRows }));

	return new Response(null, {
		headers: {
			"content-type": "application/json",
		},
		status: 200,
	});
}
