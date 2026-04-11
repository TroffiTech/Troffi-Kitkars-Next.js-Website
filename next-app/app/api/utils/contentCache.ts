import { stat } from "fs/promises";
import path from "path";

const CACHE_DURATION =
	process.env.CACHE_DURATION ? parseInt(process.env.CACHE_DURATION) : 2 * 60 * 60 * 1000; // 2 часа по умолчанию

interface CacheEntry<T> {
	data: T;
	timestamp: number;
	fileMtime: number;
}

// Используем дженерик для Map
const cache = new Map<string, CacheEntry<unknown>>();

export async function getCachedOrRead<T>(filePath: string, readFn: () => Promise<T>): Promise<T> {
	const now = Date.now();
	const cacheKey = filePath;

	try {
		const stats = await stat(filePath);
		const fileMtime = stats.mtimeMs;

		const cached = cache.get(cacheKey) as CacheEntry<T> | undefined;

		if (cached) {
			const isExpired = now - cached.timestamp > CACHE_DURATION;
			const isFileChanged = fileMtime > cached.fileMtime;

			if (!isExpired && !isFileChanged) {
				console.log(`✅ Cache hit for ${path.basename(filePath)}`);
				return cached.data;
			}

			console.log(`🔄 Cache invalidated for ${path.basename(filePath)}`);
		}

		console.log(`📥 Reading ${path.basename(filePath)} from disk...`);
		const data = await readFn();

		cache.set(cacheKey, {
			data,
			timestamp: now,
			fileMtime,
		});

		return data;
	} catch (error) {
		console.error(`❌ Error accessing ${filePath}:`, error);
		throw error;
	}
}

// Перегрузка функции clearCache для типизации
export function clearCache(): void;
export function clearCache(fileKey: string): void;
export function clearCache(fileKey?: string): void {
	if (fileKey) {
		cache.delete(fileKey);
		console.log(`🧹 Cache cleared for ${fileKey}`);
	} else {
		cache.clear();
		console.log("🧹 All cache cleared");
	}
}

// Дополнительная утилита для получения информации о кэше
export function getCacheStats(): {
	entries: number;
	totalFiles: number;
	cacheDuration: number;
} {
	return {
		entries: cache.size,
		totalFiles: cache.size,
		cacheDuration: CACHE_DURATION,
	};
}

// Утилита для проверки существования записи в кэше
export function hasCacheEntry(fileKey: string): boolean {
	return cache.has(fileKey);
}

// Утилита для получения времени последнего обновления кэша
export function getCacheEntryTimestamp(fileKey: string): number | null {
	const entry = cache.get(fileKey);
	return entry ? entry.timestamp : null;
}
