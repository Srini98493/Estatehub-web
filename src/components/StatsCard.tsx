import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  positive: boolean;
}

function StatsCard({ title, value, change, icon, positive }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <div className="p-2 bg-gray-50 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <span className={`text-sm font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
    </div>
  );
}

export default StatsCard;