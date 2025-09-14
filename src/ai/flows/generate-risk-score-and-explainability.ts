'use server';

/**
 * @fileOverview Generates a risk score (Low/Medium/High) for potential outbreaks and provides the top 3 explainability factors.
 *
 * - generateRiskScoreAndExplainability - A function that generates the risk score and explainability factors.
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
  prompt: `You are a data analyst specializing in predicting disease outbreaks. Based on the provided information, generate a risk score (Low, Medium, or High) for a potential outbreak and identify the top 3 factors that contribute to this risk score. The explainability factors must come directly from the input data.

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

Provide the risk score and top 3 explainability factors in the following format:
{
  "riskScore": "[Low/Medium/High]",
  "explainabilityFactors": ["factor1", "factor2", "factor3"]
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
