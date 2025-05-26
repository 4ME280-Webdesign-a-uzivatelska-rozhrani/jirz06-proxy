export default {
  async fetch(request) {
    const url = new URL(request.url)
    const binId = url.searchParams.get("id") || "683061b78960c979a5a01dba"
    const method = request.method
    const apiKey = JSONBIN_API_KEY // ← bezpečnější přístup přes wrangler secrets

    const endpoint = `https://api.jsonbin.io/v3/b/${binId}`
    const headers = {
      "X-Master-Key": apiKey,
      "Content-Type": "application/json"
    }

    const init = {
      method,
      headers
    }

    if (method !== "GET") {
      init.body = await request.text()
    }

    const response = await fetch(endpoint, init)
    const data = await response.text()

    return new Response(data, {
      status: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    })
  }
}
