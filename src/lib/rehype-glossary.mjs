// Rehype plugin: wrap the first occurrence of each known glossary term on a page in a native
// <abbr title="..."> so it shows a hover definition. Zero client JS, accessible by default.
// Terms come from src/data/glossary.json (designer-maintained). Skips code, links, headings, etc.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const glossary = JSON.parse(readFileSync(path.join(here, '..', 'data', 'glossary.json'), 'utf8'));

// Longest terms first so multi-word terms win over their substrings.
const TERMS = Object.entries(glossary)
	.filter(([k]) => !k.startsWith('_'))
	.sort((a, b) => b[0].length - a[0].length);

const SKIP_TAGS = new Set(['a', 'code', 'pre', 'kbd', 'abbr', 'script', 'style', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export default function rehypeGlossary() {
	if (TERMS.length === 0) return () => {};
	const matchers = TERMS.map(([term, def]) => ({ term, def, re: new RegExp(`\\b${escapeRe(term)}\\b`, 'i') }));

	return (tree) => {
		const used = new Set();
		walk(tree, false);

		function walk(node, inSkip) {
			const children = node.children;
			if (!children) return;
			for (let i = 0; i < children.length; i++) {
				const c = children[i];
				if (c.type === 'element') {
					walk(c, inSkip || SKIP_TAGS.has(c.tagName));
				} else if (c.type === 'text' && !inSkip) {
					for (const { term, def, re } of matchers) {
						if (used.has(term)) continue;
						const m = re.exec(c.value);
						if (!m) continue;
						used.add(term);
						const idx = m.index;
						const before = c.value.slice(0, idx);
						const matched = c.value.slice(idx, idx + term.length);
						const after = c.value.slice(idx + term.length);
						const repl = [];
						if (before) repl.push({ type: 'text', value: before });
						repl.push({
							type: 'element',
							tagName: 'abbr',
							properties: { className: ['glossary-term'], title: def },
							children: [{ type: 'text', value: matched }],
						});
						if (after) repl.push({ type: 'text', value: after });
						children.splice(i, 1, ...repl);
						i += repl.length - 1;
						break;
					}
				}
			}
		}
	};
}
