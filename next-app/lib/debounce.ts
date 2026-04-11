export default function debounce<Args extends unknown[]>(
	fn: (...args: Args) => void,
	delay: number
): {
	(...args: Args): void;
} {
	let timeoutId: NodeJS.Timeout;

	const debounced = (...args: Args) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(...args), delay);
	};

	return debounced;
}
