'use server';
/**
 * @fileOverview A conversational AI agent for collecting community health reports.
 *
 * - conversationalReportFlow - A function that handles the conversational reporting process.
 * - ConversationalReportInput - The input type for the conversationalReportFlow function.
 * - ConversationalReportOutput - The return type for the conversationalReportFlow function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  generateRiskScoreAndExplainability,
  type RiskScoreAndExplainabilityInput,
} from './generate-risk-score-and-explainability';

const ConversationalReportInputSchema = z.object({
  message: z.string(),
  history: z.array(z.any()).optional(),
});
export type ConversationalReportInput = z.infer<
  typeof ConversationalReportInputSchema
>;

const ConversationalReportOutputSchema = z.object({
  response: z.string(),
  analysisComplete: z.boolean(),
  analysisResult: z
    .object({
      riskScore: z.enum(['Low', 'Medium', 'High']),
      explainabilityFactors: z.array(z.string()),
      actionPlan: z.array(z.string()),
    })
    .optional(),
});
export type ConversationalReportOutput = z.infer<
  typeof ConversationalReportOutputSchema
>;

const reportDataSchema = z.object({
  symptomChecklist: z
    .array(z.string())
    .describe('List of symptoms reported.'),
  caseCounts: z.number().describe('Number of reported cases.'),
  waterSampleDetails: z.string().describe('Details of the water sample.'),
  gpsCoordinates: z.string().describe('GPS coordinates of the location.'),
  turbidity: z.number().describe('Turbidity of the water sample.'),
  pH: z.number().describe('pH of the water sample.'),
  bacterialIndicators: z
    .string()
    .describe('Bacterial indicators present in the water sample.'),
  conductivity: z.number().describe('Conductivity of the water sample.'),
  photoUpload: z
    .string()
    .optional()
    .describe(
      "A photo related to the potential outbreak, as a data URI. This is optional."
    ),
});

const collectReportDataTool = ai.defineTool(
  {
    name: 'collectReportData',
    description:
      'Tool to collect and store all the necessary information for a health report. Once all information is gathered, call the analyzeReportData tool.',
    inputSchema: reportDataSchema,
    outputSchema: z.void(),
  },
  async () => {}
);

const analyzeReportDataTool = ai.defineTool(
  {
    name: 'analyzeReportData',
    description:
      'Tool to analyze the collected health report data and generate a risk assessment. This should only be called after all required data has been collected by the collectReportData tool.',
    inputSchema: reportDataSchema,
    outputSchema: z.object({
      riskScore: z.enum(['Low', 'Medium', 'High']),
      explainabilityFactors: z.array(z.string()),
      actionPlan: z.array(z.string()),
    }),
  },
  async input => {
    // The photo is optional for the conversation but required for the analysis flow.
    // If not provided, we use a placeholder.
    const analysisInput: RiskScoreAndExplainabilityInput = {
      ...input,
      photoUpload:
        input.photoUpload || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
    };
    return await generateRiskScoreAndExplainability(analysisInput);
  }
);

export async function conversationalReport(
  input: ConversationalReportInput
): Promise<ConversationalReportOutput> {
  const llmResponse = await ai.generate({
    model: 'googleai/gemini-2.5-flash',
    prompt: input.message,
    history: input.history,
    tools: [collectReportDataTool, analyzeReportDataTool],
    toolConfig: {
      choice: {
        mode: 'auto',
      },
    },
    system: `You are an AI assistant for a Community Health Worker (CHW). Your role is to guide them through filing a health report by asking questions one by one.

Your process is as follows:
1. Greet the user and ask what they want to report on.
2. Ask for the symptoms they've observed.
3. Ask for the number of cases.
4. Ask for the GPS coordinates. You can ask them to use the 'Get Location' button if available.
5. Ask for details about the water sample (source, appearance).
6. Ask for the water turbidity, pH, bacterial indicators, and conductivity.
7. Ask if they have a photo to upload. This is optional.
8. Once you have all the necessary information, confirm with the user that you are ready to analyze the data.
9. Use the 'analyzeReportData' tool to get the risk analysis.
10. Present the analysis result to the CHW in a clear and concise manner, including the risk score, the top factors, and the action plan.
11. After presenting the results, your job is done. End the conversation politely.

Be friendly, clear, and concise. Do not ask for all the information at once.`,
  });

  const toolCalls = llmResponse.toolCalls();

  if (toolCalls.length > 0) {
    for (const toolCall of toolCalls) {
      if (toolCall.toolName === 'analyzeReportData') {
        const toolResult = await analyzeReportDataTool(toolCall.args);
        return {
          response: `I have completed the analysis.
Risk Score: ${toolResult.riskScore}
\n\n**Top Factors:**\n- ${toolResult.explainabilityFactors.join('\n- ')}
\n\n**Action Plan:**\n- ${toolResult.actionPlan.join('\n- ')}
`,
          analysisComplete: true,
          analysisResult: toolResult,
        };
      }
    }
  }

  return {
    response: llmResponse.text,
    analysisComplete: false,
  };
}
