import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { stat } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
	try {
		const triggerPath = path.join(process.cwd(), "app/content", ".last-update");

		try {
			const stats = await stat(triggerPath);
			const content = await fs.readFile(triggerPath, "utf8");

			return NextResponse.json({
				lastUpdated: stats.mtime,
				data: JSON.parse(content),
				needsReload: true,
			});
		} catch {
			return NextResponse.json({
				exists: false,
				lastUpdated: null,
				needsReload: false,
			});
		}
	} catch {
		return NextResponse.json({ error: "Failed to check update status" }, { status: 500 });
	}
}
