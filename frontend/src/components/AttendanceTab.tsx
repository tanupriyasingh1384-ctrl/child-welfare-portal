import React, { useState } from 'react';
import { UserCheck, Plus, AlertTriangle, CheckCircle2, School, Calendar, X } from 'lucide-react';
import { AttendanceRecord, Child, CreateAttendanceDTO } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface AttendanceTabProps {
  attendanceRecords: AttendanceRecord[];
  children: Child[];
  onSubmitAttendance: (data: CreateAttendanceDTO) => Promise<void>;
}

export const AttendanceTab: React.FC<AttendanceTabProps> = ({
  attendanceRecords,
  children,
  onSubmitAttendance,
}) => {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<CreateAttendanceDTO>({
    childId: '',
    schoolId: '',
    consecutiveAbsences: 5,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.childId || !formData.schoolId) {
      alert('Child and School ID are required.');
      return;
    }
    setSubmitting(true);
    try {
      await onSubmitAttendance(formData);
      setFormData({
        childId: '',
        schoolId: '',
        consecutiveAbsences: 5,
      });
      setShowForm(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="glass-card p-6 sm:p-7 rounded-3xl border border-purple-500/20 relative overflow-hidden bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-950 shadow-2xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30 text-white shrink-0 mt-0.5">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                {t('attendanceTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                {t('attendanceSub')}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-purple-600/30 transition-all duration-200 active:scale-95 shrink-0 self-start sm:self-auto"
          >
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{showForm ? t('btnCloseAbsence') : t('btnLogAbsence')}</span>
          </button>
        </div>
      </div>

      {/* Intake Form */}
      {showForm && (
        <div className="glass-card border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fade-in relative z-20">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-purple-400 flex items-center gap-2.5">
              <School className="w-5 h-5 text-purple-500" />
              {t('logAbsenceTitle')}
            </h3>
            <span className="text-xs text-slate-400 font-medium">{t('dropoutNotice')}</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                  {t('selectStudentLabel')}
                </label>
                <select
                  required
                  value={formData.childId}
                  onChange={(e) => {
                    const selected = children.find((c) => c.id === e.target.value);
                    setFormData({
                      ...formData,
                      childId: e.target.value,
                      schoolId: selected?.schoolOrCenterId || formData.schoolId,
                    });
                  }}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-purple-500 focus:outline-none transition"
                >
                  <option value="">{t('chooseStudentPlaceholder')}</option>
                  {children.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.fullName} ({c.district}) - {c.schoolOrCenterId || 'No School Code'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                  {t('schoolCodeLabel')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('schoolCodePlaceholder')}
                  value={formData.schoolId}
                  onChange={(e) => setFormData({ ...formData, schoolId: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-purple-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                  {t('consecutiveAbsencesLabel')}
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  max={365}
                  value={formData.consecutiveAbsences}
                  onChange={(e) => setFormData({ ...formData, consecutiveAbsences: Number(e.target.value) })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-purple-500 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Risk Preview Banner */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400 font-semibold">{t('autoRiskClassification')}</span>
              {formData.consecutiveAbsences >= 5 ? (
                <span className="flex items-center gap-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-black px-3.5 py-1.5 rounded-full animate-pulse shadow-sm">
                  <AlertTriangle className="w-4 h-4" />
                  {t('criticalDropoutRisk')}
                </span>
              ) : formData.consecutiveAbsences >= 3 ? (
                <span className="flex items-center gap-1.5 bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-black px-3.5 py-1.5 rounded-full shadow-sm">
                  <AlertTriangle className="w-4 h-4" />
                  {t('flaggedDropoutRisk')}
                </span>
              ) : (
                <span className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black px-3.5 py-1.5 rounded-full shadow-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  {t('normalAttendance')}
                </span>
              )}
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
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-purple-600/30 transition disabled:opacity-50"
              >
                <UserCheck className="w-4 h-4" />
                <span>{submitting ? t('savingAbsence') : t('btnSaveAbsence')}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Student Attendance Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attendanceRecords.length === 0 ? (
          <div className="col-span-3 py-20 text-center text-slate-500 glass-card rounded-3xl border border-slate-800">
            {t('noAttendanceRecords')}
          </div>
        ) : (
          attendanceRecords.map((att) => {
            const isSevereRisk = att.consecutiveAbsences >= 5;
            return (
              <div
                key={att.id}
                className={`glass-card glass-card-hover rounded-3xl p-6 space-y-4 relative overflow-hidden ${
                  isSevereRisk
                    ? 'border-rose-500/60 shadow-xl shadow-rose-500/10'
                    : att.riskFlagged
                    ? 'border-purple-500/50 shadow-lg shadow-purple-500/10'
                    : 'border-slate-800'
                }`}
              >
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h3 className="font-extrabold text-lg text-white">{att.child?.fullName || 'Student Minor'}</h3>
                    <p className="text-xs font-semibold text-slate-400 mt-0.5">School ID: {att.schoolId}</p>
                  </div>
                  {isSevereRisk ? (
                    <span className="flex items-center gap-1 bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-black px-3 py-1 rounded-full animate-pulse">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {t('critical5Days')}
                    </span>
                  ) : att.riskFlagged ? (
                    <span className="flex items-center gap-1 bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-black px-3 py-1 rounded-full">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {t('riskFlaggedTag')}
                    </span>
                  ) : (
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black px-3 py-1 rounded-full">
                      {t('statusNormal')}
                    </span>
                  )}
                </div>

                <div className="bg-slate-950/80 p-4 rounded-2xl flex items-center justify-between border border-slate-800/80">
                  <span className="text-xs text-slate-400 font-semibold">{t('consecutiveAbsencesCount')}</span>
                  <span
                    className={`text-2xl font-black ${
                      isSevereRisk
                        ? 'text-rose-400'
                        : att.riskFlagged
                        ? 'text-purple-400'
                        : 'text-slate-200'
                    }`}
                  >
                    {att.consecutiveAbsences} {t('days')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 font-medium pt-3 border-t border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{t('lastAttended')} {new Date(att.lastAttendDate).toLocaleDateString()}</span>
                  </div>
                  <span>{t('districtLabel')}: {att.child?.district || 'N/A'}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
