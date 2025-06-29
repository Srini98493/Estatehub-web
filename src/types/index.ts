export interface Property {
  propertycategory(propertycategory: any): number;
  landmark: string;
  pincode: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  availabledate: string;
  generallocation: string;
  id: number;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  area: number;
  imageUrl: string;
  popular: boolean;
  type: string;
  description?: string;
  address?: string;
  propertytitle?: string;
  propertytype: string;
  isapproved: boolean;
  propertyid: number;
  bedrooms: number;
  bathrooms: number;
  city: string;
  propertydescription: string;
  currencytype: string;
  propertycategoryname: string;
  postedby: string;  
  isbooked: boolean; 
  propertytypeid: number;
  propertycategoryid: number;
  amenities?: string[];
  availableDate?: string; // Add this line
  attachments?: File[]; // Add this line to include the attachments property
}

export interface PropertyFilter {
  location?: string;
  type?: string;
  priceRange?: string;
  page?: number;
  limit?: number;
}