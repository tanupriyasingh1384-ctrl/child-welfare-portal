import React, { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: number;
  subtitle: string;
  icon: ReactNode;
  variant?: 'blue' | 'red' | 'amber' | 'purple';
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, icon, variant = 'blue' }) => {
  const variantStyles = {
    blue: {
      border: 'hover:border-cyan-500/50 hover:shadow-cyan-500/10',
      iconBg: 'bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 shadow-inner',
      valueColor: 'text-white',
      subtitleColor: 'text-slate-400',
      accentGlow: 'bg-cyan-500/5',
    },
    red: {
      border: 'hover:border-rose-500/50 hover:shadow-rose-500/10',
      iconBg: 'bg-gradient-to-tr from-rose-500/20 to-red-500/20 text-rose-400 border border-rose-500/30 shadow-inner',
      valueColor: 'text-rose-400',
      subtitleColor: 'text-rose-400/90 font-medium',
      accentGlow: 'bg-rose-500/5',
    },
    amber: {
      border: 'hover:border-amber-500/50 hover:shadow-amber-500/10',
      iconBg: 'bg-gradient-to-tr from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30 shadow-inner',
      valueColor: 'text-amber-400',
      subtitleColor: 'text-amber-400/90 font-medium',
      accentGlow: 'bg-amber-500/5',
    },
    purple: {
      border: 'hover:border-purple-500/50 hover:shadow-purple-500/10',
      iconBg: 'bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 text-purple-400 border border-purple-500/30 shadow-inner',
      valueColor: 'text-purple-400',
      subtitleColor: 'text-purple-400/90 font-medium',
      accentGlow: 'bg-purple-500/5',
    },
  }[variant];

  return (
    <div
      className={`glass-card rounded-2xl p-5 relative overflow-hidden transition-all duration-300 transform hover:-translate-y-1 ${variantStyles.border}`}
    >
      {/* Background Subtle Radial Accent */}
      <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full blur-2xl pointer-events-none ${variantStyles.accentGlow}`} />

      <div className="flex justify-between items-start gap-3 relative z-10">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
          <h3 className={`text-3xl sm:text-4xl font-extrabold mt-2 tracking-tight ${variantStyles.valueColor}`}>
            {value.toLocaleString()}
          </h3>
        </div>
        <div className={`p-3 rounded-2xl ${variantStyles.iconBg} shrink-0`}>
          {icon}
        </div>
      </div>
      <p className={`text-xs mt-3 relative z-10 ${variantStyles.subtitleColor}`}>{subtitle}</p>
    </div>
  );
};
