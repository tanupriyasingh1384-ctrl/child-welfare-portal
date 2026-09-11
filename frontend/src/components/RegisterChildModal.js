import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
export const RegisterChildModal = ({ isOpen, onClose, onSubmitChild, }) => {
    const { t } = useLanguage();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
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
    if (!isOpen)
        return null;
    const handleSubmit = async (e) => {
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
        }
        finally {
            setSubmitting(false);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "glass-card border border-cyan-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-fade-in relative overflow-hidden", children: [_jsx("div", { className: "absolute -right-16 -top-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" }), _jsxs("div", { className: "flex justify-between items-center border-b border-slate-800 pb-4 relative z-10", children: [_jsxs("h3", { className: "text-xl font-extrabold text-white flex items-center gap-2.5", children: [_jsx("div", { className: "w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center", children: _jsx(UserPlus, { className: "w-5 h-5" }) }), _jsx("span", { children: t('modalTitle') })] }), _jsx("button", { onClick: onClose, className: "p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/60 transition", children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 text-sm relative z-10", children: [_jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5", children: t('fullNameLabel') }), _jsx("input", { type: "text", required: true, placeholder: t('fullNamePlaceholder'), value: formData.fullName, onChange: (e) => setFormData({ ...formData, fullName: e.target.value }), className: "w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5", children: t('ageYearsLabel') }), _jsx("input", { type: "number", min: 0, max: 18, value: formData.ageYears, onChange: (e) => setFormData({ ...formData, ageYears: Number(e.target.value) }), className: "w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none transition" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5", children: t('genderLabel') }), _jsxs("select", { value: formData.gender, onChange: (e) => setFormData({ ...formData, gender: e.target.value }), className: "w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none transition", children: [_jsx("option", { value: "MALE", children: t('genderMale') }), _jsx("option", { value: "FEMALE", children: t('genderFemale') }), _jsx("option", { value: "OTHER", children: t('genderOther') })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5", children: t('guardianNameLabel') }), _jsx("input", { type: "text", placeholder: t('guardianNamePlaceholder'), value: formData.guardianName, onChange: (e) => setFormData({ ...formData, guardianName: e.target.value }), className: "w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5", children: t('guardianPhoneLabel') }), _jsx("input", { type: "text", placeholder: t('guardianPhonePlaceholder'), value: formData.guardianPhone, onChange: (e) => setFormData({ ...formData, guardianPhone: e.target.value }), className: "w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5", children: t('villageCityLabel') }), _jsx("input", { type: "text", required: true, placeholder: t('villageCityPlaceholder'), value: formData.villageOrCity, onChange: (e) => setFormData({ ...formData, villageOrCity: e.target.value }), className: "w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5", children: t('districtLabel') }), _jsxs("select", { value: formData.district, onChange: (e) => setFormData({ ...formData, district: e.target.value }), className: "w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none transition", children: [_jsx("option", { value: "Ranchi", children: t('districtRanchi') }), _jsx("option", { value: "Dhanbad", children: t('districtDhanbad') }), _jsx("option", { value: "Gumla", children: t('districtGumla') }), _jsx("option", { value: "Hazaribagh", children: t('districtHazaribagh') })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5", children: t('schoolCenterIdLabel') }), _jsx("input", { type: "text", placeholder: t('schoolCenterIdPlaceholder'), value: formData.schoolOrCenterId, onChange: (e) => setFormData({ ...formData, schoolOrCenterId: e.target.value }), className: "w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition" })] }), _jsxs("div", { className: "flex justify-end gap-3 pt-4 border-t border-slate-800", children: [_jsx("button", { type: "button", onClick: onClose, className: "px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition", children: t('cancelBtn') }), _jsx("button", { type: "submit", disabled: submitting, className: "px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition disabled:opacity-50", children: submitting ? t('registering') : t('btnRegisterProfile') })] })] })] }) }));
};
