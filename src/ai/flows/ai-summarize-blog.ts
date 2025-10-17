'use server';

/**
 * @fileOverview A blog post summarization AI agent.
 *
 * - summarizeBlog - A function that handles the blog post summarization process.
 * - SummarizeBlogInput - The input type for the summarizeBlog function.
 * - SummarizeBlogOutput - The return type for the summarizeBlog function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeBlogInputSchema = z.object({
  blogContent: z.string().describe('The content of the blog post to summarize.'),
});
export type SummarizeBlogInput = z.infer<typeof SummarizeBlogInputSchema>;

const SummarizeBlogOutputSchema = z.object({
  summary: z.string().describe('A short summary of the blog post.'),
});
export type SummarizeBlogOutput = z.infer<typeof SummarizeBlogOutputSchema>;

export async function summarizeBlog(input: SummarizeBlogInput): Promise<SummarizeBlogOutput> {
  return summarizeBlogFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeBlogPrompt',
  input: {schema: SummarizeBlogInputSchema},
  output: {schema: SummarizeBlogOutputSchema},
  prompt: `You are an expert blog post summarizer. Your job is to take a blog post and summarize it into a short, concise summary that captures the main points of the article.

Blog Post Content: {{{blogContent}}}

Summary: `,
});

const summarizeBlogFlow = ai.defineFlow(
  {
    name: 'summarizeBlogFlow',
    inputSchema: SummarizeBlogInputSchema,
    outputSchema: SummarizeBlogOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
