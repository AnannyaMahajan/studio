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
};
