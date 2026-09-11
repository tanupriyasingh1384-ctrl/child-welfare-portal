import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
export const Toast = ({ message, type, onClose }) => {
    return (_jsxs("div", { className: `fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl transition-all duration-300 ${type === 'success'
            ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
            : 'bg-red-950/90 border-red-500/40 text-red-200'}`, children: [type === 'success' ? (_jsx(CheckCircle2, { className: "w-5 h-5 text-emerald-400 shrink-0" })) : (_jsx(AlertCircle, { className: "w-5 h-5 text-red-400 shrink-0" })), _jsx("span", { className: "text-sm font-medium pr-2", children: message }), _jsx("button", { onClick: onClose, className: "p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white", children: _jsx(X, { className: "w-4 h-4" }) })] }));
};
