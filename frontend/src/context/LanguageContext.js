import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';
const LanguageContext = createContext(undefined);
export const LanguageProvider = ({ children }) => {
    const [language, setLanguageState] = useState(() => {
        const saved = localStorage.getItem('cw_app_lang');
        return saved === 'hi' ? 'hi' : 'en';
    });
    const setLanguage = (lang) => {
        setLanguageState(lang);
        localStorage.setItem('cw_app_lang', lang);
        if (lang === 'hi') {
            document.documentElement.lang = 'hi';
        }
        else {
            document.documentElement.lang = 'en';
        }
    };
    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);
    const t = (key) => {
        return translations[language][key] || translations['en'][key] || key;
    };
    return (_jsx(LanguageContext.Provider, { value: { language, setLanguage, t }, children: children }));
};
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
