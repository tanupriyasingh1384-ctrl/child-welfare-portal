import React, { useState } from 'react';
import { Users, X, UserPlus } from 'lucide-react';
import { CreateChildDTO } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface RegisterChildModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitChild: (data: CreateChildDTO) => Promise<void>;
}

export const RegisterChildModal: React.FC<RegisterChildModalProps> = ({
  isOpen,
  onClose,
  onSubmitChild,
}) => {
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<CreateChildDTO>({
    fullName: '',
    ageYears: 5,
    gender: 'MALE',
    guardianName: '',
    guardianPhone: '',
    villageOrCity: '',
    district: 'Ranchi',
    state: 'Jharkhand',
    schoolOrCenterId: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmitChild(formData);
      setFormData({
        fullName: '',
        ageYears: 5,
        gender: 'MALE',
        guardianName: '',
        guardianPhone: '',
        villageOrCity: '',
        district: 'Ranchi',
        state: 'Jharkhand',
        schoolOrCenterId: '',
      });
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="glass-card border border-cyan-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-fade-in relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -right-16 -top-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-between items-center border-b border-slate-800 pb-4 relative z-10">
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <span>{t('modalTitle')}</span>
          </h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/60 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm relative z-10">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
              {t('fullNameLabel')}
            </label>
            <input
              type="text"
              required
              placeholder={t('fullNamePlaceholder')}
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                {t('ageYearsLabel')}
              </label>
              <input
                type="number"
                min={0}
                max={18}
                value={formData.ageYears}
                onChange={(e) => setFormData({ ...formData, ageYears: Number(e.target.value) })}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                {t('genderLabel')}
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none transition"
              >
                <option value="MALE">{t('genderMale')}</option>
                <option value="FEMALE">{t('genderFemale')}</option>
                <option value="OTHER">{t('genderOther')}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                {t('guardianNameLabel')}
              </label>
              <input
                type="text"
                placeholder={t('guardianNamePlaceholder')}
                value={formData.guardianName}
                onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                {t('guardianPhoneLabel')}
              </label>
              <input
                type="text"
                placeholder={t('guardianPhonePlaceholder')}
                value={formData.guardianPhone}
                onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                {t('villageCityLabel')}
              </label>
              <input
                type="text"
                required
                placeholder={t('villageCityPlaceholder')}
                value={formData.villageOrCity}
                onChange={(e) => setFormData({ ...formData, villageOrCity: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                {t('districtLabel')}
              </label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none transition"
              >
                <option value="Ranchi">{t('districtRanchi')}</option>
                <option value="Dhanbad">{t('districtDhanbad')}</option>
                <option value="Gumla">{t('districtGumla')}</option>
                <option value="Hazaribagh">{t('districtHazaribagh')}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
              {t('schoolCenterIdLabel')}
            </label>
            <input
              type="text"
              placeholder={t('schoolCenterIdPlaceholder')}
              value={formData.schoolOrCenterId}
              onChange={(e) => setFormData({ ...formData, schoolOrCenterId: e.target.value })}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition"
            >
              {t('cancelBtn')}
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition disabled:opacity-50"
            >
              {submitting ? t('registering') : t('btnRegisterProfile')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
