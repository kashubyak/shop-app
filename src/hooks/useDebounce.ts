import { useEffect, useState } from 'react'

/**
 * Hook for debouncing a value
 * @param value - value to debounce
 * @param delay - delay in milliseconds (default 300ms)
 * @returns debounced value
 */
export const useDebounce = <T,>(value: T, delay: number = 300): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => {
			clearTimeout(handler)
		}
	}, [value, delay])

	return debouncedValue
}

