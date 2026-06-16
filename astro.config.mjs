// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

// Canonical domain. Override via WIKI_SITE in CI for preview deploys.
const SITE = process.env.WIKI_SITE || 'https://wiki.embershroud.com';

// https://astro.build/config
export default defineConfig({
	site: SITE,
	integrations: [
		sitemap(),
		starlight({
			title: 'Embershroud Wiki',
			description:
				'The official Embershroud reference wiki - items, skills, monsters, zones, and systems.',
			customCss: ['./src/styles/embershroud.css'],
			components: {
				// Default to dark theme when the visitor has no stored preference.
				ThemeProvider: './src/components/ThemeProvider.astro',
			},
			// Search-event beacon. The script is a no-op unless WIKI_BEACON_URL is set,
			// which injects the meta the client reads. Page views are handled by Cloudflare Web Analytics.
			head: [
				{ tag: 'script', attrs: { src: '/search-beacon.js', defer: true } },
				...(process.env.WIKI_BEACON_URL
					? [{ tag: 'meta', attrs: { name: 'wiki:beacon', content: process.env.WIKI_BEACON_URL } }]
					: []),
			],
			// Reference pages are auto-generated from canonical game data; guides are hand-authored.
			sidebar: [
				{ label: 'Embershroud (game site)', link: 'https://embershroud.com' },
				{ label: 'Contribute to the wiki', link: '/contribute/' },
				{ label: 'Systems', items: [{ autogenerate: { directory: 'systems' } }] },
				{ label: 'Skills', items: [{ autogenerate: { directory: 'skills' } }] },
				{ label: 'Items', items: [{ autogenerate: { directory: 'items' } }] },
				{ label: 'Monsters', items: [{ autogenerate: { directory: 'monsters' } }] },
				{ label: 'Zones', items: [{ autogenerate: { directory: 'zones' } }] },
				{ label: 'NPCs', items: [{ autogenerate: { directory: 'npcs' } }] },
			],
		}),
	],
});
