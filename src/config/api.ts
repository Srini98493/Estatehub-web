export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL,

  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
  },
};

export const API_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  LOGIN: `${API_URL}/v1/auth/login`,
  REGISTER: `${API_URL}/v1/auth/register`,
  PROPERTIES: `${API_URL}/v1/properties`,
  VERIFY_EMAIL: `${API_URL}/v1/auth/verify-email`,
  DELETE_USER: `${API_URL}/v1/user/deleteUser`,
  GET_PROPERTIES_BY_USERID: `${API_URL}/v1/properties/user/0`,
  PENDING_PROPERTIES: `${API_URL}/v1/properties/pending-approvals`,
  APPROVE_PROPERTY: (id: number) => `${API_URL}/v1/properties/${id}/approve`,
  REJECT_PROPERTY: (id: number) => `${API_URL}/v1/properties/${id}/reject`,
  CREATE_PROPERTY: `${API_URL}/v1/properties/createProperty`,
  FAVORITES: `${API_URL}/v1/properties/favorites`,
  ADD_FAVORITE: (propertyId: number) =>
    `${API_URL}/v1/properties/${propertyId}/favorites`,
  REMOVE_FAVORITE: (propertyId: number) =>
    `${API_URL}/v1/properties/removeFavorite/${propertyId}`,
  PROPERTY_DETAIL: (id: string, userId: number) =>
    `${API_URL}/v1/properties/${id}/details/${userId}`,
  SERVICE_CATEGORIES: `${API_URL}/v1/services/getAllServiceCategories`,
  HOME_LOAN_CATEGORIES: `${API_URL}/v1/services/getAllHomeLoanCategories`,
  CREATE_SERVICE: `${API_URL}/v1/services/createService`,
  GET_SERVICES: `${API_URL}/v1/services/getService`,
  GET_HOME_LOAN_SERVICES: `${API_URL}/v1/services/getHomeLoanServices`,
  BOOK_PROPERTY: (propertyId: string | number) =>
    `${API_URL}/v1/properties/${propertyId}/bookProperty`,
  GET_USER_BOOKINGS: `${API_URL}/v1/properties/getBookingsByUserId`,
  MOST_VIEWED_PROPERTIES: `${API_URL}/v1/properties/most-viewed`,
  RESET_PASSWORD: `${API_URL}/v1/auth/reset-password`,
  CANCEL_BOOKING: (propertyId: string | number, bookingId: string | number) =>
    `${API_URL}/v1/properties/updateBooking/${propertyId}/${bookingId}`,
  DELETE_PROPERTY: (id: number) =>
    `${API_URL}/v1/properties/deleteProperty/${id}`,
  UPDATE_PROPERTY: (id: number) =>
    `${API_URL}/v1/properties/updateProperty/${id}`,
  
  GET_DOWNLOAD_REPORT: `${API_URL}/v1/properties/report`,

};
