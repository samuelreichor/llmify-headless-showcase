// Shared helpers for the LLMify headless integration.
//
// Craft (the LLMify plugin) generates the Markdown by fetching this front end.
// These server routes pull that generated content back out of Craft and serve
// it under the front-end domain, so `https://<site>/llms.txt` and
// `https://<site>/raw/<uri>.md` resolve here instead of on the Craft domain.

/**
 * Base URL of the LLMify API on the Craft backend.
 */
export function llmifyApiBase() {
  const { public: config } = useRuntimeConfig()

  if (!config.CRAFT_URL) {
    throw createError({ statusCode: 500, statusMessage: 'CRAFT_URL is not configured' })
  }

  return `${config.CRAFT_URL.replace(/\/$/, '')}/actions/llmify/api`
}

/**
 * Auth header for the LLMify API. Returns the `X-Llmify-Token` header when an
 * API token is configured, otherwise an empty object (the API is unprotected).
 */
export function llmifyHeaders() {
  const token = useRuntimeConfig().LLMIFY_API_TOKEN

  return token ? { 'X-Llmify-Token': token } : {}
}
