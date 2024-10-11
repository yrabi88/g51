export function buildResponse(data: unknown, status = 200, headers?: HeadersInit) {
    return Response.json(data, { status, headers })
}
