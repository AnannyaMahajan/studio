'use server';

import {
  generateRiskScoreAndExplainability,
  type RiskScoreAndExplainabilityInput,
  type RiskScoreAndExplainabilityOutput,
} from '@/ai/flows/generate-risk-score-and-explainability';
import { reportFormSchema } from './schemas';

export async function getRiskScore(
  input: RiskScoreAndExplainabilityInput
): Promise<RiskScoreAndExplainabilityOutput | undefined> {
  const validation = reportFormSchema.safeParse(input);

  if (!validation.success) {
    console.error('Invalid input:', validation.error.format());
    throw new Error('Invalid input provided for risk score generation.');
  }

  try {
    const result = await generateRiskScoreAndExplainability(validation.data);
    return result;
  } catch (error) {
    console.error('Error in generateRiskScoreAndExplainability flow:', error);
    // Depending on the desired behavior, you might want to re-throw,
    // or return a specific error structure.
    throw new Error('Failed to generate risk score.');
  }
}
