import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { z } from 'astro/zod';

// `wiki` carries generator provenance on auto-generated pages.
// Permissive record so the generator can stamp version metadata without
// tightly coupling the schema to the generator's output shape.
export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				wiki: z.record(z.any()).optional(),
			}),
		}),
	}),
};
