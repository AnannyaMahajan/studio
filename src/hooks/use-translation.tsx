
'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

type Language = 'en' | 'hi' | 'ho';

const translations = {
  en: {
    appName: 'Swasthya Raksha',
    language: 'Language',
    changeLanguage: 'Change language',
    risk: 'Risk',
    nav: {
        dashboard: 'Dashboard',
        newReport: 'New Report',
        aiPrediction: 'AI Prediction',
        waterQuality: 'Water Quality',
        alerts: 'Alerts',
        schedule: 'Schedule',
        education: 'Education',
    },
    account: {
        myAccount: 'My Account',
        profile: 'Profile',
        settings: 'Settings',
        logout: 'Log out',
    },
    dashboard: {
        title: 'Dashboard',
        description: 'Real-time overview of community health and water quality.',
    },
    map: {
        title: 'Health Hotspots',
        description: 'Interactive map showing risk areas and case locations.',
        layers: 'Layers',
        filter: 'Filter',
        unavailable: 'Map data is unavailable.',
    },
    riskTimeline: {
        title: 'Risk Timeline',
        description: 'Aggregated outbreak risk score over the last 12 weeks.',
        weeks: {
            0: '12 weeks ago',
            1: '11 weeks ago',
            2: '10 weeks ago',
            3: '9 weeks ago',
            4: '8 weeks ago',
            5: '7 weeks ago',
            6: '6 weeks ago',
            7: '5 weeks ago',
            8: '4 weeks ago',
            9: '3 weeks ago',
            10: '2 weeks ago',
            11: 'Last week',
        }
    },
    alertsCenter: {
        title: 'Alerts Center',
        description: 'Recent alerts based on incoming data.',
        noActiveAlerts: 'No active alerts.',
        acknowledge: 'Acknowledge',
        allActioned: 'All alerts have been actioned.',
    },
    alerts: {
        '1': {
            title: 'High Turbidity Detected',
            description: 'Water samples from Sector 7 show unusually high turbidity levels.',
        },
        '2': {
            title: 'Increase in Diarrhea Cases',
            description: '3 new cases reported in the last 24 hours in the northern village.',
        },
        '3': {
            title: 'Scheduled Water Testing',
            description: 'Routine water quality testing is scheduled for tomorrow at 10 AM.',
        },
        levels: {
            high: 'High',
            medium: 'Medium',
            low: 'Low',
        },
        time: {
            minutes: '5 minutes ago',
            hours: '2 hours ago',
            days: '1 day ago',
        }
    },
    acknowledgements: {
        title: 'Acknowledgements',
        description: 'Recently acknowledged alerts.',
        acknowledged: 'Acknowledged just now',
        nonePending: 'No acknowledgements pending.',
    },
    logout: {
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    },
  },
  hi: {
    appName: 'स्वास्थ्य रक्षा',
    language: 'भाषा',
    changeLanguage: 'भाषा बदलें',
    risk: 'जोखिम',
     nav: {
        dashboard: 'डैशबोर्ड',
        newReport: 'नई रिपोर्ट',
        aiPrediction: 'एआई भविष्यवाणी',
        waterQuality: 'जल गुणवत्ता',
        alerts: 'अलर्ट',
        schedule: 'अनुसूची',
        education: 'शिक्षा',
    },
    account: {
        myAccount: 'मेरा खाता',
        profile: 'प्रोफ़ाइल',
        settings: 'सेटिंग्स',
        logout: 'लॉग आउट',
    },
    dashboard: {
        title: 'डैशबोर्ड',
        description: 'सामुदायिक स्वास्थ्य और पानी की गुणवत्ता का रियल-टाइम अवलोकन।',
    },
    map: {
        title: 'स्वास्थ्य हॉटस्पॉट',
        description: 'जोखिम वाले क्षेत्रों और मामलों के स्थानों को दर्शाने वाला इंटरैक्टिव मानचित्र।',
        layers: 'परतें',
        filter: 'फ़िल्टर',
        unavailable: 'मानचित्र डेटा उपलब्ध नहीं है।',
    },
    riskTimeline: {
        title: 'जोखिम टाइमलाइन',
        description: 'पिछले 12 हफ्तों में एकत्रित प्रकोप जोखिम स्कोर।',
        weeks: {
            0: '12 हफ्ते पहले',
            1: '11 हफ्ते पहले',
            2: '10 हफ्ते पहले',
            3: '9 हफ्ते पहले',
            4: '8 हफ्ते पहले',
            5: '7 हफ्ते पहले',
            6: '6 हफ्ते पहले',
            7: '5 हफ्ते पहले',
            8: '4 हफ्ते पहले',
            9: '3 हफ्ते पहले',
            10: '2 हफ्ते पहले',
            11: 'पिछला हफ्ता',
        }
    },
    alertsCenter: {
        title: 'अलर्ट केंद्र',
        description: 'आने वाले डेटा के आधार पर हालिया अलर्ट।',
        noActiveAlerts: 'कोई सक्रिय अलर्ट नहीं है।',
        acknowledge: 'स्वीकार करें',
        allActioned: 'सभी अलर्ट पर कार्रवाई हो चुकी है।',
    },
    alerts: {
        '1': {
            title: 'उच्च टर्बिडिटी का पता चला',
            description: 'सेक्टर 7 से पानी के नमूनों में असामान्य रूप से उच्च टर्बिडिटी स्तर दिखा।',
        },
        '2': {
            title: 'दस्त के मामलों में वृद्धि',
            description: 'उत्तरी गांव में पिछले 24 घंटों में 3 नए मामले सामने आए।',
        },
        '3': {
            title: 'अनुसूचित जल परीक्षण',
            description: 'नियमित जल गुणवत्ता परीक्षण कल सुबह 10 बजे निर्धारित है।',
        },
        levels: {
            high: 'उच्च',
            medium: 'मध्यम',
            low: 'कम',
        },
        time: {
            minutes: '5 मिनट पहले',
            hours: '2 घंटे पहले',
            days: '1 दिन पहले',
        }
    },
    acknowledgements: {
        title: 'स्वीकृतियाँ',
        description: 'हाल ही में स्वीकार किए गए अलर्ट।',
        acknowledged: 'अभी-अभी स्वीकार किया गया',
        nonePending: 'कोई स्वीकृति लंबित नहीं है।',
    },
     logout: {
      title: 'लॉग आउट',
      description: 'आपको सफलतापूर्वक लॉग आउट कर दिया गया है।',
    },
  },
  ho: {
    // This is a placeholder for the Ho language.
    appName: 'Swasthya Raksha',
    language: 'भासा',
    changeLanguage: 'Change language',
    risk: 'Risk',
    nav: {
        dashboard: 'Dashboard',
        newReport: 'New Report',
        aiPrediction: 'AI Prediction',
        waterQuality: 'Water Quality',
        alerts: 'Alerts',
        schedule: 'Schedule',
        education: 'Education',
    },
    account: {
        myAccount: 'My Account',
        profile: 'Profile',
        settings: 'Settings',
        logout: 'Log out',
    },
    dashboard: {
        title: 'Dashboard',
        description: 'Real-time overview of community health and water quality.',
    },
    map: {
        title: 'Health Hotspots',
        description: 'Interactive map showing risk areas and case locations.',
        layers: 'Layers',
        filter: 'Filter',
        unavailable: 'Map data is unavailable.',
    },
    riskTimeline: {
        title: 'Risk Timeline',
        description: 'Aggregated outbreak risk score over the last 12 weeks.',
        weeks: {
            0: '12 weeks ago',
            1: '11 weeks ago',
            2: '10 weeks ago',
            3: '9 weeks ago',
            4: '8 weeks ago',
            5: '7 weeks ago',
            6: '6 weeks ago',
            7: '5 weeks ago',
            8: '4 weeks ago',
            9: '3 weeks ago',
            10: '2 weeks ago',
            11: 'Last week',
        }
    },
    alertsCenter: {
        title: 'Alerts Center',
        description: 'Recent alerts based on incoming data.',
        noActiveAlerts: 'No active alerts.',
        acknowledge: 'Acknowledge',
        allActioned: 'All alerts have been actioned.',
    },
    alerts: {
        '1': {
            title: 'High Turbidity Detected',
            description: 'Water samples from Sector 7 show unusually high turbidity levels.',
        },
        '2': {
            title: 'Increase in Diarrhea Cases',
            description: '3 new cases reported in the last 24 hours in the northern village.',
        },
        '3': {
            title: 'Scheduled Water Testing',
            description: 'Routine water quality testing is scheduled for tomorrow at 10 AM.',
        },
        levels: {
            high: 'High',
            medium: 'Medium',
            low: 'Low',
        },
        time: {
            minutes: '5 minutes ago',
            hours: '2 hours ago',
            days: '1 day ago',
        }
    },
    acknowledgements: {
        title: 'Acknowledgements',
        description: 'Recently acknowledged alerts.',
        acknowledged: 'Acknowledged just now',
        nonePending: 'No acknowledgements pending.',
    },
     logout: {
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    },
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
  
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
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
