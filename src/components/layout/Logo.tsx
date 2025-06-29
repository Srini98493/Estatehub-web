import React from 'react';
import { LayoutGrid } from 'lucide-react';
import logo from '../../assets/logo_4.png';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* <LayoutGrid className="h-6 w-6" /> */}
      <img src={logo} width={100} height={100} alt="Site Logo" className="h-24 w-48 object-cover" />
    </div>
  );
};