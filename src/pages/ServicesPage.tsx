import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PageLayout } from '../components/layout/PageLayout';
import { CreateServiceModal } from '../components/services/CreateServiceModal';
import { ServiceRequestList } from '../components/services/ServiceRequestList';
import { ServiceTabs } from '../components/services/ServiceTabs';
import { ServiceHistory } from '../components/services/ServiceHistory';
import { Plus } from 'lucide-react';
import { api } from '../utils/api';
import { API_ENDPOINTS } from '../config/api';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/common/Button';

type TabType = 'requests' | 'history';

interface Service {
  serviceid: number;
  servicelistno: number;
  servicecategoryname: string;
  postquery: string;
  requestedby: string;
  areacode: string;
  contactno: string;
  email: string;
  createddate: string;
}

export const ServicesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('requests');
  const { user, isAuthenticated, toggleLoginModal } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: services, isLoading } = useQuery({
    queryKey: ['services', user?.userid],
    queryFn: async () => {
      try {
        const response = await api.get(API_ENDPOINTS.GET_SERVICES);
        if (!response?.data) {
          return [];
        }
        return response.data;
      } catch (error) {
        console.error('Error fetching services:', error);
        return [];
      }
    },
    enabled: !!user?.userid,
  });

  const headerContent = (
    <Button
      onClick={() => setIsModalOpen(true)}
      className="flex items-center gap-2"
    >
      <Plus className="h-5 w-5" />
      <span>Post NRI Property Service Request</span>
    </Button>
  );

  if (!isAuthenticated) {
    return (
      <PageLayout title="NRI Property Services">
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Please sign in to view and post NRI Property Services</p>
          {/* <Button
            onClick={() => toggleLoginModal(true)}
            className="mt-4"
          >
            Sign In
          </Button> */}
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="NRI Property Services" headerContent={headerContent}>
      <ServiceTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'requests' ? (
        <ServiceRequestList 
          services={services?.map(service => ({
            id: service.serviceid,
            category: service.servicecategoryname,
            description: service.postquery,
            requestedBy: service.requestedby,
            contact: service.contactno,
            email: service.email,
            date: service.createddate,
            status: service.servicelistno === 1 ? 'Active' : 'Pending',
            areaCode: service.areacode
          }))}
          isLoading={isLoading}
        />
      ) : (
        <ServiceHistory />
      )}

      <CreateServiceModal
        homeloan={false}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          queryClient.invalidateQueries(['services']);
        }}
        areaCode={user?.areacode}
        email={user?.useremail}
        contactNo={user?.contactno}
      />
    </PageLayout>
  );
};