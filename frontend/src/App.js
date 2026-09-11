import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
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
import { ShieldAlert, HeartPulse, UserCheck, Users, Filter, Search, Activity, Plus, } from 'lucide-react';
export default function App() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('incidents');
    const [districtFilter, setDistrictFilter] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    // Data State
    const [children, setChildren] = useState([]);
    const [incidents, setIncidents] = useState([]);
    const [nutritionLogs, setNutritionLogs] = useState([]);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLive, setIsLive] = useState(false);
    // UI Modal & Toast State
    const [showChildModal, setShowChildModal] = useState(false);
    const [toast, setToast] = useState(null);
    const showToast = (message, type = 'success') => {
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
        }
        catch (err) {
            console.error('API Error:', err);
            setIsLive(false);
            showToast('Failed to connect to backend server on port 5000', 'error');
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadPortalData();
    }, []);
    // Handlers
    const handleRegisterChild = async (data) => {
        try {
            await api.createChild(data);
            showToast(`Child profile for "${data.fullName}" registered successfully!`);
            loadPortalData();
        }
        catch (err) {
            showToast(err.response?.data?.error?.message || 'Error registering child profile', 'error');
        }
    };
    const handleReportIncident = async (data) => {
        try {
            await api.createIncident(data);
            showToast('Emergency SOS Incident Report submitted successfully!');
            loadPortalData();
        }
        catch (err) {
            showToast(err.response?.data?.error?.message || 'Error submitting incident report', 'error');
        }
    };
    const handleUpdateIncidentStatus = async (id, status) => {
        try {
            await api.updateIncidentStatus(id, status);
            showToast(`Incident status updated to ${status}`);
            loadPortalData();
        }
        catch (err) {
            showToast(err.response?.data?.error?.message || 'Error updating status', 'error');
        }
    };
    const handleLogNutrition = async (data) => {
        try {
            const res = await api.createNutritionLog(data);
            showToast(`Growth metric logged! Status: ${res.data.status.replace('_', ' ')}`);
            loadPortalData();
        }
        catch (err) {
            showToast(err.response?.data?.error?.message || 'Error logging nutrition metric', 'error');
        }
    };
    const handleRecordAttendance = async (data) => {
        try {
            const res = await api.createAttendanceRecord(data);
            if (res.data.riskFlagged) {
                showToast(`Absence recorded! DROPOUT RISK FLAGGED (${res.data.consecutiveAbsences} days)`, 'error');
            }
            else {
                showToast('Absence record saved successfully!');
            }
            loadPortalData();
        }
        catch (err) {
            showToast(err.response?.data?.error?.message || 'Error saving attendance record', 'error');
        }
    };
    // Filtered views
    const filteredIncidents = incidents.filter((inc) => (districtFilter === 'ALL' || inc.district === districtFilter) &&
        (inc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            inc.reporterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (inc.child?.fullName && inc.child.fullName.toLowerCase().includes(searchQuery.toLowerCase()))));
    const filteredNutrition = nutritionLogs.filter((nut) => (districtFilter === 'ALL' || nut.child?.district === districtFilter) &&
        (!searchQuery || (nut.child?.fullName && nut.child.fullName.toLowerCase().includes(searchQuery.toLowerCase()))));
    const filteredAttendance = attendanceRecords.filter((att) => (districtFilter === 'ALL' || att.child?.district === districtFilter) &&
        (!searchQuery || (att.child?.fullName && att.child.fullName.toLowerCase().includes(searchQuery.toLowerCase()))));
    const filteredChildren = children.filter((c) => (districtFilter === 'ALL' || c.district === districtFilter) &&
        (c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.villageOrCity.toLowerCase().includes(searchQuery.toLowerCase())));
    // Stats Counters
    const samCount = nutritionLogs.filter((n) => n.status === 'SEVERE_ACUTE_MALNUTRITION').length;
    const dropoutCount = attendanceRecords.filter((a) => a.riskFlagged).length;
    const criticalIncidents = incidents.filter((i) => i.riskLevel === 'CRITICAL' || i.riskLevel === 'HIGH').length;
    return (_jsxs("div", { className: "min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white", children: [toast && (_jsx(Toast, { message: toast.message, type: toast.type, onClose: () => setToast(null) })), _jsx(Navbar, { isLive: isLive, onOpenRegisterChild: () => setShowChildModal(true) }), _jsxs("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-8", children: [_jsx(HeroCarousel, {}), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5", children: [_jsx(MetricCard, { title: t('metricTotalChildren'), value: children.length, subtitle: t('metricTotalChildrenSub'), icon: _jsx(Users, { className: "w-6 h-6" }), variant: "blue" }), _jsx(MetricCard, { title: t('metricIncidents'), value: incidents.length, subtitle: `${criticalIncidents} ${t('metricIncidentsSub')}`, icon: _jsx(ShieldAlert, { className: "w-6 h-6" }), variant: "red" }), _jsx(MetricCard, { title: t('metricMalnutrition'), value: samCount, subtitle: t('metricMalnutritionSub'), icon: _jsx(HeartPulse, { className: "w-6 h-6" }), variant: "amber" }), _jsx(MetricCard, { title: t('metricDropout'), value: dropoutCount, subtitle: t('metricDropoutSub'), icon: _jsx(UserCheck, { className: "w-6 h-6" }), variant: "purple" })] }), _jsxs("div", { className: "flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 glass-panel p-3.5 rounded-3xl border border-slate-800/80 shadow-2xl", children: [_jsxs("div", { className: "flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none", children: [_jsxs("button", { onClick: () => setActiveTab('incidents'), className: `flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${activeTab === 'incidents'
                                            ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-600/25 ring-1 ring-white/10'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}`, children: [_jsx(ShieldAlert, { className: "w-4 h-4" }), _jsx("span", { children: t('tabSos') }), _jsx("span", { className: "ml-1 px-2 py-0.5 rounded-full bg-black/30 text-[11px] font-black", children: incidents.length })] }), _jsxs("button", { onClick: () => setActiveTab('nutrition'), className: `flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${activeTab === 'nutrition'
                                            ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25 ring-1 ring-white/10'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}`, children: [_jsx(HeartPulse, { className: "w-4 h-4" }), _jsx("span", { children: t('tabNutrition') }), _jsx("span", { className: "ml-1 px-2 py-0.5 rounded-full bg-black/30 text-[11px] font-black", children: nutritionLogs.length })] }), _jsxs("button", { onClick: () => setActiveTab('attendance'), className: `flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${activeTab === 'attendance'
                                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/25 ring-1 ring-white/10'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}`, children: [_jsx(UserCheck, { className: "w-4 h-4" }), _jsx("span", { children: t('tabAttendance') }), _jsx("span", { className: "ml-1 px-2 py-0.5 rounded-full bg-black/30 text-[11px] font-black", children: attendanceRecords.length })] }), _jsxs("button", { onClick: () => setActiveTab('children'), className: `flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${activeTab === 'children'
                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 ring-1 ring-white/10'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}`, children: [_jsx(Users, { className: "w-4 h-4" }), _jsx("span", { children: t('tabChildren') }), _jsx("span", { className: "ml-1 px-2 py-0.5 rounded-full bg-black/30 text-[11px] font-black", children: children.length })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "relative", children: [_jsx(Filter, { className: "w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" }), _jsxs("select", { value: districtFilter, onChange: (e) => setDistrictFilter(e.target.value), className: "bg-slate-900/90 border border-slate-700/80 text-slate-200 text-xs sm:text-sm rounded-xl pl-9 pr-8 py-2 font-bold focus:outline-none focus:border-cyan-500 transition", children: [_jsx("option", { value: "ALL", children: t('filterAllDistricts') }), _jsx("option", { value: "Ranchi", children: t('districtRanchi') }), _jsx("option", { value: "Dhanbad", children: t('districtDhanbad') }), _jsx("option", { value: "Gumla", children: t('districtGumla') }), _jsx("option", { value: "Hazaribagh", children: t('districtHazaribagh') })] })] }), _jsxs("div", { className: "relative flex-1 sm:w-64", children: [_jsx(Search, { className: "w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" }), _jsx("input", { type: "text", placeholder: t('searchPlaceholder'), value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full bg-slate-900/90 border border-slate-700/80 text-slate-200 text-xs sm:text-sm rounded-xl pl-9 pr-4 py-2 placeholder-slate-500 font-medium focus:outline-none focus:border-cyan-500 transition" })] })] })] }), loading ? (_jsxs("div", { className: "flex flex-col items-center justify-center py-24 text-slate-400 gap-4 glass-card rounded-3xl border border-slate-800", children: [_jsx(Activity, { className: "w-10 h-10 animate-spin text-cyan-400" }), _jsx("p", { className: "text-sm font-semibold", children: t('loadingData') })] })) : (_jsxs(_Fragment, { children: [activeTab === 'incidents' && (_jsx(SosTab, { incidents: filteredIncidents, children: children, onSubmitIncident: handleReportIncident, onUpdateStatus: handleUpdateIncidentStatus })), activeTab === 'nutrition' && (_jsx(NutritionTab, { nutritionLogs: filteredNutrition, children: children, onSubmitNutrition: handleLogNutrition })), activeTab === 'attendance' && (_jsx(AttendanceTab, { attendanceRecords: filteredAttendance, children: children, onSubmitAttendance: handleRecordAttendance })), activeTab === 'children' && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("h2", { className: "text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5", children: [_jsx(Users, { className: "text-cyan-400 w-6 h-6" }), _jsx("span", { children: t('directoryTitle') })] }), _jsxs("button", { onClick: () => setShowChildModal(true), className: "px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold text-xs sm:text-sm flex items-center gap-2 transition shadow-lg shadow-cyan-500/10 active:scale-95", children: [_jsx(Plus, { className: "w-4 h-4" }), _jsx("span", { children: t('btnRegisterNewChild') })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredChildren.length === 0 ? (_jsx("div", { className: "col-span-3 py-20 text-center text-slate-500 glass-card rounded-3xl border border-slate-800", children: t('noChildrenRegistered') })) : (filteredChildren.map((c) => (_jsxs("div", { className: "glass-card glass-card-hover rounded-3xl p-6 space-y-4 relative overflow-hidden", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-extrabold text-lg text-white", children: c.fullName }), _jsxs("p", { className: "text-xs font-semibold text-slate-400 mt-0.5", children: [c.gender === 'FEMALE' ? t('genderFemale') : c.gender === 'MALE' ? t('genderMale') : c.gender || 'N/A', " \u2022 ", c.ageYears ? `${c.ageYears} Yrs` : 'N/A'] })] }), _jsx("span", { className: "px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black border border-cyan-500/40", children: c.district })] }), _jsxs("div", { className: "space-y-2 text-xs text-slate-300 bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 font-medium", children: [_jsxs("p", { children: [_jsx("strong", { className: "text-slate-400", children: t('guardianLabel') }), " ", c.guardianName || 'N/A', ' ', c.guardianPhone ? `(${c.guardianPhone})` : ''] }), _jsxs("p", { children: [_jsx("strong", { className: "text-slate-400", children: t('locationLabel') }), " ", c.villageOrCity, ", ", c.district, ",", ' ', c.state] }), _jsxs("p", { children: [_jsx("strong", { className: "text-slate-400", children: t('schoolCenterCodeLabel') }), ' ', c.schoolOrCenterId || 'N/A'] })] }), _jsxs("div", { className: "flex items-center justify-between text-xs font-bold text-slate-400 pt-3 border-t border-slate-800", children: [_jsxs("span", { children: [t('incidentsCount'), " ", _jsx("strong", { className: "text-white ml-1", children: c.incidents?.length || 0 })] }), _jsxs("span", { children: [t('nutritionCount'), " ", _jsx("strong", { className: "text-white ml-1", children: c.nutritionRecords?.length || 0 })] }), _jsxs("span", { children: [t('attendanceCount'), " ", _jsx("strong", { className: "text-white ml-1", children: c.attendanceLogs?.length || 0 })] })] })] }, c.id)))) })] }))] }))] }), _jsx(GovtFooter, {}), _jsx(RegisterChildModal, { isOpen: showChildModal, onClose: () => setShowChildModal(false), onSubmitChild: handleRegisterChild })] }));
}
