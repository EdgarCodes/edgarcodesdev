export async function json<T, B = unknown> (
    input: RequestInfo | URL,
    options?: Omit<RequestInit, "body"> & {body?: B}
): Promise<T>{
    const {body, headers, ...rest} = options ?? {};
    const res = await fetch(input, {
        ...rest,
        headers: {
            "Content-Type": "application/json",
            ...headers
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    })

    if (!res.ok) {
        const message = await res.text()
        console.log(message)
        throw new Error(message || `Request failed: ${res.status}`)
    }

    try {
        return (await res.json()) as T
    } catch {
        const text = await res.text().catch(() => "")
        throw new Error(
          `Failed to parse JSON response (status ${res.status}. Response body: ${text})`  
        );
    }
}