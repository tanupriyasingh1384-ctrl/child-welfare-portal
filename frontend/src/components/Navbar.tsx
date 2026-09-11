import React from 'react';
import { Plus, Activity, Check, PhoneCall, ShieldCheck, HeartPulse } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  isLive: boolean;
  onOpenRegisterChild: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isLive, onOpenRegisterChild }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 shadow-2xl">
      {/* Indian Tricolor Top Ribbon Accent */}
      <div className="h-1.5 w-full grid grid-cols-3">
        <div className="bg-[#FF9933]"></div>
        <div className="bg-white"></div>
        <div className="bg-[#138808]"></div>
      </div>

      {/* Official Government Ministry Header Strip */}
      <div className="bg-slate-950/95 border-b border-slate-800/80 px-4 sm:px-8 py-1.5 flex flex-wrap items-center justify-between text-[11px] font-semibold text-slate-300 gap-2 backdrop-blur-md">
        <div className="flex items-center gap-2">
          {/* Ashoka Stupa / Government Emblem Representation */}
          <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-[10px] font-black">
            🏛️
          </div>
          <span className="text-amber-400 font-bold tracking-wide">
            {t('govtTopHeader')}
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-400">POSHAN Abhiyaan • National Nutrition Mission</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-3 text-slate-300">
            <span className="flex items-center gap-1.5 bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2.5 py-0.5 rounded-full font-bold">
              <PhoneCall className="w-3 h-3 animate-pulse" />
              {t('helplineChild')}
            </span>
            <span className="flex items-center gap-1.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-bold">
              <HeartPulse className="w-3 h-3 text-amber-400" />
              {t('helplinePoshan')}
            </span>
          </div>

          {/* Backend Live Status Badge */}
          {isLive ? (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{t('liveConnected')}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold">
              <Activity className="w-3 h-3 animate-spin" />
              <span>{t('connecting')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Portal Navigation Navbar */}
      <div className="bg-slate-900/90 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand / Emblem Logo & Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-600 to-rose-600 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-2 ring-white/10 shrink-0">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-lg sm:text-xl text-white tracking-tight leading-tight">
                  {t('poshanTitle')}
                </h1>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-widest">
                  GOVT VERIFIED
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
                <span>{t('portalSubtitle')}</span>
              </p>
            </div>
          </div>

          {/* Right Controls: Language & Register Child Action */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Selector */}
            <div className="relative">
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 shadow-inner">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    language === 'en'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Switch to English"
                >
                  {language === 'en' && <Check className="w-3 h-3" />}
                  English
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    language === 'hi'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="हिन्दी में बदलें"
                >
                  {language === 'hi' && <Check className="w-3 h-3" />}
                  हिन्दी
                </button>
              </div>
            </div>

            {/* Register Child CTA Button */}
            <button
              onClick={onOpenRegisterChild}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-lg shadow-amber-500/25 ring-1 ring-white/20 active:scale-95 shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span className="hidden sm:inline">{t('registerChildBtn')}</span>
              <span className="sm:hidden">+</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
