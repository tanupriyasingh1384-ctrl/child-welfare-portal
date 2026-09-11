import React, { useState } from 'react';
import { HeartPulse, Plus, Activity, AlertCircle, CheckCircle, Scale, Ruler, X } from 'lucide-react';
import { NutritionLog, Child, CreateNutritionDTO } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface NutritionTabProps {
  nutritionLogs: NutritionLog[];
  children: Child[];
  onSubmitNutrition: (data: CreateNutritionDTO) => Promise<void>;
}

export const NutritionTab: React.FC<NutritionTabProps> = ({
  nutritionLogs,
  children,
  onSubmitNutrition,
}) => {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<CreateNutritionDTO>({
    childId: '',
    ageMonths: 48,
    weightKg: 12.0,
    heightCm: 100.0,
  });

  // Calculate live BMI status for form preview
  const heightMeters = formData.heightCm / 100;
  const previewBmi = heightMeters > 0 ? formData.weightKg / (heightMeters * heightMeters) : 0;
  const previewStatus =
    previewBmi < 13.5
      ? 'SEVERE_ACUTE_MALNUTRITION'
      : previewBmi < 15.5
      ? 'MODERATE'
      : 'NORMAL';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.childId) {
      alert('Please select a child profile.');
      return;
    }
    setSubmitting(true);
    try {
      await onSubmitNutrition(formData);
      setFormData({
        childId: '',
        ageMonths: 48,
        weightKg: 12.0,
        heightCm: 100.0,
      });
      setShowForm(false);
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SEVERE_ACUTE_MALNUTRITION':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm">
            <AlertCircle className="w-3.5 h-3.5" />
            {t('statusSam')}
          </span>
        );
      case 'MODERATE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm">
            <AlertCircle className="w-3.5 h-3.5" />
            {t('statusModerate')}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm">
            <CheckCircle className="w-3.5 h-3.5" />
            {t('statusNormal')}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Toggle Button */}
      <div className="glass-card p-6 sm:p-7 rounded-3xl border border-amber-500/20 relative overflow-hidden bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 shadow-2xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30 text-white shrink-0 mt-0.5">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                {t('nutritionTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                {t('nutritionSub')}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-amber-600/30 transition-all duration-200 active:scale-95 shrink-0 self-start sm:self-auto"
          >
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{showForm ? t('btnCloseGrowth') : t('btnLogGrowth')}</span>
          </button>
        </div>
      </div>

      {/* Growth Intake Form */}
      {showForm && (
        <div className="glass-card border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fade-in relative z-20">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2.5">
              <Activity className="w-5 h-5 text-amber-500" />
              {t('intakeGrowthTitle')}
            </h3>
            <span className="text-xs text-slate-400 font-medium">{t('whoIndicatorNotice')}</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                  {t('selectChildLabel')}
                </label>
                <select
                  required
                  value={formData.childId}
                  onChange={(e) => setFormData({ ...formData, childId: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-amber-500 focus:outline-none transition"
                >
                  <option value="">{t('chooseChildPlaceholder')}</option>
                  {children.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.fullName} ({c.district}) - {c.villageOrCity}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                  {t('ageMonthsLabel')}
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  max={216}
                  value={formData.ageMonths}
                  onChange={(e) => setFormData({ ...formData, ageMonths: Number(e.target.value) })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-amber-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                  {t('weightKgLabel')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  min={1}
                  max={100}
                  value={formData.weightKg}
                  onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-amber-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                  {t('heightCmLabel')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  min={30}
                  max={200}
                  value={formData.heightCm}
                  onChange={(e) => setFormData({ ...formData, heightCm: Number(e.target.value) })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-amber-500 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Real-time Indicator Box */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 font-semibold block">{t('computedBmi')}</span>
                <span className="text-xl font-extrabold text-white">
                  {previewBmi > 0 ? previewBmi.toFixed(2) : '0.00'} kg/m²
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-semibold">{t('classifiedStatus')}</span>
                {getStatusBadge(previewStatus)}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition"
              >
                {t('cancelBtn')}
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-600/30 transition disabled:opacity-50"
              >
                <HeartPulse className="w-4 h-4" />
                <span>{submitting ? t('savingMetric') : t('btnSaveMetric')}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Classy Table */}
      <div className="glass-card rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-xs uppercase text-slate-400 font-extrabold tracking-wider">
                <th className="p-4 sm:p-5">{t('thChildName')}</th>
                <th className="p-4 sm:p-5">{t('thDistrict')}</th>
                <th className="p-4 sm:p-5">{t('thAgeMonths')}</th>
                <th className="p-4 sm:p-5">{t('thWeight')}</th>
                <th className="p-4 sm:p-5">{t('thHeight')}</th>
                <th className="p-4 sm:p-5">{t('thStatus')}</th>
                <th className="p-4 sm:p-5">{t('thDate')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-sm font-medium">
              {nutritionLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-500">
                    {t('noNutritionRecords')}
                  </td>
                </tr>
              ) : (
                nutritionLogs.map((nut) => (
                  <tr key={nut.id} className="hover:bg-slate-800/40 transition duration-150">
                    <td className="p-4 sm:p-5 font-bold text-white">{nut.child?.fullName || 'Child Minor'}</td>
                    <td className="p-4 sm:p-5 text-slate-400">{nut.child?.district || 'N/A'}</td>
                    <td className="p-4 sm:p-5 text-slate-300">{nut.ageMonths}</td>
                    <td className="p-4 sm:p-5 text-slate-300">{nut.weightKg} kg</td>
                    <td className="p-4 sm:p-5 text-slate-300">{nut.heightCm} cm</td>
                    <td className="p-4 sm:p-5">{getStatusBadge(nut.status)}</td>
                    <td className="p-4 sm:p-5 text-xs text-slate-400">
                      {new Date(nut.recordedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
