import React from 'react';
import { Home, BarChart2, Users, Calendar, Settings, HelpCircle, LogOut } from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: BarChart2, label: 'Analytics' },
  { icon: Users, label: 'Team' },
  { icon: Calendar, label: 'Schedule' },
  { icon: Settings, label: 'Settings' },
];

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-8">
        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">D</span>
        </div>
        <span className="text-xl font-bold">Dashboard</span>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
              item.active
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-gray-200 space-y-1">
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          <HelpCircle className="h-5 w-5" />
          Help Center
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;