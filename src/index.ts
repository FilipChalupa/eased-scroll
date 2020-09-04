export type SmoothScrollPositionInterpolate = (targetValue: number) => number
export type SmoothScrollPositionCallback = (y: number) => void

export function smoothScrollPosition(
	interpolate: SmoothScrollPositionInterpolate
) {
	let listeners: SmoothScrollPositionCallback[] = []
	let value: number = 0
	let valueTarget: number = 0
	let isLoopRunning = false

	const getValue = () => value

	const onScroll = () => {
		valueTarget = window.scrollY

		if (!isLoopRunning) {
			isLoopRunning = true
			loop()
		}
	}

	const onResize = () => onScroll()

	const postValue = () => {
		listeners.forEach((listener) => {
			listener(value)
		})
	}

	const loop = () => {
		value = interpolate(valueTarget)

		if (Math.abs(value - valueTarget) < 0.1) {
			isLoopRunning = false
			value = valueTarget
		}

		postValue()

		if (isLoopRunning) {
			requestAnimationFrame(loop)
		}
	}

	const addListener = (callback: SmoothScrollPositionCallback) => {
		listeners.push(callback)

		if (listeners.length === 1) {
			window.addEventListener('scroll', onScroll)
			window.addEventListener('resize', onResize)
		}
	}

	const removeListener = (callback: SmoothScrollPositionCallback) => {
		listeners = listeners.filter((listener) => listener !== callback)

		if (listeners.length === 0) {
			window.removeEventListener('scroll', onScroll)
			window.removeEventListener('resize', onResize)
		}
	}

	return {
		addListener,
		removeListener,
		getValue,
	}
}

// Inspired by: https://github.com/Popmotion/popmotion/blob/master/packages/popcorn/src/utils/smooth.ts

const toDecimal = (input: number, precision: number = 2) => {
	precision = Math.pow(10, precision)
	return Math.round(input * precision) / precision
}

const smooth = (
	previousValue: number,
	targetValue: number,
	duration: number,
	smoothing: number
) => {
	return toDecimal(
		previousValue +
			(duration * (targetValue - previousValue)) / Math.max(smoothing, duration)
	)
}

const getTimestamp = () => Date.now()

// @TODO: possible performance boost: reports too small changes way too often on page load

export function easedScroll(smoothing: number) {
	let previousValue = 0
	let lastUpdated = 0

	return smoothScrollPosition((targetValue) => {
		const currentTimestamp = getTimestamp()
		const timeDelta =
			currentTimestamp !== lastUpdated ? currentTimestamp - lastUpdated : 0
		const newValue = timeDelta
			? smooth(previousValue, targetValue, timeDelta, smoothing)
			: previousValue
		lastUpdated = currentTimestamp
		previousValue = newValue
		return newValue
	})
}
