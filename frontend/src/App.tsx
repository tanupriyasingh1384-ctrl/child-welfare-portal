import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { GovtFooter } from './components/GovtFooter';
import { MetricCard } from './components/MetricCard';
import { SosTab } from './components/SosTab';
import { NutritionTab } from './components/NutritionTab';
import { AttendanceTab } from './components/AttendanceTab';
import { RegisterChildModal } from './components/RegisterChildModal';
import { Toast } from './components/Toast';
import { api } from './services/api';
import { useLanguage } from './context/LanguageContext';
import {
  Child,
  IncidentReport,
  NutritionLog,
  AttendanceRecord,
  CreateChildDTO,
  CreateIncidentDTO,
  CreateNutritionDTO,
  CreateAttendanceDTO,
} from './types';
import {
  ShieldAlert,
  HeartPulse,
  UserCheck,
  Users,
  Filter,
  Search,
  Activity,
  Plus,
  MapPin,
  Sparkles,
} from 'lucide-react';

export default function App() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'incidents' | 'nutrition' | 'attendance' | 'children'>('incidents');
  const [districtFilter, setDistrictFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Data State
  const [children, setChildren] = useState<Child[]>([]);
  const [incidents, setIncidents] = useState<IncidentReport[]>([]);
  const [nutritionLogs, setNutritionLogs] = useState<NutritionLog[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);

  // UI Modal & Toast State
  const [showChildModal, setShowChildModal] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadPortalData = async () => {
    setLoading(true);
    try {
      const [childRes, incRes, nutRes, attRes] = await Promise.all([
        api.getChildren(),
        api.getIncidents(),
        api.getNutritionLogs(),
        api.getAttendanceRecords(),
      ]);

      setChildren(childRes.data || []);
      setIncidents(incRes.data || []);
      setNutritionLogs(nutRes.data || []);
      setAttendanceRecords(attRes.data || []);
      setIsLive(true);
    } catch (err) {
      console.error('API Error:', err);
      setIsLive(false);
      showToast('Failed to connect to backend server on port 5000', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortalData();
  }, []);

  // Handlers
  const handleRegisterChild = async (data: CreateChildDTO) => {
    try {
      await api.createChild(data);
      showToast(`Child profile for "${data.fullName}" registered successfully!`);
      loadPortalData();
    } catch (err: any) {
      showToast(err.response?.data?.error?.message || 'Error registering child profile', 'error');
    }
  };

  const handleReportIncident = async (data: CreateIncidentDTO) => {
    try {
      await api.createIncident(data);
      showToast('Emergency SOS Incident Report submitted successfully!');
      loadPortalData();
    } catch (err: any) {
      showToast(err.response?.data?.error?.message || 'Error submitting incident report', 'error');
    }
  };

  const handleUpdateIncidentStatus = async (id: string, status: string) => {
    try {
      await api.updateIncidentStatus(id, status);
      showToast(`Incident status updated to ${status}`);
      loadPortalData();
    } catch (err: any) {
      showToast(err.response?.data?.error?.message || 'Error updating status', 'error');
    }
  };

  const handleLogNutrition = async (data: CreateNutritionDTO) => {
    try {
      const res = await api.createNutritionLog(data);
      showToast(`Growth metric logged! Status: ${res.data.status.replace('_', ' ')}`);
      loadPortalData();
    } catch (err: any) {
      showToast(err.response?.data?.error?.message || 'Error logging nutrition metric', 'error');
    }
  };

  const handleRecordAttendance = async (data: CreateAttendanceDTO) => {
    try {
      const res = await api.createAttendanceRecord(data);
      if (res.data.riskFlagged) {
        showToast(`Absence recorded! DROPOUT RISK FLAGGED (${res.data.consecutiveAbsences} days)`, 'error');
      } else {
        showToast('Absence record saved successfully!');
      }
      loadPortalData();
    } catch (err: any) {
      showToast(err.response?.data?.error?.message || 'Error saving attendance record', 'error');
    }
  };

  // Filtered views
  const filteredIncidents = incidents.filter(
    (inc) =>
      (districtFilter === 'ALL' || inc.district === districtFilter) &&
      (inc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inc.reporterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (inc.child?.fullName && inc.child.fullName.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const filteredNutrition = nutritionLogs.filter(
    (nut) =>
      (districtFilter === 'ALL' || nut.child?.district === districtFilter) &&
      (!searchQuery || (nut.child?.fullName && nut.child.fullName.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const filteredAttendance = attendanceRecords.filter(
    (att) =>
      (districtFilter === 'ALL' || att.child?.district === districtFilter) &&
      (!searchQuery || (att.child?.fullName && att.child.fullName.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const filteredChildren = children.filter(
    (c) =>
      (districtFilter === 'ALL' || c.district === districtFilter) &&
      (c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.villageOrCity.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Stats Counters
  const samCount = nutritionLogs.filter((n) => n.status === 'SEVERE_ACUTE_MALNUTRITION').length;
  const dropoutCount = attendanceRecords.filter((a) => a.riskFlagged).length;
  const criticalIncidents = incidents.filter((i) => i.riskLevel === 'CRITICAL' || i.riskLevel === 'HIGH').length;

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Top Navbar */}
      <Navbar
        isLive={isLive}
        onOpenRegisterChild={() => setShowChildModal(true)}
      />

      {/* Main Dashboard Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-8">
        {/* Poshan Tracker Photo Hero & Announcement Banner */}
        <HeroCarousel />

        {/* Key Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard
            title={t('metricTotalChildren')}
            value={children.length}
            subtitle={t('metricTotalChildrenSub')}
            icon={<Users className="w-6 h-6" />}
            variant="blue"
          />

          <MetricCard
            title={t('metricIncidents')}
            value={incidents.length}
            subtitle={`${criticalIncidents} ${t('metricIncidentsSub')}`}
            icon={<ShieldAlert className="w-6 h-6" />}
            variant="red"
          />

          <MetricCard
            title={t('metricMalnutrition')}
            value={samCount}
            subtitle={t('metricMalnutritionSub')}
            icon={<HeartPulse className="w-6 h-6" />}
            variant="amber"
          />

          <MetricCard
            title={t('metricDropout')}
            value={dropoutCount}
            subtitle={t('metricDropoutSub')}
            icon={<UserCheck className="w-6 h-6" />}
            variant="purple"
          />
        </div>

        {/* Tab & Search Filter Navigation Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 glass-panel p-3.5 rounded-3xl border border-slate-800/80 shadow-2xl">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('incidents')}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${
                activeTab === 'incidents'
                  ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-600/25 ring-1 ring-white/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{t('tabSos')}</span>
              <span className="ml-1 px-2 py-0.5 rounded-full bg-black/30 text-[11px] font-black">
                {incidents.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('nutrition')}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${
                activeTab === 'nutrition'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25 ring-1 ring-white/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <HeartPulse className="w-4 h-4" />
              <span>{t('tabNutrition')}</span>
              <span className="ml-1 px-2 py-0.5 rounded-full bg-black/30 text-[11px] font-black">
                {nutritionLogs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('attendance')}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${
                activeTab === 'attendance'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/25 ring-1 ring-white/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>{t('tabAttendance')}</span>
              <span className="ml-1 px-2 py-0.5 rounded-full bg-black/30 text-[11px] font-black">
                {attendanceRecords.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('children')}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${
                activeTab === 'children'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 ring-1 ring-white/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{t('tabChildren')}</span>
              <span className="ml-1 px-2 py-0.5 rounded-full bg-black/30 text-[11px] font-black">
                {children.length}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Filter className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="bg-slate-900/90 border border-slate-700/80 text-slate-200 text-xs sm:text-sm rounded-xl pl-9 pr-8 py-2 font-bold focus:outline-none focus:border-cyan-500 transition"
              >
                <option value="ALL">{t('filterAllDistricts')}</option>
                <option value="Ranchi">{t('districtRanchi')}</option>
                <option value="Dhanbad">{t('districtDhanbad')}</option>
                <option value="Gumla">{t('districtGumla')}</option>
                <option value="Hazaribagh">{t('districtHazaribagh')}</option>
              </select>
            </div>

            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 text-slate-200 text-xs sm:text-sm rounded-xl pl-9 pr-4 py-2 placeholder-slate-500 font-medium focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Tab Content Views */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-4 glass-card rounded-3xl border border-slate-800">
            <Activity className="w-10 h-10 animate-spin text-cyan-400" />
            <p className="text-sm font-semibold">{t('loadingData')}</p>
          </div>
        ) : (
          <>
            {/* Tab 1: Emergency SOS Reporting */}
            {activeTab === 'incidents' && (
              <SosTab
                incidents={filteredIncidents}
                children={children}
                onSubmitIncident={handleReportIncident}
                onUpdateStatus={handleUpdateIncidentStatus}
              />
            )}

            {/* Tab 2: Nutrition Monitoring */}
            {activeTab === 'nutrition' && (
              <NutritionTab
                nutritionLogs={filteredNutrition}
                children={children}
                onSubmitNutrition={handleLogNutrition}
              />
            )}

            {/* Tab 3: Attendance & Dropout Tracker */}
            {activeTab === 'attendance' && (
              <AttendanceTab
                attendanceRecords={filteredAttendance}
                children={children}
                onSubmitAttendance={handleRecordAttendance}
              />
            )}

            {/* Tab 4: Child Master Directory */}
            {activeTab === 'children' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
                    <Users className="text-cyan-400 w-6 h-6" />
                    <span>{t('directoryTitle')}</span>
                  </h2>
                  <button
                    onClick={() => setShowChildModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold text-xs sm:text-sm flex items-center gap-2 transition shadow-lg shadow-cyan-500/10 active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t('btnRegisterNewChild')}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredChildren.length === 0 ? (
                    <div className="col-span-3 py-20 text-center text-slate-500 glass-card rounded-3xl border border-slate-800">
                      {t('noChildrenRegistered')}
                    </div>
                  ) : (
                    filteredChildren.map((c) => (
                      <div
                        key={c.id}
                        className="glass-card glass-card-hover rounded-3xl p-6 space-y-4 relative overflow-hidden"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-extrabold text-lg text-white">{c.fullName}</h3>
                            <p className="text-xs font-semibold text-slate-400 mt-0.5">
                              {c.gender === 'FEMALE' ? t('genderFemale') : c.gender === 'MALE' ? t('genderMale') : c.gender || 'N/A'} • {c.ageYears ? `${c.ageYears} Yrs` : 'N/A'}
                            </p>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black border border-cyan-500/40">
                            {c.district}
                          </span>
                        </div>

                        <div className="space-y-2 text-xs text-slate-300 bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 font-medium">
                          <p>
                            <strong className="text-slate-400">{t('guardianLabel')}</strong> {c.guardianName || 'N/A'}{' '}
                            {c.guardianPhone ? `(${c.guardianPhone})` : ''}
                          </p>
                          <p>
                            <strong className="text-slate-400">{t('locationLabel')}</strong> {c.villageOrCity}, {c.district},{' '}
                            {c.state}
                          </p>
                          <p>
                            <strong className="text-slate-400">{t('schoolCenterCodeLabel')}</strong>{' '}
                            {c.schoolOrCenterId || 'N/A'}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-xs font-bold text-slate-400 pt-3 border-t border-slate-800">
                          <span>
                            {t('incidentsCount')} <strong className="text-white ml-1">{c.incidents?.length || 0}</strong>
                          </span>
                          <span>
                            {t('nutritionCount')} <strong className="text-white ml-1">{c.nutritionRecords?.length || 0}</strong>
                          </span>
                          <span>
                            {t('attendanceCount')} <strong className="text-white ml-1">{c.attendanceLogs?.length || 0}</strong>
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Official Government Portal Footer */}
      <GovtFooter />

      {/* Child Registration Modal Dialog */}
      <RegisterChildModal
        isOpen={showChildModal}
        onClose={() => setShowChildModal(false)}
        onSubmitChild={handleRegisterChild}
      />
    </div>
  );
}
