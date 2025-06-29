import React from 'react';
import { Sidebar } from './Sidebar';
import { PageHeader } from './PageHeader';

interface PageLayoutProps {
  title: string;
  headerContent?: React.ReactNode;
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ title, headerContent, children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="transition-all duration-300 ml-20 lg:ml-64">
        <PageHeader title={title}>
          {headerContent}
        </PageHeader>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
};