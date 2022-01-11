function setItem<T>(key: string) {
  return function (value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

function getItem<T>(key: string): T | undefined {
  const value = localStorage.getItem(key)
  if (value !== undefined && value !== null) {
    try {
      return JSON.parse(value) as T
    } catch {
      console.warn("Unable to parse data from [" + key + "].")
      return undefined
    }
  }
  return undefined
}

function deleteItem(key: string): void {
  localStorage.removeItem(key)
}

export const storage = {
  setItem,
  getItem,
  deleteItem,
}
