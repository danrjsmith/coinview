import { useEffect, useState } from "react"
import { storage } from "../utils/localStorage"

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T | undefined, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(defaultValue)

  useEffect(() => {
    const item = storage.getItem<T>(key)
    if (item) {
      setValue(item)
    }
  }, [])

  useEffect(() => {
    storage.setItem<T>(key)(value)
  }, [JSON.stringify(value)])

  return [value, setValue]
}
