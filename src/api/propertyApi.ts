import { Property } from '../types';

const mockRentalProperties: Property[] = [
  {
    id: 1,
    title: 'Palm Harbor',
    price: 2095,
    location: '2699 Green Valley, Highland Lake, FL',
    beds: 3,
    baths: 2,
    area: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    popular: true,
  },
  {
    id: 2,
    title: 'Beverly Springfield',
    price: 2700,
    location: '2821 Lake Sevilla, Palm Harbor, TX',
    beds: 4,
    baths: 2,
    area: 1400,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    popular: true,
  },
  {
    id: 3,
    title: 'Faulkner Ave',
    price: 4550,
    location: '909 Woodland St, Michigan, IN',
    beds: 4,
    baths: 3,
    area: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
    popular: false,
  },
  {
    id: 4,
    title: 'Sunset Villa',
    price: 3200,
    location: '1234 Sunset Blvd, Los Angeles, CA',
    beds: 3,
    baths: 2,
    area: 1600,
    imageUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=800',
    popular: true,
  },
  {
    id: 5,
    title: 'Harbor View',
    price: 2800,
    location: '567 Harbor Way, San Diego, CA',
    beds: 2,
    baths: 2,
    area: 1100,
    imageUrl: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&q=80&w=800',
    popular: false,
  },
  {
    id: 6,
    title: 'Urban Oasis',
    price: 3800,
    location: '789 Downtown Ave, Chicago, IL',
    beds: 3,
    baths: 2,
    area: 1400,
    imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=800',
    popular: true,
  }
];

const mockBuyProperties: Property[] = [
  {
    id: 7,
    title: 'Modern Heights',
    price: 450000,
    location: '123 Heights Rd, Seattle, WA',
    beds: 4,
    baths: 3,
    area: 2200,
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800',
    popular: true,
  },
  {
    id: 8,
    title: 'Lakefront Estate',
    price: 850000,
    location: '456 Lake View Dr, Austin, TX',
    beds: 5,
    baths: 4,
    area: 3500,
    imageUrl: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&q=80&w=800',
    popular: true,
  },
  {
    id: 9,
    title: 'Mountain Vista',
    price: 675000,
    location: '789 Mountain Rd, Denver, CO',
    beds: 4,
    baths: 3,
    area: 2800,
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800',
    popular: false,
  },
  {
    id: 10,
    title: 'Coastal Dream',
    price: 920000,
    location: '321 Beach Ave, Miami, FL',
    beds: 5,
    baths: 4,
    area: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    popular: true,
  },
  {
    id: 11,
    title: 'City Penthouse',
    price: 1200000,
    location: '555 Downtown Blvd, New York, NY',
    beds: 3,
    baths: 3,
    area: 2400,
    imageUrl: 'https://images.unsplash.com/photo-1600047509782-20d39509f26d?auto=format&fit=crop&q=80&w=800',
    popular: true,
  },
  {
    id: 12,
    title: 'Garden Estate',
    price: 750000,
    location: '777 Garden St, Portland, OR',
    beds: 4,
    baths: 3,
    area: 2900,
    imageUrl: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&q=80&w=800',
    popular: false,
  }
];

export const propertyApi = {
  getRentalProperties: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockRentalProperties;
  },
  getBuyProperties: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockBuyProperties;
  }
};