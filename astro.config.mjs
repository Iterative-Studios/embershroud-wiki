// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import rehypeGlossary from './src/lib/rehype-glossary.mjs';

// Canonical domain. Override via WIKI_SITE in CI for preview deploys.
const SITE = process.env.WIKI_SITE || 'https://wiki.embershroud.com';

// https://astro.build/config
export default defineConfig({
	site: SITE,
	// Glossary tooltips: wrap the first occurrence of known terms in a native <abbr> with a definition.
	markdown: {
		rehypePlugins: [rehypeGlossary],
	},
	integrations: [
		sitemap(),
		starlight({
			title: 'Embershroud Wiki',
			description:
				'The official Embershroud reference wiki - items, skills, monsters, zones, and systems.',
			customCss: ['./src/styles/embershroud.css'],
			// "Edit page" link -> GitHub's web editor. For a logged-in user this is a fork-and-PR
			// flow (with a Preview tab) - no custom editor needed. Generated reference blocks are
			// fenced with AUTO-GENERATED markers and overwritten on regeneration; edit guides + Notes.
			editLink: {
				baseUrl: 'https://github.com/Iterative-Studios/embershroud-wiki/edit/main/',
			},
			components: {
				// Default to dark theme when the visitor has no stored preference.
				ThemeProvider: './src/components/ThemeProvider.astro',
			},
			// Visit metrics are handled entirely by Cloudflare Web Analytics (cookieless, privacy-first,
			// enabled at the Pages project level) - the site ships no custom analytics script.
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
