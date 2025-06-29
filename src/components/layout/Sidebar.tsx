import React from 'react';
import { Home, Building2, Heart, Calendar, Settings, CheckSquare, Landmark } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { useAuthStore } from '../../store/authStore';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  requiresAuth: boolean;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Home', href: '/', requiresAuth: false },
  { icon: Building2, label: 'Your Properties', href: '/my-properties', requiresAuth: true },
  { icon: Heart, label: 'Favorites', href: '/favorites', requiresAuth: true },
  { icon: Calendar, label: 'My Bookings', href: '/bookings', requiresAuth: true },
  { icon: Settings, label: 'NRI Property Services', href: '/services', requiresAuth: true },
  { icon: Landmark, label: 'Apply for Home Loan', href: '/apply-home-loans', requiresAuth: true },
  { 
    icon: CheckSquare, 
    label: 'Approve Properties', 
    href: '/approve-properties', 
    requiresAuth: true,
    adminOnly: true
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const { isAuthenticated, toggleLoginModal, user } = useAuthStore();

  const isAdmin = user?.isadmin || user?.usertype === 0;

  const filteredNavItems = navItems.filter(item => 
    !item.adminOnly || (item.adminOnly && isAdmin)
  );

  return (
    <aside className="bg-[#1C2536] h-screen w-64 fixed left-0 top-0 z-50">
      <div className="flex flex-col h-full">
        <div className="p-4">
          <Link to="/">
            <Logo className="text-white" />
          </Link>
        </div>

        <nav className="flex-1 px-2 py-4">
          {filteredNavItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center text-gray-300 hover:bg-gray-700 rounded-lg mb-1 px-4 py-3
                ${location.pathname === item.href ? 'bg-gray-700' : ''}`}
            >
              <item.icon size={20} />
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};