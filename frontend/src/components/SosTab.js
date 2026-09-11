import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ShieldAlert, Plus, MapPin, Phone, Users, AlertTriangle, Send, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
export const SosTab = ({ incidents, children, onSubmitIncident, onUpdateStatus, }) => {
    const { t } = useLanguage();
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        childId: '',
        reporterName: '',
        reporterPhone: '',
        incidentType: 'TRAFFICKING_RISK',
        locationDesc: '',
        district: 'Ranchi',
        riskLevel: 'HIGH',
        description: '',
    });
    const handleSubmit = async (e) => {
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
        }
        finally {
            setSubmitting(false);
        }
    };
    const getIncidentTypeTranslation = (type) => {
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
    const getRiskTranslation = (risk) => {
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
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "glass-card p-6 sm:p-7 rounded-3xl border border-rose-500/20 relative overflow-hidden bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-950 shadow-2xl", children: [_jsx("div", { className: "absolute right-0 top-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" }), _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10", children: [_jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/30 text-white shrink-0 mt-0.5", children: _jsx(ShieldAlert, { className: "w-6 h-6 animate-pulse" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2", children: t('sosHeaderTitle') }), _jsx("p", { className: "text-xs sm:text-sm text-slate-300 font-medium mt-1", children: t('sosHeaderSub') })] })] }), _jsxs("button", { onClick: () => setShowForm(!showForm), className: "px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-rose-600/30 transition-all duration-200 active:scale-95 shrink-0 self-start sm:self-auto", children: [showForm ? _jsx(X, { className: "w-4 h-4" }) : _jsx(Plus, { className: "w-4 h-4" }), _jsx("span", { children: showForm ? t('btnCloseIntake') : t('btnNewIntake') })] })] })] }), showForm && (_jsxs("div", { className: "glass-card border border-rose-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fade-in relative z-20", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-slate-800 pb-4", children: [_jsxs("h3", { className: "text-lg font-bold text-rose-400 flex items-center gap-2.5", children: [_jsx(AlertTriangle, { className: "w-5 h-5 text-rose-500" }), t('quickIntakeTitle')] }), _jsx("span", { className: "text-xs text-slate-400 font-medium", children: t('routedNotice') })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5", children: [_jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5", children: t('reporterNameLabel') }), _jsx("input", { type: "text", required: true, placeholder: t('reporterNamePlaceholder'), value: formData.reporterName, onChange: (e) => setFormData({ ...formData, reporterName: e.target.value }), className: "w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none transition" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5", children: t('reporterPhoneLabel') }), _jsx("input", { type: "text", required: true, placeholder: t('reporterPhonePlaceholder'), value: formData.reporterPhone, onChange: (e) => setFormData({ ...formData, reporterPhone: e.target.value }), className: "w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none transition" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5", children: t('linkChildLabel') }), _jsxs("select", { value: formData.childId, onChange: (e) => setFormData({ ...formData, childId: e.target.value }), className: "w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-rose-500 focus:outline-none transition", children: [_jsx("option", { value: "", children: t('unregisteredChild') }), children.map((c) => (_jsxs("option", { value: c.id, children: [c.fullName, " (", c.district, ")"] }, c.id)))] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5", children: [_jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5", children: t('incidentTypeLabel') }), _jsxs("select", { value: formData.incidentType, onChange: (e) => setFormData({ ...formData, incidentType: e.target.value }), className: "w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-rose-500 focus:outline-none transition", children: [_jsx("option", { value: "TRAFFICKING_RISK", children: t('typeTrafficking') }), _jsx("option", { value: "CHILD_LABOUR", children: t('typeLabour') }), _jsx("option", { value: "PHYSICAL_SAFETY", children: t('typePhysical') }), _jsx("option", { value: "ABANDONMENT", children: t('typeAbandonment') })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5", children: t('riskLevelLabel') }), _jsxs("select", { value: formData.riskLevel, onChange: (e) => setFormData({ ...formData, riskLevel: e.target.value }), className: "w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-rose-500 focus:outline-none transition", children: [_jsx("option", { value: "CRITICAL", children: t('riskCritical') }), _jsx("option", { value: "HIGH", children: t('riskHigh') }), _jsx("option", { value: "MEDIUM", children: t('riskMedium') }), _jsx("option", { value: "LOW", children: t('riskLow') })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5", children: t('districtLabel') }), _jsxs("select", { value: formData.district, onChange: (e) => setFormData({ ...formData, district: e.target.value }), className: "w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-rose-500 focus:outline-none transition", children: [_jsx("option", { value: "Ranchi", children: t('districtRanchi') }), _jsx("option", { value: "Dhanbad", children: t('districtDhanbad') }), _jsx("option", { value: "Gumla", children: t('districtGumla') }), _jsx("option", { value: "Hazaribagh", children: t('districtHazaribagh') })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5", children: t('locationDescLabel') }), _jsx("input", { type: "text", required: true, placeholder: t('locationDescPlaceholder'), value: formData.locationDesc, onChange: (e) => setFormData({ ...formData, locationDesc: e.target.value }), className: "w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none transition" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5", children: t('incidentDescLabel') }), _jsx("textarea", { required: true, rows: 3, placeholder: t('incidentDescPlaceholder'), value: formData.description, onChange: (e) => setFormData({ ...formData, description: e.target.value }), className: "w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none transition" })] }), _jsxs("div", { className: "flex justify-end gap-3 pt-3 border-t border-slate-800", children: [_jsx("button", { type: "button", onClick: () => setShowForm(false), className: "px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition", children: t('cancelBtn') }), _jsxs("button", { type: "submit", disabled: submitting, className: "px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-rose-600/30 transition disabled:opacity-50", children: [_jsx(Send, { className: "w-4 h-4" }), _jsx("span", { children: submitting ? t('submittingSos') : t('btnSubmitSos') })] })] })] })] })), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: incidents.length === 0 ? (_jsx("div", { className: "col-span-2 py-20 text-center text-slate-500 glass-card rounded-3xl border border-slate-800", children: t('noIncidentsLogged') })) : (incidents.map((inc) => (_jsxs("div", { className: "glass-card glass-card-hover rounded-3xl p-6 sm:p-7 space-y-4 relative overflow-hidden", children: [_jsxs("div", { className: "flex justify-between items-start gap-3", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [_jsx("span", { className: `px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-sm ${inc.riskLevel === 'CRITICAL'
                                                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                                                        : inc.riskLevel === 'HIGH'
                                                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                                            : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'}`, children: getRiskTranslation(inc.riskLevel) }), _jsx("span", { className: "text-xs font-bold text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800", children: inc.district })] }), _jsx("h3", { className: "text-lg font-extrabold text-white tracking-tight", children: getIncidentTypeTranslation(inc.incidentType) })] }), _jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [_jsx("span", { className: "text-xs font-bold text-slate-400 hidden sm:inline", children: t('statusLabel') }), _jsxs("select", { value: inc.status, onChange: (e) => onUpdateStatus(inc.id, e.target.value), className: `text-xs font-extrabold rounded-xl px-3 py-1.5 focus:outline-none border shadow-inner transition cursor-pointer ${inc.status === 'OPEN'
                                                ? 'bg-rose-950/80 border-rose-500/50 text-rose-300'
                                                : inc.status === 'IN_REVIEW'
                                                    ? 'bg-amber-950/80 border-amber-500/50 text-amber-300'
                                                    : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'}`, children: [_jsx("option", { value: "OPEN", children: t('statusOpen') }), _jsx("option", { value: "IN_REVIEW", children: t('statusInReview') }), _jsx("option", { value: "RESOLVED", children: t('statusResolved') })] })] })] }), _jsx("p", { className: "text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80", children: inc.description }), _jsxs("div", { className: "pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-400 font-medium", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: [_jsxs("div", { className: "flex items-center gap-2 truncate", children: [_jsx(MapPin, { className: "w-3.5 h-3.5 text-cyan-400 shrink-0" }), _jsxs("span", { className: "truncate", children: [inc.locationDesc, ", ", inc.district] })] }), _jsxs("div", { className: "flex items-center gap-2 truncate", children: [_jsx(Phone, { className: "w-3.5 h-3.5 text-cyan-400 shrink-0" }), _jsxs("span", { className: "truncate", children: [inc.reporterName, " (", inc.reporterPhone, ")"] })] })] }), inc.child && (_jsxs("div", { className: "flex items-center gap-2 text-cyan-300 font-semibold pt-1 border-t border-slate-800/40", children: [_jsx(Users, { className: "w-3.5 h-3.5 text-cyan-400 shrink-0" }), _jsxs("span", { children: [t('linkedChild'), " ", inc.child.fullName, " (", inc.child.villageOrCity, ")"] })] }))] })] }, inc.id)))) })] }));
};
