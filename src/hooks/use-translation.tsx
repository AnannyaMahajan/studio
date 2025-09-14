
'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

type Language = 'en' | 'hi' | 'ho';

const translations = {
  en: {
    'language': 'Language',
    'dashboard.title': 'Dashboard',
    'dashboard.description': 'Real-time overview of community health and water quality.',
    'map.title': 'Health Hotspots',
    'map.description': 'Interactive map showing risk areas and case locations.',
    'map.layers': 'Layers',
    'map.filter': 'Filter',
    'map.unavailable': 'Map data is unavailable.',
    'riskTimeline.title': 'Risk Timeline',
    'riskTimeline.description': 'Aggregated outbreak risk score over the last 12 weeks.',
    'riskTimeline.weeks.0': '12 weeks ago',
    'riskTimeline.weeks.1': '11 weeks ago',
    'riskTimeline.weeks.2': '10 weeks ago',
    'riskTimeline.weeks.3': '9 weeks ago',
    'riskTimeline.weeks.4': '8 weeks ago',
    'riskTimeline.weeks.5': '7 weeks ago',
    'riskTimeline.weeks.6': '6 weeks ago',
    'riskTimeline.weeks.7': '5 weeks ago',
    'riskTimeline.weeks.8': '4 weeks ago',
    'riskTimeline.weeks.9': '3 weeks ago',
    'riskTimeline.weeks.10': '2 weeks ago',
    'riskTimeline.weeks.11': 'Last week',
    'alertsCenter.title': 'Alerts Center',
    'alertsCenter.description': 'Recent alerts based on incoming data.',
    'alertsCenter.noActiveAlerts': 'No active alerts.',
    'alertsCenter.acknowledge': 'Acknowledge',
    'alertsCenter.allActioned': 'All alerts have been actioned.',
    'alerts.1.title': 'High Turbidity Detected',
    'alerts.1.description': 'Water samples from Sector 7 show unusually high turbidity levels.',
    'alerts.2.title': 'Increase in Diarrhea Cases',
    'alerts.2.description': '3 new cases reported in the last 24 hours in the northern village.',
    'alerts.3.title': 'Scheduled Water Testing',
    'alerts.3.description': 'Routine water quality testing is scheduled for tomorrow at 10 AM.',
    'alerts.levels.high': 'High',
    'alerts.levels.medium': 'Medium',
    'alerts.levels.low': 'Low',
    'acknowledgements.title': 'Acknowledgements',
    'acknowledgements.description': 'Recently acknowledged alerts.',
    'acknowledgements.acknowledged': 'Acknowledged just now',
    'acknowledgements.nonePending': 'No acknowledgements pending.',
  },
  hi: {
    'language': 'भाषा',
    'dashboard.title': 'डैशबोर्ड',
    'dashboard.description': 'सामुदायिक स्वास्थ्य और पानी की गुणवत्ता का रियल-टाइम अवलोकन।',
    'map.title': 'स्वास्थ्य हॉटस्पॉट',
    'map.description': 'जोखिम वाले क्षेत्रों और मामलों के स्थानों को दर्शाने वाला इंटरैक्टिव मानचित्र।',
    'map.layers': 'परतें',
    'map.filter': 'फ़िल्टर',
    'map.unavailable': 'मानचित्र डेटा उपलब्ध नहीं है।',
    'riskTimeline.title': 'जोखिम टाइमलाइन',
    'riskTimeline.description': 'पिछले 12 हफ्तों में एकत्रित प्रकोप जोखिम स्कोर।',
    'riskTimeline.weeks.0': '12 हफ्ते पहले',
    'riskTimeline.weeks.1': '11 हफ्ते पहले',
    'riskTimeline.weeks.2': '10 हफ्ते पहले',
    'riskTimeline.weeks.3': '9 हफ्ते पहले',
    'riskTimeline.weeks.4': '8 हफ्ते पहले',
    'riskTimeline.weeks.5': '7 हफ्ते पहले',
    'riskTimeline.weeks.6': '6 हफ्ते पहले',
    'riskTimeline.weeks.7': '5 हफ्ते पहले',
    'riskTimeline.weeks.8': '4 हफ्ते पहले',
    'riskTimeline.weeks.9': '3 हफ्ते पहले',
    'riskTimeline.weeks.10': '2 हफ्ते पहले',
    'riskTimeline.weeks.11': 'पिछला हफ्ता',
    'alertsCenter.title': 'अलर्ट केंद्र',
    'alertsCenter.description': 'आने वाले डेटा के आधार पर हालिया अलर्ट।',
    'alertsCenter.noActiveAlerts': 'कोई सक्रिय अलर्ट नहीं है।',
    'alertsCenter.acknowledge': 'स्वीकार करें',
    'alertsCenter.allActioned': 'सभी अलर्ट पर कार्रवाई हो चुकी है।',
    'alerts.1.title': 'उच्च टर्बिडिटी का पता चला',
    'alerts.1.description': 'सेक्टर 7 से पानी के नमूनों में असामान्य रूप से उच्च टर्बिडिटी स्तर दिखा।',
    'alerts.2.title': 'दस्त के मामलों में वृद्धि',
    'alerts.2.description': 'उत्तरी गांव में पिछले 24 घंटों में 3 नए मामले सामने आए।',
    'alerts.3.title': 'अनुसूचित जल परीक्षण',
    'alerts.3.description': 'नियमित जल गुणवत्ता परीक्षण कल सुबह 10 बजे निर्धारित है।',
    'alerts.levels.high': 'उच्च',
    'alerts.levels.medium': 'मध्यम',
    'alerts.levels.low': 'कम',
    'acknowledgements.title': 'स्वीकृतियाँ',
    'acknowledgements.description': 'हाल ही में स्वीकार किए गए अलर्ट।',
    'acknowledgements.acknowledged': 'अभी-अभी स्वीकार किया गया',
    'acknowledgements.nonePending': 'कोई स्वीकृति लंबित नहीं है।',
  },
  ho: {
    // This is a placeholder for the Ho language.
    // The keys are here, but the values are in English as placeholders.
    'language': 'भासा',
    'dashboard.title': 'Dashboard',
    'dashboard.description': 'Real-time overview of community health and water quality.',
    'map.title': 'Health Hotspots',
    'map.description': 'Interactive map showing risk areas and case locations.',
    'map.layers': 'Layers',
    'map.filter': 'Filter',
    'map.unavailable': 'Map data is unavailable.',
    'riskTimeline.title': 'Risk Timeline',
    'riskTimeline.description': 'Aggregated outbreak risk score over the last 12 weeks.',
    'riskTimeline.weeks.0': '12 weeks ago',
    'riskTimeline.weeks.1': '11 weeks ago',
    'riskTimeline.weeks.2': '10 weeks ago',
    'riskTimeline.weeks.3': '9 weeks ago',
    'riskTimeline.weeks.4': '8 weeks ago',
    'riskTimeline.weeks.5': '7 weeks ago',
    'riskTimeline.weeks.6': '6 weeks ago',
    'riskTimeline.weeks.7': '5 weeks ago',
    'riskTimeline.weeks.8': '4 weeks ago',
    'riskTimeline.weeks.9': '3 weeks ago',
    'riskTimeline.weeks.10': '2 weeks ago',
    'riskTimeline.weeks.11': 'Last week',
    'alertsCenter.title': 'Alerts Center',
    'alertsCenter.description': 'Recent alerts based on incoming data.',
    'alertsCenter.noActiveAlerts': 'No active alerts.',
    'alertsCenter.acknowledge': 'Acknowledge',
    'alertsCenter.allActioned': 'All alerts have been actioned.',
    'alerts.1.title': 'High Turbidity Detected',
    'alerts.1.description': 'Water samples from Sector 7 show unusually high turbidity levels.',
    'alerts.2.title': 'Increase in Diarrhea Cases',
    'alerts.2.description': '3 new cases reported in the last 24 hours in the northern village.',
    'alerts.3.title': 'Scheduled Water Testing',
    'alerts.3.description': 'Routine water quality testing is scheduled for tomorrow at 10 AM.',
    'alerts.levels.high': 'High',
    'alerts.levels.medium': 'Medium',
    'alerts.levels.low': 'Low',
    'acknowledgements.title': 'Acknowledgements',
    'acknowledgements.description': 'Recently acknowledged alerts.',
    'acknowledgements.acknowledged': 'Acknowledged just now',
    'acknowledgements.nonePending': 'No acknowledgements pending.',
  }
};

type TranslationContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, fallback?: string) => string;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: string, fallback?: string) => {
    const keys = key.split('.');
    let result = (translations[language] as any);
    for (const k of keys) {
        result = result?.[k];
        if (result === undefined) {
            // If key not found in current language, try fallback to English
             let fallbackResult = (translations['en'] as any);
             for (const fk of keys) {
                fallbackResult = fallbackResult?.[fk];
                if (fallbackResult === undefined) return fallback ?? key;
             }
             return fallbackResult;
        }
    }
    return result;
  }, [language]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
