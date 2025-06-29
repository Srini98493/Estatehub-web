export interface User {
  id: string;
  name: string;
  email: string;
  role: 'tenant' | 'landlord' | 'agent';
  imageUrl?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  role: 'tenant' | 'landlord' | 'agent';
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  gender?: string;
  dob?: string;
  location?: string;
  city?: string;
  state?: string;
  country?: string;
}