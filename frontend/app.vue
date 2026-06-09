<script setup>
import { useGraphQL } from '~/composables/useGraphQL'
import { GLOBALS_QUERY } from '~/queries/globals.mjs'

const graphql = useGraphQL()

// Advertise the Markdown version of the current page to LLMs / AI crawlers.
const route = useRoute()
useHead(() => {
  const uri = route.path === '/' ? '__home__' : route.path.replace(/^\/+|\/+$/g, '')
  return {
    link: [
      { rel: 'alternate', type: 'text/markdown', href: `/raw/${uri}.md` },
    ],
  }
})

// Fetch globals data
const { data: globalsData } = await useAsyncData('globals', async () => {
  try {
    const result = await graphql.query(GLOBALS_QUERY)
    return {
      global: result?.globalEntries?.[0] || {},
      pages: result?.pagesEntries || []
    }
  } catch (err) {
    console.error('Error fetching globals:', err)
    throw err
  }
})
</script>

<template>
  <div>
    <Header 
      :globalData="globalsData?.global" 
      :pages="globalsData?.pages"
    />
    <Alert />
    <main class="page min-h-screen" id="main" tabindex="-1">
      <NuxtPage />
    </main>
    <Footer :globalData="globalsData?.global" />
  </div>
</template>
