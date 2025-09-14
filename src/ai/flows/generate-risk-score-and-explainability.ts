'use server';

/**
 * @fileOverview Generates a risk score (Low/Medium/High) for potential outbreaks, provides the top 3 explainability factors, and creates a tailored action plan.
 *
 * - generateRiskScoreAndExplainability - A function that generates the risk score, explainability factors, and action plan.
 * - RiskScoreAndExplainabilityInput - The input type for the generateRiskScoreAndExplainability function.
 * - RiskScoreAndExplainabilityOutput - The return type for the generateRiskScoreAndExplainability function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RiskScoreAndExplainabilityInputSchema = z.object({
  symptomChecklist: z.array(z.string()).describe('List of symptoms reported.'),
  caseCounts: z.number().describe('Number of reported cases.'),
  photoUpload: z.string().describe(
    "A photo related to the potential outbreak, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
  waterSampleDetails: z.string().describe('Details of the water sample.'),
  gpsCoordinates: z.string().describe('GPS coordinates of the location.'),
  turbidity: z.number().describe('Turbidity of the water sample.'),
  pH: z.number().describe('pH of the water sample.'),
  bacterialIndicators: z.string().describe('Bacterial indicators present in the water sample.'),
  conductivity: z.number().describe('Conductivity of the water sample.'),
});

export type RiskScoreAndExplainabilityInput = z.infer<
  typeof RiskScoreAndExplainabilityInputSchema
>;

const RiskScoreAndExplainabilityOutputSchema = z.object({
  riskScore: z
    .enum(['Low', 'Medium', 'High'])
    .describe('The risk score for a potential outbreak.'),
  explainabilityFactors: z
    .array(z.string())
    .describe('Top 3 factors explaining the risk score.'),
  actionPlan: z
    .array(z.string())
    .describe(
      'A step-by-step action plan for the Community Health Worker based on the risk assessment.'
    ),
});

export type RiskScoreAndExplainabilityOutput = z.infer<
  typeof RiskScoreAndExplainabilityOutputSchema
>;

export async function generateRiskScoreAndExplainability(
  input: RiskScoreAndExplainabilityInput
): Promise<RiskScoreAndExplainabilityOutput> {
  return generateRiskScoreAndExplainabilityFlow(input);
}

const generateRiskScoreAndExplainabilityPrompt = ai.definePrompt({
  name: 'generateRiskScoreAndExplainabilityPrompt',
  input: {schema: RiskScoreAndExplainabilityInputSchema},
  output: {schema: RiskScoreAndExplainabilityOutputSchema},
  prompt: `You are a public health expert aiding a Community Health Worker (CHW) in a remote area. Based on the provided information, your task is to:
1. Generate a risk score (Low, Medium, or High) for a potential water-borne disease outbreak.
2. Identify the top 3 factors from the input data that contribute to this risk score.
3. Create a clear, concise, and actionable step-by-step plan for the CHW. The plan should be tailored to the specific risk level and contributing factors.

Input Data:
Symptom Checklist: {{{symptomChecklist}}}
Case Counts: {{{caseCounts}}}
Photo: {{media url=photoUpload}}
Water Sample Details: {{{waterSampleDetails}}}
GPS Coordinates: {{{gpsCoordinates}}}
Turbidity: {{{turbidity}}}
pH: {{{pH}}}
Bacterial Indicators: {{{bacterialIndicators}}}
Conductivity: {{{conductivity}}}

Provide the risk score, top 3 explainability factors, and the action plan in the following format:
{
  "riskScore": "[Low/Medium/High]",
  "explainabilityFactors": ["factor1", "factor2", "factor3"],
  "actionPlan": ["Step 1: ...", "Step 2: ...", "Step 3: ..."]
}
`,
});

const generateRiskScoreAndExplainabilityFlow = ai.defineFlow(
  {
    name: 'generateRiskScoreAndExplainabilityFlow',
    inputSchema: RiskScoreAndExplainabilityInputSchema,
    outputSchema: RiskScoreAndExplainabilityOutputSchema,
  },
  async input => {
    const {output} = await generateRiskScoreAndExplainabilityPrompt(input);
    return output!;
  }
);
