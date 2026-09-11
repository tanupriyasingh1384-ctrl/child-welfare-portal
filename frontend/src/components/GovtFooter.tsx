import React from 'react';
import { Shield, PhoneCall, ExternalLink, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const GovtFooter: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-16 bg-slate-950 border-t border-slate-800 text-slate-400 relative overflow-hidden">
      {/* Indian Tricolor Accent Strip */}
      <div className="h-1.5 w-full grid grid-cols-3">
        <div className="bg-[#FF9933]"></div>
        <div className="bg-white"></div>
        <div className="bg-[#138808]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Ministry Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">
                  {t('poshanTitle')}
                </h3>
                <p className="text-xs text-amber-400 font-semibold">
                  {t('govtTopHeader')}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              {t('footerGovt')}
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t('footerNic')}</span>
            </p>
          </div>

          {/* Column 2: Emergency Helplines */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-rose-400" />
              <span>Emergency Helplines</span>
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li className="flex items-center justify-between bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-300">Childline SOS</span>
                <span className="text-rose-400 font-black">1098</span>
              </li>
              <li className="flex items-center justify-between bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-300">Poshan Abhiyaan</span>
                <span className="text-amber-400 font-black">14408</span>
              </li>
              <li className="flex items-center justify-between bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-300">National Emergency</span>
                <span className="text-emerald-400 font-black">112</span>
              </li>
            </ul>
          </div>

          {/* Column 3: National Portals */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ExternalLink className="w-4 h-4 text-cyan-400" />
              <span>National Portals</span>
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href="https://poshantracker.in" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition flex items-center gap-1">
                  <span>Poshan Tracker Official</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://wcd.nic.in" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition flex items-center gap-1">
                  <span>Ministry of WCD</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://www.india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition flex items-center gap-1">
                  <span>India.gov.in National Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://mygov.in" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition flex items-center gap-1">
                  <span>MyGov Citizen Engagement</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t('footerCopyright')}</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
              NIC Cloud Verified
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
              SSL Encrypted
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
