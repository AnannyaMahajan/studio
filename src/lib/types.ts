import type { RiskScoreAndExplainabilityOutput } from "@/ai/flows/generate-risk-score-and-explainability";

export type Alert = {
  id: number;
  title: string;
  description: string;
  level: 'high' | 'medium' | 'low';
  time: string;
};

export type Prediction = {
  id: number;
  location: string;
  summary: string;
  riskScore: 'High' | 'Medium' | 'Low';
  date: string;
  details: RiskScoreAndExplainabilityOutput;
};

export type CalendarEvent = {
    date: Date;
    title: string;
    time: string;
}
