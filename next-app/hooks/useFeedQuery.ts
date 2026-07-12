import { usePathname, useSearchParams } from "next/navigation";
import { parseRoute } from "@/lib/routeParser";
import { useMemo } from "react";

export function useFeedQuery() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	return useMemo(
		() => parseRoute(pathname, new URLSearchParams(searchParams.toString())),
		[pathname, searchParams],
	);
}
