
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
    report: {
        title: 'New Health Report',
        description: 'Submit a new report for AI-powered risk analysis.',
        form: {
            title: 'Submit Health Report',
            description: 'Fill in the details below to the best of your ability.',
            symptomsLabel: '1. Observed Symptoms',
            caseCountsLabel: '2. Number of Cases',
            caseCountsPlaceholder: 'e.g., 5',
            gpsLabel: '3. GPS Coordinates',
            gpsPlaceholder: 'e.g., 22.5726, 88.3639',
            waterDetailsLabel: '4. Water Sample Details',
            waterDetailsPlaceholder: 'Describe the water source, color, smell, etc.',
            turbidityLabel: '5. Turbidity (NTU)',
            turbidityPlaceholder: 'e.g., 45',
            phLabel: '6. pH Level',
            phPlaceholder: 'e.g., 6.8',
            bacteriaLabel: '7. Bacterial Indicators',
            bacteriaPlaceholder: 'e.g., E. coli detected',
            conductivityLabel: '8. Conductivity (µS/cm)',
            conductivityPlaceholder: 'e.g., 550',
            photoLabel: '9. Upload Photo (Optional)',
            submitButton: 'Generate Risk Score',
            analyzingButton: 'Analyzing...',
            symptoms: {
                diarrhea: 'Diarrhea',
                vomiting: 'Vomiting',
                fever: 'Fever',
                stomach_cramps: 'Stomach Cramps',
                dehydration: 'Dehydration',
                skin_rash: 'Skin Rash',
            },
        },
        toast: {
            locationSuccessTitle: 'Location Captured',
            locationSuccessDescription: 'GPS coordinates have been successfully updated.',
            locationErrorTitle: 'Error getting location',
            locationErrorDescription: 'Please ensure location services are enabled.',
            locationNotSupportedTitle: 'Geolocation not supported',
            locationNotSupportedDescription: 'Your browser does not support geolocation.',
            analysisSuccessTitle: 'Analysis Complete',
            analysisSuccessDescription: 'Risk score and action plan generated successfully.',
            analysisErrorTitle: 'Analysis Failed',
            analysisErrorDescription: 'An error occurred while analyzing the report. Please try again.',
        }
    },
    riskDisplay: {
        riskLevels: {
            low: 'Low Risk Detected',
            medium: 'Medium Risk Detected',
            high: 'High Risk Detected',
        },
        riskScores: {
            low: 'Low Risk',
            medium: 'Medium Risk',
            high: 'High Risk',
        },
        factorsTitle: 'Top Contributing Factors',
        actionPlanTitle: 'Recommended Action Plan',
    },
    aiPrediction: {
        title: 'AI Prediction Center',
        description: 'Review historical risk assessments and predictions.',
    },
    predictionHistory: {
        title: 'Prediction Log',
        description: 'A log of the most recent reports and their AI-generated risk scores.',
        risk: {
            high: 'High',
            medium: 'Medium',
            low: 'Low',
        },
        viewDetails: 'View Details',
    },
    predictionDialog: {
        title: 'Prediction Details: {{location}}',
        description: 'Analysis conducted on {{date}}.',
        riskLevels: {
            low: 'Low Risk',
            medium: 'Medium Risk',
            high: 'High Risk',
        },
        riskScores: {
            low: 'Low Risk',
            medium: 'Medium Risk',
            high: 'High Risk',
        },
        factorsTitle: 'Top Contributing Factors',
        actionPlanTitle: 'Recommended Action Plan',
    },
    waterQuality: {
        title: 'Water Quality Monitoring',
        description: 'Detailed analysis of water samples from various locations.',
        table: {
            title: 'Recent Sample Results',
            description: 'Overview of the latest water quality tests.',
            headers: {
                location: 'Location',
                turbidity: 'Turbidity (NTU)',
                ph: 'pH',
                bacteria: 'Bacteria',
                status: 'Status',
            },
        },
        chart: {
            title: 'Turbidity Levels by Location',
            description: 'Higher turbidity can indicate a higher risk of contaminants.',
            label: 'Turbidity (NTU)',
        },
        data: {
            '1': { location: 'Sector 7 - Well' },
            '2': { location: 'North Village River' },
            '3': { location: 'Community Pump' },
            '4': { location: 'East Sector Borehole' },
            bacteria: {
                high: 'High',
                medium: 'Medium',
                low: 'Low',
                none: 'None',
            },
            status: {
                poor: 'Poor',
                average: 'Average',
                good: 'Good',
                excellent: 'Excellent',
            }
        },
    },
    alertsPage: {
        title: 'Alerts',
        description: 'View and manage all system alerts.',
    },
    schedule: {
        title: 'My Schedule',
        description: 'Plan and view your upcoming tasks and appointments.',
        newEventButton: 'New Event',
        upcomingEvents: 'Upcoming Events',
        daySchedule: 'Your schedule for the selected day.',
        noEvents: 'No events for this day.',
        popoverTitle: 'Events for {{date}}',
        events: {
            '1': { title: 'Water Testing in Sector 4' },
            '2': { title: 'Community Health Briefing' },
            '3': { title: 'Meet with Village Elder' },
            '4': { title: 'Follow-up on Sector 7 cases', time: 'All Day' },
        }
    },
    addEventDialog: {
        title: 'Add New Event',
        description: 'Enter the details for your new schedule item.',
        titleLabel: 'Title',
        timeLabel: 'Time',
        timePlaceholder: 'e.g., 10:00 AM or All Day',
        cancelButton: 'Cancel',
        addButton: 'Add Event',
        toast: {
            successTitle: 'Event Added',
            successDescription: '"{{title}}" has been added to your schedule.',
            errorTitle: 'Missing Information',
            errorDescription: 'Please fill out both title and time for the event.',
        },
    },
    education: {
        title: 'Education Resources',
        description: 'Training materials and health information for CHWs.',
        content: {
            '1': {
                title: 'Understanding Waterborne Diseases',
                description: 'Learn about common diseases spread through contaminated water.',
                p1: 'Waterborne diseases are caused by pathogenic microorganisms that most commonly are transmitted in contaminated fresh water. Infection commonly results during bathing, washing, drinking, in the preparation of food, or the consumption of food thus infected.',
                h4_1: 'Common Diseases:',
                li1_1_strong: 'Cholera:',
                li1_1_text: 'An acute diarrhoeal infection caused by ingestion of food or water contaminated with the bacterium Vibrio cholerae.',
                li1_2_strong: 'Typhoid Fever:',
                li1_2_text: 'A life-threatening illness caused by the bacterium Salmonella Typhi. It is usually spread through contaminated food or water.',
                li1_3_strong: 'Hepatitis A:',
                li1_3_text: 'A liver infection caused by the Hepatitis A virus (HAV). It is highly contagious and spreads from person to person and through contaminated food or water.',
                h4_2: 'Prevention:',
                li2_1: 'Always drink safe, treated water.',
                li2_2: 'Wash hands thoroughly with soap and water.',
                li2_3: 'Cook food properly.',
            },
            '2': {
                title: 'Proper Handwashing Techniques',
                description: 'A video guide to effective handwashing.',
            },
            '3': {
                title: 'Identifying Contaminated Water Sources',
                description: 'Key signs that a water source may be unsafe for consumption.',
                p1: "It's crucial to identify if a water source is contaminated to prevent illness. While lab testing is the only definitive way, there are some signs you can look for:",
                li1_strong: 'Cloudiness (Turbidity):',
                li1_text: 'The water is not clear.',
                li2_strong: 'Bad Smell:',
                li2_text: 'Water that smells like rotten eggs (sulfur) or chemicals is a warning sign.',
                li3_strong: 'Oily Film:',
                li3_text: 'A rainbow-colored or oily sheen on the surface can indicate pollution.',
                li4_strong: 'Proximity to Contaminants:',
                li4_text: 'Be cautious if the source is near septic tanks, garbage dumps, or industrial areas.',
            },
            '4': {
                title: 'Community Hygiene Promotion',
                description: 'Strategies for improving hygiene practices in your community.',
                p1: 'Promoting good hygiene is a community effort. As a CHW, you can lead these initiatives:',
                li1_strong: 'Conduct Workshops:',
                li1_text: 'Hold sessions on handwashing, safe water storage, and food safety.',
                li2_strong: 'Distribute Information:',
                li2_text: 'Use posters and pamphlets in local languages.',
                li3_strong: 'Lead by Example:',
                li3_text: 'Always practice good hygiene yourself.',
                li4_strong: 'Engage Community Leaders:',
                li4_text: 'Get village elders and leaders involved to champion the cause.',
            }
        }
    },
    settings: {
        title: 'Settings',
        description: 'Manage your account and application settings.',
        saveButton: 'Save',
        profile: {
            title: 'Profile',
            description: 'Update your personal information.',
            nameLabel: 'Name',
            emailLabel: 'Email',
        },
        notifications: {
            title: 'Notifications',
            description: 'Choose how you want to be notified.',
            emailLabel: 'Email Notifications',
            pushLabel: 'Push Notifications (App)',
        },
        language: {
            title: 'Language',
            description: 'Set your preferred language for the app.',
            selectPlaceholder: 'Select a language',
        },
        toast: {
            title: 'Settings Saved',
            description: 'Your {{section}} settings have been updated.',
        }
    },
    auth: {
        loginTitle: 'Login',
        signupTitle: 'Sign Up',
        loginDescription: 'Enter your email below to login to your account',
        signupDescription: 'Enter your information to create an account',
        fullNameLabel: 'Full name',
        emailLabel: 'Email',
        passwordLabel: 'Password',
        forgotPassword: 'Forgot your password?',
        loginButton: 'Login',
        signupButton: 'Create an account',
        loginWithGoogle: 'Login with Google',
        signupWithGoogle: 'Sign up with Google',
        noAccount: "Don't have an account?",
        signupLink: 'Sign up',
        hasAccount: 'Already have an account?',
        loginLink: 'Login',
        loginSuccessTitle: 'Login Successful',
        loginSuccessDescription: 'Welcome back!',
        signupSuccessTitle: 'Account Created',
        signupSuccessDescription: 'Your account has been successfully created.',
        userExistsTitle: 'User already exists',
        userExistsDescription: 'Please log in instead.',
        userNotFoundTitle: 'User not found',
        userNotFoundDescription: 'Please sign up first to create an account.',
        invalidCredentialsTitle: 'Invalid credentials',
        invalidCredentialsDescription: 'The password you entered is incorrect.',
        forgotPasswordTitle: 'Forgot Password',
        forgotPasswordDescription: 'Enter your email to receive a password reset link.',
        sendResetLinkButton: 'Send Reset Link',
        backToLogin: 'Back to login',
        resetLinkSentTitle: 'Reset Link Sent',
        resetLinkSentDescription: 'A password reset link has been sent to {{email}}.',
    }
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
    report: {
        title: 'नई स्वास्थ्य रिपोर्ट',
        description: 'एआई-संचालित जोखिम विश्लेषण के लिए एक नई रिपोर्ट जमा करें।',
        form: {
            title: 'स्वास्थ्य रिपोर्ट जमा करें',
            description: 'नीचे दिए गए विवरणों को अपनी पूरी क्षमता से भरें।',
            symptomsLabel: '1. देखे गए लक्षण',
            caseCountsLabel: '2. मामलों की संख्या',
            caseCountsPlaceholder: 'जैसे, 5',
            gpsLabel: '3. जीपीएस निर्देशांक',
            gpsPlaceholder: 'जैसे, 22.5726, 88.3639',
            waterDetailsLabel: '4. पानी के नमूने का विवरण',
            waterDetailsPlaceholder: 'पानी के स्रोत, रंग, गंध आदि का वर्णन करें।',
            turbidityLabel: '5. टर्बिडिटी (NTU)',
            turbidityPlaceholder: 'जैसे, 45',
            phLabel: '6. पीएच स्तर',
            phPlaceholder: 'जैसे, 6.8',
            bacteriaLabel: '7. जीवाणु संकेतक',
            bacteriaPlaceholder: 'जैसे, ई. कोलाई का पता चला',
            conductivityLabel: '8. चालकता (µS/cm)',
            conductivityPlaceholder: 'जैसे, 550',
            photoLabel: '9. फोटो अपलोड करें (वैकल्पिक)',
            submitButton: 'जोखिम स्कोर उत्पन्न करें',
            analyzingButton: 'विश्लेषण हो रहा है...',
             symptoms: {
                diarrhea: 'दस्त',
                vomiting: 'उल्टी',
                fever: 'बुखार',
                stomach_cramps: 'पेट में ऐंठन',
                dehydration: 'निर्जलीकरण',
                skin_rash: 'त्वचा पर लाल चकत्ते',
            },
        },
        toast: {
            locationSuccessTitle: 'स्थान प्राप्त हुआ',
            locationSuccessDescription: 'जीपीएस निर्देशांक सफलतापूर्वक अपडेट कर दिए गए हैं।',
            locationErrorTitle: 'स्थान प्राप्त करने में त्रुटि',
            locationErrorDescription: 'कृपया सुनिश्चित करें कि स्थान सेवाएं सक्षम हैं।',
            locationNotSupportedTitle: 'जियोलोकेशन समर्थित नहीं है',
            locationNotSupportedDescription: 'आपका ब्राउज़र जियोलोकेशन का समर्थन नहीं करता है।',
            analysisSuccessTitle: 'विश्लेषण पूर्ण',
            analysisSuccessDescription: 'जोखिम स्कोर और कार्य योजना सफलतापूर्वक उत्पन्न हुई।',
            analysisErrorTitle: 'विश्लेषण विफल',
            analysisErrorDescription: 'रिपोर्ट का विश्लेषण करते समय एक त्रुटि हुई। कृपया पुन: प्रयास करें।',
        }
    },
     riskDisplay: {
        riskLevels: {
            low: 'कम जोखिम का पता चला',
            medium: 'मध्यम जोखिम का पता चला',
            high: 'उच्च जोखिम का पता चला',
        },
        riskScores: {
            low: 'कम जोखिम',
            medium: 'मध्यम जोखिम',
            high: 'उच्च जोखिम',
        },
        factorsTitle: 'शीर्ष योगदान कारक',
        actionPlanTitle: 'अनुशंसित कार्य योजना',
    },
    aiPrediction: {
        title: 'एआई भविष्यवाणी केंद्र',
        description: 'ऐतिहासिक जोखिम आकलनों और भविष्यवाणियों की समीक्षा करें।',
    },
    predictionHistory: {
        title: 'भविष्यवाणी लॉग',
        description: 'सबसे हालिया रिपोर्ट और उनके एआई-जनित जोखिम स्कोर का एक लॉग।',
        risk: {
            high: 'उच्च',
            medium: 'मध्यम',
            low: 'कम',
        },
        viewDetails: 'विवरण देखें',
    },
    predictionDialog: {
        title: 'भविष्यवाणी विवरण: {{location}}',
        description: '{{date}} को विश्लेषण किया गया।',
        riskLevels: {
            low: 'कम जोखिम',
            medium: 'मध्यम जोखिम',
            high: 'उच्च जोखिम',
        },
        riskScores: {
            low: 'कम जोखिम',
            medium: 'मध्यम जोखिम',
            high: 'उच्च जोखिम',
        },
        factorsTitle: 'शीर्ष योगदान कारक',
        actionPlanTitle: 'अनुशंसित कार्य योजना',
    },
    waterQuality: {
        title: 'जल गुणवत्ता निगरानी',
        description: 'विभिन्न स्थानों से पानी के नमूनों का विस्तृत विश्लेषण।',
        table: {
            title: 'हाल के नमूना परिणाम',
            description: 'नवीनतम जल गुणवत्ता परीक्षणों का अवलोकन।',
            headers: {
                location: 'स्थान',
                turbidity: 'टर्बिडिटी (NTU)',
                ph: 'पीएच',
                bacteria: 'जीवाणु',
                status: 'स्थिति',
            },
        },
        chart: {
            title: 'स्थान के अनुसार टर्बिडिटी स्तर',
            description: 'उच्च टर्बिडिटी संदूषकों के उच्च जोखिम का संकेत दे सकती है।',
            label: 'टर्बिडिटी (NTU)',
        },
        data: {
            '1': { location: 'सेक्टर 7 - कुआं' },
            '2': { location: 'उत्तरी गांव नदी' },
            '3': { location: 'सामुदायिक पंप' },
            '4': { location: 'पूर्वी सेक्टर बोरहोल' },
            bacteria: {
                high: 'उच्च',
                medium: 'मध्यम',
                low: 'कम',
                none: 'कोई नहीं',
            },
            status: {
                poor: 'खराब',
                average: 'औसत',
                good: 'अच्छा',
                excellent: 'उत्कृष्ट',
            }
        },
    },
    alertsPage: {
        title: 'अलर्ट',
        description: 'सभी सिस्टम अलर्ट देखें और प्रबंधित करें।',
    },
    schedule: {
        title: 'मेरी अनुसूची',
        description: 'अपने आगामी कार्यों और नियुक्तियों की योजना बनाएं और देखें।',
        newEventButton: 'नया कार्यक्रम',
        upcomingEvents: 'आगामी कार्यक्रम',
        daySchedule: 'चयनित दिन के लिए आपकी अनुसूची।',
        noEvents: 'इस दिन के लिए कोई कार्यक्रम नहीं है।',
        popoverTitle: '{{date}} के लिए कार्यक्रम',
        events: {
            '1': { title: 'सेक्टर 4 में जल परीक्षण' },
            '2': { title: 'सामुदायिक स्वास्थ्य ब्रीफिंग' },
            '3': { title: 'गांव के बुजुर्ग से मिलें' },
            '4': { title: 'सेक्टर 7 के मामलों पर अनुवर्ती कार्रवाई', time: 'पूरा दिन' },
        }
    },
    addEventDialog: {
        title: 'नया कार्यक्रम जोड़ें',
        description: 'अपने नए अनुसूची आइटम के लिए विवरण दर्ज करें।',
        titleLabel: 'शीर्षक',
        timeLabel: 'समय',
        timePlaceholder: 'जैसे, सुबह 10:00 बजे या पूरा दिन',
        cancelButton: 'रद्द करें',
        addButton: 'कार्यक्रम जोड़ें',
        toast: {
            successTitle: 'कार्यक्रम जोड़ा गया',
            successDescription: '"{{title}}" को आपकी अनुसूची में जोड़ दिया गया है।',
            errorTitle: 'जानकारी अधूरी है',
            errorDescription: 'कृपया कार्यक्रम के लिए शीर्षक और समय दोनों भरें।',
        },
    },
     education: {
        title: 'शिक्षा संसाधन',
        description: 'सीएचडब्ल्यू के लिए प्रशिक्षण सामग्री और स्वास्थ्य जानकारी।',
        content: {
            '1': {
                title: 'जलजनित रोगों को समझना',
                description: 'दूषित पानी से फैलने वाली आम बीमारियों के बारे में जानें।',
                p1: 'जलजनित रोग रोगजनक सूक्ष्मजीवों के कारण होते हैं जो आमतौर पर दूषित मीठे पानी में फैलते हैं। संक्रमण आमतौर पर स्नान, धोने, पीने, भोजन तैयार करने, या इस तरह से संक्रमित भोजन के सेवन के दौरान होता है।',
                h4_1: 'आम बीमारियाँ:',
                li1_1_strong: 'हैजा:',
                li1_1_text: 'विब्रियो कोलेरी जीवाणु से दूषित भोजन या पानी के सेवन से होने वाला एक तीव्र डायरिया संक्रमण।',
                li1_2_strong: 'टाइफाइड बुखार:',
                li1_2_text: 'साल्मोनेला टाइफी जीवाणु के कारण होने वाली एक जानलेवा बीमारी। यह आमतौर पर दूषित भोजन या पानी से फैलता है।',
                li1_3_strong: 'हेपेटाइटिस ए:',
                li1_3_text: 'हेपेटाइटिस ए वायरस (एचएवी) के कारण होने वाला एक यकृत संक्रमण। यह अत्यधिक संक्रामक है और व्यक्ति-से-व्यक्ति और दूषित भोजन या पानी के माध्यम से फैलता है।',
                h4_2: 'रोकथाम:',
                li2_1: 'हमेशा सुरक्षित, उपचारित पानी पिएं।',
                li2_2: 'साबुन और पानी से हाथ अच्छी तरह धोएं।',
                li2_3: 'भोजन को ठीक से पकाएं।',
            },
            '2': {
                title: 'हाथ धोने की उचित तकनीक',
                description: 'प्रभावी हाथ धोने के लिए एक वीडियो गाइड।',
            },
            '3': {
                title: 'दूषित जल स्रोतों की पहचान करना',
                description: 'मुख्य संकेत कि पानी का स्रोत उपभोग के लिए असुरक्षित हो सकता है।',
                p1: "बीमारी को रोकने के लिए यह पहचानना महत्वपूर्ण है कि क्या कोई जल स्रोत दूषित है। जबकि प्रयोगशाला परीक्षण ही एकमात्र निश्चित तरीका है, कुछ संकेत हैं जिन्हें आप देख सकते हैं:",
                li1_strong: 'धुंधलापन (टर्बिडिटी):',
                li1_text: 'पानी साफ नहीं है।',
                li2_strong: 'दुर्गंध:',
                li2_text: 'सड़े हुए अंडे (सल्फर) या रसायनों जैसी गंध वाला पानी एक चेतावनी संकेत है।',
                li3_strong: 'तैलीय फिल्म:',
                li3_text: 'सतह पर एक इंद्रधनुषी रंग की या तैलीय चमक प्रदूषण का संकेत दे सकती है।',
                li4_strong: 'संदूषकों से निकटता:',
                li4_text: 'यदि स्रोत सेप्टिक टैंक, कचरा ढेर, या औद्योगिक क्षेत्रों के पास है तो सतर्क रहें।',
            },
            '4': {
                title: 'सामुदायिक स्वच्छता संवर्धन',
                description: 'अपने समुदाय में स्वच्छता प्रथाओं में सुधार के लिए रणनीतियाँ।',
                p1: 'अच्छी स्वच्छता को बढ़ावा देना एक सामुदायिक प्रयास है। एक सीएचडब्ल्यू के रूप में, आप इन पहलों का नेतृत्व कर सकते हैं:',
                li1_strong: 'कार्यशालाएं आयोजित करें:',
                li1_text: 'हाथ धोने, सुरक्षित जल भंडारण और खाद्य सुरक्षा पर सत्र आयोजित करें।',
                li2_strong: 'जानकारी वितरित करें:',
                li2_text: 'स्थानीय भाषाओं में पोस्टर और पैम्फलेट का उपयोग करें।',
                li3_strong: 'उदाहरण के द्वारा नेतृत्व करें:',
                li3_text: 'हमेशा स्वयं अच्छी स्वच्छता का अभ्यास करें।',
                li4_strong: 'सामुदायिक नेताओं को शामिल करें:',
                li4_text: 'इस कारण का समर्थन करने के लिए गांव के बुजुर्गों और नेताओं को शामिल करें।',
            }
        }
    },
    settings: {
        title: 'सेटिंग्स',
        description: 'अपने खाते और एप्लिकेशन सेटिंग्स प्रबंधित करें।',
        saveButton: 'सहेजें',
        profile: {
            title: 'प्रोफ़ाइल',
            description: 'अपनी व्यक्तिगत जानकारी अपडेट करें।',
            nameLabel: 'नाम',
            emailLabel: 'ईमेल',
        },
        notifications: {
            title: 'सूचनाएं',
            description: 'चुनें कि आप कैसे सूचित होना चाहते हैं।',
            emailLabel: 'ईमेल सूचनाएं',
            pushLabel: 'पुश सूचनाएं (ऐप)',
        },
        language: {
            title: 'भाषा',
            description: 'ऐप के लिए अपनी पसंदीदा भाषा सेट करें।',
            selectPlaceholder: 'एक भाषा चुनें',
        },
        toast: {
            title: 'सेटिंग्स सहेजी गईं',
            description: 'आपकी {{section}} सेटिंग्स अपडेट कर दी गई हैं।',
        }
    },
     auth: {
        loginTitle: 'लॉग इन करें',
        signupTitle: 'साइन अप करें',
        loginDescription: 'अपने खाते में लॉग इन करने के लिए नीचे अपना ईमेल दर्ज करें',
        signupDescription: 'एक खाता बनाने के लिए अपनी जानकारी दर्ज करें',
        fullNameLabel: 'पूरा नाम',
        emailLabel: 'ईमेल',
        passwordLabel: 'पासवर्ड',
        forgotPassword: 'अपना पासवर्ड भूल गए?',
        loginButton: 'लॉग इन करें',
        signupButton: 'खाता बनाएं',
        loginWithGoogle: 'Google से लॉग इन करें',
        signupWithGoogle: 'Google से साइन अप करें',
        noAccount: 'कोई खाता नहीं है?',
        signupLink: 'साइन अप करें',
        hasAccount: 'पहले से ही एक खाता है?',
        loginLink: 'लॉग इन करें',
        loginSuccessTitle: 'लॉगिन सफल',
        loginSuccessDescription: 'वापसी पर स्वागत है!',
        signupSuccessTitle: 'खाता बनाया गया',
        signupSuccessDescription: 'आपका खाता सफलतापूर्वक बना दिया गया है।',
        userExistsTitle: 'उपयोगकर्ता पहले से मौजूद है',
        userExistsDescription: 'कृपया इसके बजाय लॉग इन करें।',
        userNotFoundTitle: 'उपयोगकर्ता नहीं मिला',
        userNotFoundDescription: 'खाता बनाने के लिए कृपया पहले साइन अप करें।',
        invalidCredentialsTitle: 'अमान्य क्रेडेंशियल',
        invalidCredentialsDescription: 'आपके द्वारा दर्ज किया गया पासवर्ड गलत है।',
        forgotPasswordTitle: 'पासवर्ड भूल गए',
        forgotPasswordDescription: 'पासवर्ड रीसेट लिंक प्राप्त करने के लिए अपना ईमेल दर्ज करें।',
        sendResetLinkButton: 'रीसेट लिंक भेजें',
        backToLogin: 'लॉगिन पर वापस जाएं',
        resetLinkSentTitle: 'रीसेट लिंक भेजा गया',
        resetLinkSentDescription: 'एक पासवर्ड रीसेट लिंक {{email}} पर भेजा गया है।',
    }
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
  t: (key: string, options?: { [key: string]: string | number }) => string;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: string, options?: { [key: string]: string | number }) => {
    const keys = key.split('.');
    let result = (translations[language] as any);
    for (const k of keys) {
        result = result?.[k];
        if (result === undefined) {
             let fallbackResult = (translations['en'] as any);
             for (const fk of keys) {
                fallbackResult = fallbackResult?.[fk];
                if (fallbackResult === undefined) return key;
             }
             result = fallbackResult;
             break;
        }
    }
    
    if (typeof result === 'string' && options) {
        Object.keys(options).forEach(optKey => {
            result = result.replace(new RegExp(`{{${optKey}}}`, 'g'), String(options[optKey]));
        });
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
