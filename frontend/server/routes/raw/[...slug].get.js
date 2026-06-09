// Serves an individual page's Markdown, e.g. /raw/blog/my-post.md
//
// Pulls the pre-generated Markdown (including front matter) from the LLMify
// page endpoint, keyed by the Craft URI. Craft stores the home page under the
// `__home__` URI. LLMify already pre-generates and stores this, so no caching
// is added here; in production you can add a Nitro route rule if desired.
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') || ''
  const uri = slug.replace(/\.md$/, '')

  try {
    const content = await $fetch(`${llmifyApiBase()}/page`, {
      params: { uri },
      responseType: 'text',
    })

    setHeader(event, 'content-type', 'text/markdown; charset=utf-8')
    setHeader(event, 'x-robots-tag', 'noindex, nofollow')

    return content
  } catch (err) {
    throw createError({
      statusCode: err?.response?.status || 404,
      statusMessage: `No Markdown for: ${uri}`,
    })
  }
})
