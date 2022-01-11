function setItem<T>(key: string) {
  return function (value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

function getItem<T>(key: string): T | undefined {
  const value = localStorage.getItem(key)
  if (value !== undefined && value !== null) {
    return JSON.parse(value) as T
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
