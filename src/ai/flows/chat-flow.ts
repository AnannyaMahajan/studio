
'use server';
/**
 * @fileOverview A simple conversational AI for answering user queries.
 *
 * - chat - A function that handles the chat interaction.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })),
  message: z.string().describe('The user’s current message.'),
});

export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe('The AI’s response.'),
});

export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatPrompt = ai.definePrompt({
  name: 'chatPrompt',
  input: {schema: z.any()}, // Allow any object, since we are transforming it
  output: {schema: ChatOutputSchema},
  prompt: `You are a helpful assistant for a Community Health Worker using the Swasthya Raksha app. Your primary goal is to answer questions about water-borne diseases, public health, and how to use the app. Keep your answers concise, clear, and easy to understand.

{{#each history}}
  {{#if isUser}}
    User: {{{content}}}
  {{/if}}
  {{#if isModel}}
    AI: {{{content}}}
  {{/if}}
{{/each}}

User: {{{message}}}
AI: `,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    // Transform history for Handlebars compatibility
    const processedHistory = input.history.map(message => ({
      content: message.content,
      isUser: message.role === 'user',
      isModel: message.role === 'model',
    }));

    const {output} = await chatPrompt({
      history: processedHistory,
      message: input.message,
    });
    return output!;
  }
);
