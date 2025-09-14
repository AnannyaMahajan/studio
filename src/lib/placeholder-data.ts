import type { Alert, Prediction } from './types';

export const alerts: Alert[] = [
  {
    id: 1,
    title: 'High Turbidity Detected',
    description: 'Water samples from Sector 7 show unusually high turbidity levels.',
    level: 'high',
    time: '5 minutes ago',
  },
  {
    id: 2,
    title: 'Increase in Diarrhea Cases',
    description: '3 new cases reported in the last 24 hours in the northern village.',
    level: 'medium',
    time: '2 hours ago',
  },
  {
    id: 3,
    title: 'Scheduled Water Testing',
    description: 'Routine water quality testing is scheduled for tomorrow at 10 AM.',
    level: 'low',
    time: '1 day ago',
  },
];

export const riskTimelineData = [
    { week: '12 weeks ago', riskScore: 10 },
    { week: '11 weeks ago', riskScore: 15 },
    { week: '10 weeks ago', riskScore: 12 },
    { week: '9 weeks ago', riskScore: 20 },
    { week: '8 weeks ago', riskScore: 25 },
    { week: '7 weeks ago', riskScore: 30 },
    { week: '6 weeks ago', riskScore: 28 },
    { week: '5 weeks ago', riskScore: 35 },
    { week: '4 weeks ago', riskScore: 45 },
    { week: '3 weeks ago', riskScore: 40 },
    { week: '2 weeks ago', riskScore: 55 },
    { week: 'Last week', riskScore: 60 },
];

export const predictionHistory: Prediction[] = [
  {
    id: 1,
    location: 'Sector 7 - Well',
    summary: 'High turbidity and 5 cases of diarrhea reported.',
    riskScore: 'High',
    date: '2024-07-20',
  },
  {
    id: 2,
    location: 'North Village River',
    summary: 'Slightly elevated bacterial indicators in water sample.',
    riskScore: 'Medium',
    date: '2024-07-19',
  },
    {
    id: 3,
    location: 'Community Pump',
    summary: 'Routine check, all parameters normal.',
    riskScore: 'Low',
    date: '2024-07-18',
  },
];
