import React from 'react';
import { Button } from '../common/Button';

interface ServiceTabsProps {
  activeTab: 'requests' | 'history';
  onTabChange: (tab: 'requests' | 'history') => void;
}

export const ServiceTabs: React.FC<ServiceTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex gap-4 mb-6">
      <Button
        variant={activeTab === 'requests' ? 'gradient' : 'secondary'}
        onClick={() => onTabChange('requests')}
        className="relative"
      >
        Requests
        {/* {activeTab === 'requests' && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0A8ED9]" />
        )} */}
      </Button>
      <Button
        variant={activeTab === 'history' ? 'gradient' : 'secondary'}
        onClick={() => onTabChange('history')}
        className="relative"
      >
        History
        {/* {activeTab === 'history' && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0A8ED9]" />
        )} */}
      </Button>
    </div>
  );
};