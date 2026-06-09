<?php

/**
 * LLMify plugin settings.
 *
 * Headless mode: Craft does not render the front end here (Nuxt does), so
 * LLMify generates Markdown by fetching the front-end URLs (the site's Base
 * URL) instead of relying on Twig rendering.
 */

return [
    'headlessMode' => true,
];
