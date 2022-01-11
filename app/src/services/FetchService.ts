function capitalise(str: string) {
  return str[0].toUpperCase() + str.slice(1)
}

function camelToHeaderCase(str: string) {
  return capitalise(
    str.replace(/[A-Z]/g, (letter) => `-${capitalise(letter.toLowerCase())}`)
  )
}

type RequestMethod = "GET"

export type ResponseTypes =
  | Record<string, unknown>
  | Record<string, unknown>[]
  | string[]

interface RequestParams<V extends Partial<Record<string, string | number>>> {
  path: string
  method?: RequestMethod
  params?: V
  payload?: Record<string, string> | string
  contentType?: "application/json"
}

interface ParseURLParams {
  path: string
  params?: Partial<Record<string, string>>
}

interface ParseHeadersParams {
  contentType?: "application/json"
}

export class FetchService {
  private baseUrl: string

  constructor(_baseUrl: string) {
    this.baseUrl = _baseUrl
  }

  private stripLeadingSlash(string: string): string {
    return string.startsWith("/") ? string.substring(1, string.length) : string
  }

  private stripTrailingSlash(string: string): string {
    return string.endsWith("/")
      ? string.substring(0, string.length - 1)
      : string
  }

  private parseBody(
    payload?: Record<string, string> | string
  ): string | undefined {
    return payload ? JSON.stringify(payload) : payload
  }

  private parseURL({ path, params }: ParseURLParams) {
    const url = `${this.stripTrailingSlash(
      this.baseUrl
    )}/${this.stripLeadingSlash(path)}`

    if (!params) {
      return url
    }

    const definedParams: string[][] = []
    Object.entries(params).forEach(([k, v]) => v && definedParams.push([k, v]))

    const urlParams = new URLSearchParams(definedParams)
    return `${this.stripTrailingSlash(url)}?${urlParams}`
  }

  private parseHeaders(_headers: ParseHeadersParams): Headers {
    const headers: Headers = new Headers()
    Object.entries(_headers).forEach(([k, v]) => {
      headers.append(camelToHeaderCase(k), v)
    })
    return headers
  }

  async request<
    R extends ResponseTypes = ResponseTypes,
    V extends Partial<Record<string, string>> = Partial<Record<string, string>>
  >({
    path,
    method = "GET",
    params,
    payload,
    contentType = "application/json",
  }: RequestParams<V>): Promise<R | undefined> {
    const requestUrl = this.parseURL({ path, params })
    const body =
      contentType === "application/json"
        ? this.parseBody(payload)
        : (payload as string)
    const headers = this.parseHeaders({ contentType })

    const response = await fetch(requestUrl, {
      method,
      body,
      headers,
    })

    if (response.ok) {
      return await response.json()
    } else {
      return undefined
    }
  }
}
