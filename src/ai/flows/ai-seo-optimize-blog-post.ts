// src/ai/flows/ai-seo-optimize-blog-post.ts
'use server';

/**
 * @fileOverview AI SEO Optimization flow for blog posts.
 *
 * - aiSEOOptimizeBlogPost - A function that accepts blog post content and returns SEO optimization suggestions.
 * - AISEOOptimizeBlogPostInput - The input type for the aiSEOOptimizeBlogPost function.
 * - AISEOOptimizeBlogPostOutput - The return type for the aiSEOOptimizeBlogPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISEOOptimizeBlogPostInputSchema = z.object({
  content: z
    .string()
    .describe('The blog post content to be optimized for SEO.'),
  focusKeyword: z
    .string()
    .optional()
    .describe('The primary keyword for the blog post.'),
});

export type AISEOOptimizeBlogPostInput = z.infer<
  typeof AISEOOptimizeBlogPostInputSchema
>;

const AISEOOptimizeBlogPostOutputSchema = z.object({
  keywordSuggestions: z
    .array(z.string())
    .describe('Suggested keywords to improve SEO.'),
  metaDescription: z
    .string()
    .describe('Optimized meta description for the blog post.'),
  readabilityImprovements: z
    .string()
    .describe('Suggestions to improve the readability of the blog post.'),
});

export type AISEOOptimizeBlogPostOutput = z.infer<
  typeof AISEOOptimizeBlogPostOutputSchema
>;

export async function aiSEOOptimizeBlogPost(
  input: AISEOOptimizeBlogPostInput
): Promise<AISEOOptimizeBlogPostOutput> {
  return aiSEOOptimizeBlogPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSEOOptimizeBlogPostPrompt',
  input: {schema: AISEOOptimizeBlogPostInputSchema},
  output: {schema: AISEOOptimizeBlogPostOutputSchema},
  prompt: `You are an AI SEO expert. Provide suggestions to improve the SEO of the following blog post content:

Content: {{{content}}}

Focus Keyword (if provided): {{{focusKeyword}}}

Your suggestions should include:

*   Keyword Suggestions: A list of keywords that can improve search engine ranking.
*   Meta Description: An optimized meta description for the blog post.
*   Readability Improvements: Suggestions to improve the readability of the blog post, making it more engaging for readers.

Ensure the output is formatted as a JSON object matching the schema.
`,
});

const aiSEOOptimizeBlogPostFlow = ai.defineFlow(
  {
    name: 'aiSEOOptimizeBlogPostFlow',
    inputSchema: AISEOOptimizeBlogPostInputSchema,
    outputSchema: AISEOOptimizeBlogPostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
