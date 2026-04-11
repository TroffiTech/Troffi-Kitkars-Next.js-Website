export default function throttle<Args extends unknown[]>(
	fn: (...args: Args) => void,
	delay: number
) {
	let prevExecTime: number | null = null;

	const throttled = (...args: Args) => {
		const curExecTime: number = Date.now();

		if (!prevExecTime || curExecTime - prevExecTime > delay) {
			fn(...args);
			prevExecTime = Date.now();
		} else return;
	};

	return throttled;
}
