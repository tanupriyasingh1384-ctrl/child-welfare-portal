import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HeartPulse, Plus, Activity, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
export const NutritionTab = ({ nutritionLogs, children, onSubmitNutrition, }) => {
    const { t } = useLanguage();
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        childId: '',
        ageMonths: 48,
        weightKg: 12.0,
        heightCm: 100.0,
    });
    // Calculate live BMI status for form preview
    const heightMeters = formData.heightCm / 100;
    const previewBmi = heightMeters > 0 ? formData.weightKg / (heightMeters * heightMeters) : 0;
    const previewStatus = previewBmi < 13.5
        ? 'SEVERE_ACUTE_MALNUTRITION'
        : previewBmi < 15.5
            ? 'MODERATE'
            : 'NORMAL';
    const handleSubmit = async (e) => {
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
        }
        finally {
            setSubmitting(false);
        }
    };
    const getStatusBadge = (status) => {
        switch (status) {
            case 'SEVERE_ACUTE_MALNUTRITION':
                return (_jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm", children: [_jsx(AlertCircle, { className: "w-3.5 h-3.5" }), t('statusSam')] }));
            case 'MODERATE':
                return (_jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm", children: [_jsx(AlertCircle, { className: "w-3.5 h-3.5" }), t('statusModerate')] }));
            default:
                return (_jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm", children: [_jsx(CheckCircle, { className: "w-3.5 h-3.5" }), t('statusNormal')] }));
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "glass-card p-6 sm:p-7 rounded-3xl border border-amber-500/20 relative overflow-hidden bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 shadow-2xl", children: [_jsx("div", { className: "absolute right-0 top-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" }), _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10", children: [_jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30 text-white shrink-0 mt-0.5", children: _jsx(HeartPulse, { className: "w-6 h-6" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2", children: t('nutritionTitle') }), _jsx("p", { className: "text-xs sm:text-sm text-slate-300 font-medium mt-1", children: t('nutritionSub') })] })] }), _jsxs("button", { onClick: () => setShowForm(!showForm), className: "px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-amber-600/30 transition-all duration-200 active:scale-95 shrink-0 self-start sm:self-auto", children: [showForm ? _jsx(X, { className: "w-4 h-4" }) : _jsx(Plus, { className: "w-4 h-4" }), _jsx("span", { children: showForm ? t('btnCloseGrowth') : t('btnLogGrowth') })] })] })] }), showForm && (_jsxs("div", { className: "glass-card border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fade-in relative z-20", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-slate-800 pb-4", children: [_jsxs("h3", { className: "text-lg font-bold text-amber-400 flex items-center gap-2.5", children: [_jsx(Activity, { className: "w-5 h-5 text-amber-500" }), t('intakeGrowthTitle')] }), _jsx("span", { className: "text-xs text-slate-400 font-medium", children: t('whoIndicatorNotice') })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-5", children: [_jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5", children: t('selectChildLabel') }), _jsxs("select", { required: true, value: formData.childId, onChange: (e) => setFormData({ ...formData, childId: e.target.value }), className: "w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-amber-500 focus:outline-none transition", children: [_jsx("option", { value: "", children: t('chooseChildPlaceholder') }), children.map((c) => (_jsxs("option", { value: c.id, children: [c.fullName, " (", c.district, ") - ", c.villageOrCity] }, c.id)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5", children: t('ageMonthsLabel') }), _jsx("input", { type: "number", required: true, min: 1, max: 216, value: formData.ageMonths, onChange: (e) => setFormData({ ...formData, ageMonths: Number(e.target.value) }), className: "w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-amber-500 focus:outline-none transition" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5", children: t('weightKgLabel') }), _jsx("input", { type: "number", step: "0.1", required: true, min: 1, max: 100, value: formData.weightKg, onChange: (e) => setFormData({ ...formData, weightKg: Number(e.target.value) }), className: "w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-amber-500 focus:outline-none transition" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5", children: t('heightCmLabel') }), _jsx("input", { type: "number", step: "0.1", required: true, min: 30, max: 200, value: formData.heightCm, onChange: (e) => setFormData({ ...formData, heightCm: Number(e.target.value) }), className: "w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-amber-500 focus:outline-none transition" })] })] }), _jsxs("div", { className: "bg-slate-950/80 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("span", { className: "text-xs text-slate-400 font-semibold block", children: t('computedBmi') }), _jsxs("span", { className: "text-xl font-extrabold text-white", children: [previewBmi > 0 ? previewBmi.toFixed(2) : '0.00', " kg/m\u00B2"] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-xs text-slate-400 font-semibold", children: t('classifiedStatus') }), getStatusBadge(previewStatus)] })] }), _jsxs("div", { className: "flex justify-end gap-3 pt-3 border-t border-slate-800", children: [_jsx("button", { type: "button", onClick: () => setShowForm(false), className: "px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition", children: t('cancelBtn') }), _jsxs("button", { type: "submit", disabled: submitting, className: "px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-600/30 transition disabled:opacity-50", children: [_jsx(HeartPulse, { className: "w-4 h-4" }), _jsx("span", { children: submitting ? t('savingMetric') : t('btnSaveMetric') })] })] })] })] })), _jsx("div", { className: "glass-card rounded-3xl overflow-hidden shadow-2xl border border-slate-800", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-900/90 border-b border-slate-800 text-xs uppercase text-slate-400 font-extrabold tracking-wider", children: [_jsx("th", { className: "p-4 sm:p-5", children: t('thChildName') }), _jsx("th", { className: "p-4 sm:p-5", children: t('thDistrict') }), _jsx("th", { className: "p-4 sm:p-5", children: t('thAgeMonths') }), _jsx("th", { className: "p-4 sm:p-5", children: t('thWeight') }), _jsx("th", { className: "p-4 sm:p-5", children: t('thHeight') }), _jsx("th", { className: "p-4 sm:p-5", children: t('thStatus') }), _jsx("th", { className: "p-4 sm:p-5", children: t('thDate') })] }) }), _jsx("tbody", { className: "divide-y divide-slate-800/80 text-sm font-medium", children: nutritionLogs.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 7, className: "p-12 text-center text-slate-500", children: t('noNutritionRecords') }) })) : (nutritionLogs.map((nut) => (_jsxs("tr", { className: "hover:bg-slate-800/40 transition duration-150", children: [_jsx("td", { className: "p-4 sm:p-5 font-bold text-white", children: nut.child?.fullName || 'Child Minor' }), _jsx("td", { className: "p-4 sm:p-5 text-slate-400", children: nut.child?.district || 'N/A' }), _jsx("td", { className: "p-4 sm:p-5 text-slate-300", children: nut.ageMonths }), _jsxs("td", { className: "p-4 sm:p-5 text-slate-300", children: [nut.weightKg, " kg"] }), _jsxs("td", { className: "p-4 sm:p-5 text-slate-300", children: [nut.heightCm, " cm"] }), _jsx("td", { className: "p-4 sm:p-5", children: getStatusBadge(nut.status) }), _jsx("td", { className: "p-4 sm:p-5 text-xs text-slate-400", children: new Date(nut.recordedAt).toLocaleDateString() })] }, nut.id)))) })] }) }) })] }));
};
