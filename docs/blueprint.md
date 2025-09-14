# **App Name**: Swasthya Raksha

## Core Features:

- CHW Quick Report: Mobile-first PWA for CHWs to submit reports with symptom checklist, case counts, photo upload, water sample details, and GPS coordinates.
- Offline Data Sync: Cache forms and submissions, queue data for two-way sync, and provide a conflict resolution UI with offline indicator. Implement robust conflict resolution strategies.
- Water Quality Ingestion: Ingest data from MQTT IoT streams and manual test kit uploads; handle turbidity, pH, bacterial indicators, and conductivity data.
- Real-time Dashboard: Display interactive map (heatmap + hotspots + filters), alerts center, risk timeline, and acknowledgements. Ensure high performance and responsiveness, even with large datasets.
- Real-time Alerts: Send alerts via push notifications and SMS using Twilio/Gupshup, with alert escalation workflows. Provide detailed alert information and customizable notification preferences.
- ML Outbreak Prediction: Employ a rule-based system and ML model to generate a Risk Score (Low/Medium/High) with top-3 explainability factors, as determined using reasoning by the LLM tool.
- Multilingual Support: Offer UI and audio prompts in English and a tribal language, with an extensible localization pipeline. Support dynamic language switching and culturally appropriate translations.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5), conveying trust and reliability, inspired by clear water sources.
- Background color: Very light blue (#F0F4FF). Same hue as primary color, providing a calm and clean backdrop for content.
- Accent color: A vivid purple (#7E57C2), used to highlight important alerts and CTAs. The vividness and saturation ensures visibility, while the change of hue contrasts with the primary blue.
- Body font: 'PT Sans', a humanist sans-serif font. Ensure readability across different screen sizes and resolutions.
- Headline font: 'PT Sans', a humanist sans-serif font. Note: currently only Google Fonts are supported. Use appropriate font weights and sizes for clear hierarchy.
- Use simple, high-contrast icons for easy recognition, especially for illiterate users. Ensure icons are culturally relevant and easily understandable.
- Mobile-first design with large tappable targets and clear visual hierarchy. Optimize layout for different screen sizes and orientations. Prioritize key actions and information.
- Subtle animations for data loading and alert confirmations to provide user feedback without being distracting. Ensure animations are smooth and do not negatively impact performance or accessibility.