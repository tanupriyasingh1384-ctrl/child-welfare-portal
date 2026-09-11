import React, { useState } from 'react';
import { ShieldAlert, Plus, MapPin, Phone, Users, AlertTriangle, Send, X, Clock, Flame } from 'lucide-react';
import { IncidentReport, Child, CreateIncidentDTO } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SosTabProps {
  incidents: IncidentReport[];
  children: Child[];
  onSubmitIncident: (data: CreateIncidentDTO) => Promise<void>;
  onUpdateStatus: (id: string, status: string) => Promise<void>;
}

export const SosTab: React.FC<SosTabProps> = ({
  incidents,
  children,
  onSubmitIncident,
  onUpdateStatus,
}) => {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<CreateIncidentDTO>({
    childId: '',
    reporterName: '',
    reporterPhone: '',
    incidentType: 'TRAFFICKING_RISK',
    locationDesc: '',
    district: 'Ranchi',
    riskLevel: 'HIGH',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmitIncident(formData);
      setFormData({
        childId: '',
        reporterName: '',
        reporterPhone: '',
        incidentType: 'TRAFFICKING_RISK',
        locationDesc: '',
        district: 'Ranchi',
        riskLevel: 'HIGH',
        description: '',
      });
      setShowForm(false);
    } finally {
      setSubmitting(false);
    }
  };

  const getIncidentTypeTranslation = (type: string) => {
    switch (type) {
      case 'TRAFFICKING_RISK':
        return t('typeTrafficking');
      case 'CHILD_LABOUR':
        return t('typeLabour');
      case 'PHYSICAL_SAFETY':
        return t('typePhysical');
      case 'ABANDONMENT':
        return t('typeAbandonment');
      default:
        return type.replace('_', ' ');
    }
  };

  const getRiskTranslation = (risk: string) => {
    switch (risk) {
      case 'CRITICAL':
        return t('riskCritical');
      case 'HIGH':
        return t('riskHigh');
      case 'MEDIUM':
        return t('riskMedium');
      case 'LOW':
        return t('riskLow');
      default:
        return risk;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Intake Toggle Banner */}
      <div className="glass-card p-6 sm:p-7 rounded-3xl border border-rose-500/20 relative overflow-hidden bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-950 shadow-2xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/30 text-white shrink-0 mt-0.5">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                {t('sosHeaderTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                {t('sosHeaderSub')}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-rose-600/30 transition-all duration-200 active:scale-95 shrink-0 self-start sm:self-auto"
          >
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{showForm ? t('btnCloseIntake') : t('btnNewIntake')}</span>
          </button>
        </div>
      </div>

      {/* Quick Intake Form */}
      {showForm && (
        <div className="glass-card border border-rose-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fade-in relative z-20">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              {t('quickIntakeTitle')}
            </h3>
            <span className="text-xs text-slate-400 font-medium">{t('routedNotice')}</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                  {t('reporterNameLabel')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('reporterNamePlaceholder')}
                  value={formData.reporterName}
                  onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                  {t('reporterPhoneLabel')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('reporterPhonePlaceholder')}
                  value={formData.reporterPhone}
                  onChange={(e) => setFormData({ ...formData, reporterPhone: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                  {t('linkChildLabel')}
                </label>
                <select
                  value={formData.childId}
                  onChange={(e) => setFormData({ ...formData, childId: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-rose-500 focus:outline-none transition"
                >
                  <option value="">{t('unregisteredChild')}</option>
                  {children.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.fullName} ({c.district})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                  {t('incidentTypeLabel')}
                </label>
                <select
                  value={formData.incidentType}
                  onChange={(e) => setFormData({ ...formData, incidentType: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-rose-500 focus:outline-none transition"
                >
                  <option value="TRAFFICKING_RISK">{t('typeTrafficking')}</option>
                  <option value="CHILD_LABOUR">{t('typeLabour')}</option>
                  <option value="PHYSICAL_SAFETY">{t('typePhysical')}</option>
                  <option value="ABANDONMENT">{t('typeAbandonment')}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                  {t('riskLevelLabel')}
                </label>
                <select
                  value={formData.riskLevel}
                  onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-rose-500 focus:outline-none transition"
                >
                  <option value="CRITICAL">{t('riskCritical')}</option>
                  <option value="HIGH">{t('riskHigh')}</option>
                  <option value="MEDIUM">{t('riskMedium')}</option>
                  <option value="LOW">{t('riskLow')}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                  {t('districtLabel')}
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-rose-500 focus:outline-none transition"
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
                {t('locationDescLabel')}
              </label>
              <input
                type="text"
                required
                placeholder={t('locationDescPlaceholder')}
                value={formData.locationDesc}
                onChange={(e) => setFormData({ ...formData, locationDesc: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                {t('incidentDescLabel')}
              </label>
              <textarea
                required
                rows={3}
                placeholder={t('incidentDescPlaceholder')}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none transition"
              />
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
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-rose-600/30 transition disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? t('submittingSos') : t('btnSubmitSos')}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Incidents Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {incidents.length === 0 ? (
          <div className="col-span-2 py-20 text-center text-slate-500 glass-card rounded-3xl border border-slate-800">
            {t('noIncidentsLogged')}
          </div>
        ) : (
          incidents.map((inc) => (
            <div
              key={inc.id}
              className="glass-card glass-card-hover rounded-3xl p-6 sm:p-7 space-y-4 relative overflow-hidden"
            >
              {/* Top Risk & Status Header */}
              <div className="flex justify-between items-start gap-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-sm ${
                        inc.riskLevel === 'CRITICAL'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                          : inc.riskLevel === 'HIGH'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                      }`}
                    >
                      {getRiskTranslation(inc.riskLevel)}
                    </span>
                    <span className="text-xs font-bold text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                      {inc.district}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-white tracking-tight">
                    {getIncidentTypeTranslation(inc.incidentType)}
                  </h3>
                </div>

                {/* Status Dropdown Picker */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-slate-400 hidden sm:inline">{t('statusLabel')}</span>
                  <select
                    value={inc.status}
                    onChange={(e) => onUpdateStatus(inc.id, e.target.value)}
                    className={`text-xs font-extrabold rounded-xl px-3 py-1.5 focus:outline-none border shadow-inner transition cursor-pointer ${
                      inc.status === 'OPEN'
                        ? 'bg-rose-950/80 border-rose-500/50 text-rose-300'
                        : inc.status === 'IN_REVIEW'
                        ? 'bg-amber-950/80 border-amber-500/50 text-amber-300'
                        : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                    }`}
                  >
                    <option value="OPEN">{t('statusOpen')}</option>
                    <option value="IN_REVIEW">{t('statusInReview')}</option>
                    <option value="RESOLVED">{t('statusResolved')}</option>
                  </select>
                </div>
              </div>

              {/* Description Body */}
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                {inc.description}
              </p>

              {/* Footer Metadata */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-400 font-medium">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{inc.locationDesc}, {inc.district}</span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{inc.reporterName} ({inc.reporterPhone})</span>
                  </div>
                </div>

                {inc.child && (
                  <div className="flex items-center gap-2 text-cyan-300 font-semibold pt-1 border-t border-slate-800/40">
                    <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{t('linkedChild')} {inc.child.fullName} ({inc.child.villageOrCity})</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
