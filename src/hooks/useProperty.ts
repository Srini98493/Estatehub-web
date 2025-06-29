import { useQuery } from '@tanstack/react-query';
import { api } from '../utils/api';
import { API_ENDPOINTS } from '../config/api';

export interface Attachment {
  attachmentid: number;
  attachmentname: string;
  attachmenttype: number;
  attachmenturl: string;
  isprimary: boolean;
}

export interface PropertyDetail {
  propertyid: number;
  userid: number;
  postedby: string;
  propertycategory: number;
  propertycategoryname: string;
  propertytype: string;
  propertytitle: string;
  propertydescription: string;
  address: string;
  generallocation: string;
  landmark: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
  latitude: string;
  longitude: string;
  availabledate: string;
  expiry: string | null;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  area: string;
  currencytype: string;
  price: string;
  status: string;
  isactive: boolean;
  isapproved: boolean;
  isarchieved: boolean;
  createdby: number | null;
  createddate: string;
  updatedby: number | null;
  updateddate: string;
  attachments: Attachment[] | null;
}

export const useProperty = (id?: string, userId?: number) => {
  return useQuery({
    queryKey: ['property', id, userId],
    queryFn: async () => {
      try {
        if (!id) throw new Error('Property ID is required');

        const response = await api.get(API_ENDPOINTS.PROPERTY_DETAIL(id, userId));
        
        if (!response) {
          throw new Error('No response received from API');
        }

        if (!response.t_propertydetails_get_by_id) {
          console.error('API Response Structure:', response);
          throw new Error('Missing t_propertydetails_get_by_id in response');
        }

        let propertyDetails = response.t_propertydetails_get_by_id[0];
        
        if (!propertyDetails) {
          console.error('No property data found');
          throw new Error('Property not found');
        }

        // Parse amenities string into array
        if (propertyDetails.amenities) {
          try {
            // Remove PostgreSQL array characters (curly braces, square brackets, and quotes)
            const cleanedString = propertyDetails.amenities
              .replace(/[{}\[\]"]/g, '') // Remove curly braces, square brackets, and quotes
        
            // Split the string by commas and clean up any whitespace
            propertyDetails.amenities = cleanedString
              .split(',')
              .map((item: string): string => item.trim()); // Clean up whitespace
        
          } catch (e) {
            console.warn('Failed to parse amenities:', e);
            propertyDetails.amenities = [];
          }
        }
        
        
        // if (propertyDetails.amenities) {
        //   try {
        //     propertyDetails.amenities = propertyDetails.amenities
        //       .replace(/[{"}]/g, '') // Remove PostgreSQL array characters
        //       // Split into array
        //         .map((item: string): string => item.trim()); // Clean up whitespace
        //   } catch (e) {
        //     console.warn('Failed to parse amenities:', e);
        //     propertyDetails.amenities = [];
        //   }
        // }

        // Ensure attachments is an array even if null
        propertyDetails.attachments = propertyDetails.attachments || [];

        // Clean up whitespace in string fields
        Object.keys(propertyDetails).forEach(key => {
          if (typeof propertyDetails[key] === 'string') {
            propertyDetails[key] = propertyDetails[key].trim();
          }
        });

        return propertyDetails as PropertyDetail;

      } catch (error) {
        console.error('Property fetch error:', error);
        throw error;
      }
    },
    enabled: !!id,
    retry: 1,
  });
}; 