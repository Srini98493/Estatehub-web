import React, { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Pagination } from '../components/common/Pagination';
import { useApprovalProperties } from '../hooks/useApprovalProperties';
import { useAuthStore } from '../store/authStore';
import { api } from '../utils/api';
import { API_ENDPOINTS } from '../config/api';
import { toast } from 'react-hot-toast';
import { ApprovalPropertyCard } from '../components/properties/ApprovalPropertyCard';
import { Property } from '../types';
import { Button } from "../components/common/Button";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as XLSX from 'xlsx';

const ITEMS_PER_PAGE = 10;

export const ApprovePropertiesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: properties = [], isLoading, error, refetch } = useApprovalProperties();
  const { user } = useAuthStore();

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  const paginatedProperties = properties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApprove = async (propertyId: number) => {
    try {
      await api.post(`${API_ENDPOINTS.PROPERTIES}/${propertyId}/approve`, {
        userId: user?.userid,
        action: 'approve'
      });

      toast.success('Property approved successfully');
      refetch(); // This will refresh the list and remove the approved property
    } catch (error) {
      toast.error('Failed to approve property');
      console.error('Approve error:', error);
    }
  };

  if (!user?.isadmin && user?.usertype !== 0) {
    return (
      <PageLayout title="Unauthorized">
        <div className="text-center py-12">
          <p className="text-red-600">You don't have permission to access this page.</p>
        </div>
      </PageLayout>
    );
  }
  // New function to handle downloading the report as Excel
  const handleDownloadReport = async () => {
    try {
      // 1. Call the GET endpoint to fetch the report
      const response = await api.get(API_ENDPOINTS.GET_DOWNLOAD_REPORT);
  
      // Log the entire response data for debugging
      console.log('API Response:', response.data);
  
      // 2. Check if the data exists and log warnings if not
      if (!response.data || response.data.length === 0) {
        toast.error('No data available for download');
        console.error('API Response is empty or malformed.');
        return;
      }
  
      // 3. Extract properties from the first item in the array
      const reportWrapper = response.data[0];
const { booked_properties, posted_properties } = reportWrapper.t_get_real_estate_report || {};

  
      // Log the properties to check if they contain data
      console.log('Booked Properties:', booked_properties);
      console.log('Posted Properties:', posted_properties);
  
      // 4. If either of the properties is missing or empty, display an error
      if (!booked_properties || booked_properties.length === 0) {
        toast.error('No booked properties available for download');
        console.warn('Booked properties are empty or missing.');
      }
  
      if (!posted_properties || posted_properties.length === 0) {
        toast.error('No posted properties available for download');
        console.warn('Posted properties are empty or missing.');
      }
  
      // 5. Check if both properties have data and proceed
      if ((booked_properties && booked_properties.length > 0) || (posted_properties && posted_properties.length > 0)) {
        const wb = XLSX.utils.book_new();
  
        // Convert 'booked_properties' to a worksheet
        if (booked_properties && booked_properties.length > 0) {
          const bookedSheet = XLSX.utils.json_to_sheet(booked_properties);
          XLSX.utils.book_append_sheet(wb, bookedSheet, 'Booked Properties');
        }
  
        // Convert 'posted_properties' to a worksheet
        if (posted_properties && posted_properties.length > 0) {
          const postedSheet = XLSX.utils.json_to_sheet(posted_properties);
          XLSX.utils.book_append_sheet(wb, postedSheet, 'Posted Properties');
        }
  
        // Generate the Excel file
        const fileName = 'properties_report.xlsx';
        XLSX.writeFile(wb, fileName);
  
        toast.success('Excel report downloaded successfully');
      } else {
        toast.error('No available data to create report');
        console.warn('No available data for report creation');
      }
    } catch (error) {
      toast.error('Failed to download report');
      console.error('Download report error:', error);
    }
    
  };
  

  return (
    <PageLayout title="Approve Properties">
      {/* Report Download Link (single button at the top-right) */}
      <Button
        onClick={handleDownloadReport}
        className="absolute top-4 right-28 bg-blue-600 text-white hover:bg-blue-700 text-sm px-4 py-2 rounded-lg z-50 transition-colors"
      //  className="bg-blue-600 text-white hover:bg-blue-700"
      >

        Download Report

      </Button>


      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-600">
          Failed to load properties. Please try again later.
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No properties pending approval</p>
        </div>
      ) : (
        <div className="space-y-6">
          {paginatedProperties.map((property: Property) => (
            <ApprovalPropertyCard
              key={property.propertyid}
              property={property}
              onApprove={handleApprove}
            />
          ))}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </PageLayout>
  );
};