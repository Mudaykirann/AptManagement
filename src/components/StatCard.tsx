import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../utils/cn';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
  iconClassName?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  className,
  iconClassName 
}) => {
  return (
    <div className={cn("bg-white p-6 rounded-3xl border border-slate-100 shadow-sm shadow-slate-100/50", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
          {trend && (
            <p className={cn(
              "text-xs font-medium mt-2 flex items-center gap-1",
              trend.isPositive ? "text-emerald-600" : "text-red-600"
            )}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}
              <span className="text-slate-400 font-normal ml-1">vs last month</span>
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-2xl bg-slate-50 text-slate-600", iconClassName)}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
