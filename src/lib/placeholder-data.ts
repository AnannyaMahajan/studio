import type { Alert, Prediction } from './types';

export const alerts: Alert[] = [
  {
    id: 1,
    title: 'High Turbidity Detected',
    description:
      'Water samples from Sector 7 show unusually high turbidity levels.',
    level: 'high',
    time: '5 minutes ago',
  },
  {
    id: 2,
    title: 'Increase in Diarrhea Cases',
    description:
      '3 new cases reported in the last 24 hours in the northern village.',
    level: 'medium',
    time: '2 hours ago',
  },
  {
    id: 3,
    title: 'Scheduled Water Testing',
    description:
      'Routine water quality testing is scheduled for tomorrow at 10 AM.',
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
    details: {
      explainabilityFactors: [
        'High turbidity (45 NTU) in water samples, indicating contamination.',
        'Presence of E. coli bacterial indicators.',
        'A significant number of reported diarrhea cases (5).',
      ],
      actionPlan: [
        'Immediately advise community to boil all drinking water or use water purification tablets.',
        'Distribute oral rehydration salts (ORS) to households with reported diarrhea cases.',
        'Schedule a community meeting to educate on handwashing and safe water storage.',
        'Conduct follow-up water testing at the source within 48 hours.',
      ],
    },
  },
  {
    id: 2,
    location: 'North Village River',
    summary: 'Slightly elevated bacterial indicators in water sample.',
    riskScore: 'Medium',
    date: '2024-07-19',
    details: {
      explainabilityFactors: [
        'Bacterial indicators (Coliform) present in river water.',
        'Slight increase in turbidity after recent rainfall.',
        'Two reported cases of skin rash in the area.',
      ],
      actionPlan: [
        'Increase surveillance and active case finding in North Village.',
        'Advise caution for using river water for bathing or washing clothes.',
        'Reinforce hygiene and handwashing messages through local announcements.',
      ],
    },
  },
  {
    id: 3,
    location: 'Community Pump',
    summary: 'Routine check, all parameters normal.',
    riskScore: 'Low',
    date: '2024-07-18',
    details: {
      explainabilityFactors: [
        'Low water turbidity and normal pH levels.',
        'No significant bacterial indicators found.',
        'No unusual symptom patterns reported in the community.',
      ],
      actionPlan: [
        'Continue routine monitoring as per schedule.',
        'Document the findings for the monthly health report.',
        'Encourage community members to continue reporting any health concerns promptly.',
      ],
    },
  },
];
