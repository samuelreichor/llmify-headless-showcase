// Serves /llms.txt from the front-end domain by pulling it from the LLMify API.
export default defineEventHandler(async (event) => {
  try {
    const content = await $fetch(`${llmifyApiBase()}/llms-txt`, {
      responseType: 'text',
    })

    setHeader(event, 'content-type', 'text/markdown; charset=utf-8')
    setHeader(event, 'x-robots-tag', 'noindex, nofollow')

    return content
  } catch (err) {
    throw createError({
      statusCode: err?.response?.status || 502,
      statusMessage: 'Could not load llms.txt from Craft',
    })
  }
})
