export async function handleRequest(request: Request): Promise<Response> {
  return new Response(`Request method: ${request.method}`);
}
