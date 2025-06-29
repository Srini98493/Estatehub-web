import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../utils/api";
import { API_ENDPOINTS } from "../../config/api";
import { toast } from "react-hot-toast";
import { X, Check } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
// import successVector from "../../assets/Vector.png";
import SuccessModal from "../common/SuccessModal";
import { Button } from "../common/Button";

interface ServiceCategory {
  servicecategoryid: number;
  servicecategoryname: string;
}

interface CreateServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
  contactNo?: string;
  homeloan?: boolean;
  areaCode?: string;
}

export const CreateServiceModal: React.FC<CreateServiceModalProps> = ({
  isOpen,
  onClose,
  email,
  contactNo,
  homeloan,
  areaCode,
}) => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    serviceCategoryId: "",
    email: email || "",
    contactNo: contactNo || "",
    areaCode: areaCode || "+",
    postQuery: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const defaultEmail = email?.trim() || user?.email?.trim() || "";
      const defaultContactNo = contactNo?.trim() || user?.contactNo?.trim() || "";
      const defaultAreaCode = areaCode || user?.areaCode || "+1"; // Set a default if areaCode is missing
  
      // Ensure areaCode starts with '+', if it doesn't add the '+'
      const formattedAreaCode = defaultAreaCode.startsWith('+') ? defaultAreaCode : `+${defaultAreaCode}`;
  
      setFormData((prevData) => ({
        ...prevData,
        email: defaultEmail,
        contactNo: defaultContactNo,
        areaCode: formattedAreaCode, // Make sure areaCode is always populated
      }));
  
      setErrors({});
      setCharCount(0);
    }
  }, [isOpen, user]);
  
  
  

  // Updated service categories fetch
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["serviceCategories"],
    queryFn: async () => {
      try {
        let response;
        if (homeloan) {
          response = await api.get(API_ENDPOINTS.HOME_LOAN_CATEGORIES);
        } else {
          response = await api.get(API_ENDPOINTS.SERVICE_CATEGORIES);
        }

        // Check if response has the expected structure
        if (!response?.status || !response?.data) {
          console.error("Invalid response structure:", response);
          throw new Error("Invalid response structure");
        }

        // Extract categories from the response
        const categories = response.data;

        // console.log("🔥 formData.categories country code:", user?.areacode);
        // console.log("🔥 formData.categories country code:", areaCode);
        // // console.log("📦 PROPERTY_CATEGORIES:", PROPERTY_CATEGORIES);
        // srinivas changed this to check if categories is an array


        if (!Array.isArray(categories)) {
          throw new Error("Categories data is not an array");
        }

        return categories as ServiceCategory[];
      } catch (error) {
        console.error("Error fetching service categories:", error);
        throw error;
      }
    },
    retry: 1,
  });

  // Create service mutation
  const createServiceMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        userId: user?.userid,
        serviceListNo: Number(formData.serviceCategoryId),
        postQuery: formData.postQuery,
        areaCode: formData.areaCode,
        contactNo: formData.contactNo,
        email: formData.email,
      };
      return api.post(API_ENDPOINTS.CREATE_SERVICE, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      resetForm();
      setShowSuccessModal(true);
      onClose();
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["services"] });
    //   setFormData({
    //     serviceCategoryId: "",
    //     email: "",
    //     contactNo: "",
    //     areaCode: "", // ❌ This clears the area code each time
    //     postQuery: "",
    //   });


    //   setShowSuccessModal(true);
    //   onClose();
    // },
    onError: (error) => {
      toast.error("Failed to create service request");
      console.error("Service creation error:", error);
    },
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.serviceCategoryId) {
      newErrors.serviceCategoryId = "Please select a service type";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.contactNo) {
      newErrors.contactNo = "Phone number is required";
    } else if (!/^\+?[0-9]\d{1,14}$/.test(formData.contactNo)) {
      newErrors.contactNo = "Invalid phone number";
    }

    if (!formData.areaCode) {
      newErrors.areaCode = "Country code is required";
    }else if (!/^\+\d{1,6}$/.test(formData.areaCode)) {
      newErrors.areaCode = "Invalid country code (should start with + and be numeric)";
    }
    // else if (!/^\+[1-9]\d{0,5}$/.test(formData.areaCode)) {
    //   newErrors.areaCode = "Invalid country code (should start with + and contain only digits)";
    // }


    if (!formData.postQuery.trim()) {
      newErrors.postQuery = "Please describe your service need";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      createServiceMutation.mutate();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    onClose();
  };

  // Function to reset the form
  // const resetForm = () => {
  //   setFormData({
  //     serviceCategoryId: "",
  //     email: email || "",
  //     contactNo: contactNo || "",
  //     areaCode: areaCode || "",
  //     postQuery: "",
  //   });
  // };
  const resetForm = () => {
    setFormData({
      serviceCategoryId: "",
      email: email || user?.email || "",
      contactNo: contactNo || user?.contactNo || "",
      areaCode: areaCode || user?.areacode || "",
      postQuery: "",
    });
    setErrors({});
    setCharCount(0);
  };

  const handleClose = () => {
    resetForm(); // Reset the form when closing
    onClose(); // Call the original onClose function
  };

  if (showSuccessModal) {
    return (
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          handleSuccessClose();
          onClose();
        }}
        title="Query Posted Successfully"
        description="Your query has posted successfully. Our representative will reach you."
      />
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={handleClose}
        />

        {/* Modal */}
        <div className="relative w-full max-w-md transform rounded-lg bg-white p-6 shadow-xl transition-all">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Post Service Request
            </h2>
            <button
              onClick={handleClose}
              className="rounded-full p-1 hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Category Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Type
              </label>
              <div className="relative">
                {isCategoriesLoading ? (
                  <div className="h-12 bg-white rounded-lg border border-gray-300 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
                  </div>
                ) : categoriesError ? (
                  <div className="h-12 bg-red-50 rounded-lg border border-red-300 flex items-center justify-center text-red-500 px-4">
                    {categoriesError instanceof Error
                      ? categoriesError.message
                      : "Failed to load categories"}
                  </div>
                ) : (
                  <div className="relative">
                    <select
                      name="serviceCategoryId"
                      value={formData.serviceCategoryId}
                      onChange={handleChange}
                      className="w-full h-12 bg-white rounded-lg border border-gray-300 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    >
                      <option value="">Select a service</option>
                      {categories && categories.length > 0 ? (
                        categories.map((category) => (
                          <option
                            key={category.servicecategoryid}
                            value={category.servicecategoryid}
                            className="py-2"
                          >
                            {category.servicecategoryname}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          No services available
                        </option>
                      )}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
                {errors.serviceCategoryId && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.serviceCategoryId}
                  </p>
                )}
              </div>
            </div>

            {/* Email and Phone Number Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Country Code
                </label>
                <input
                  type="text"
                  name="areaCode"
                  value={formData.areaCode}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    // Ensure input only contains numbers and an optional '+' at the start
                    const validValue = value.replace(/[^0-9+]/g, ""); // Remove any non-numeric characters, except '+'

                    // Allow only one '+' at the beginning
                    if (/^\+?\d*$/.test(validValue)) {
                      setFormData((prevData) => ({
                        ...prevData,
                        [name]: validValue,
                      }));

                      // Clear errors if input is valid (non-empty and contains only numbers and '+')
                      if (validValue.trim() !== "") {
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          [name]: "",
                        }));
                      }
                    }
                  }}
                  className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Country Code (e.g., +91)"
                  inputMode="tel"
                  maxLength={4} // Limit to 4 characters (e.g., +91, +1, etc.)
                  pattern="^\+?[0-9]*$" // Restrict input to numbers and an optional '+' at the start
                />
                {errors.areaCode && (
                  <p className="mt-2 text-sm text-red-600">{errors.areaCode}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={(e) => {
                    const { name, value } = e.target;

                    // Allow only numbers and limit the input length to 10 digits
                    if (/^\d*$/.test(value) && value.length <= 10) {
                      setFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));

                      // Clear error when input is valid (not empty)
                      if (value.trim() !== "") {
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          [name]: "",
                        }));
                      }
                    }
                  }}
                  className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                  inputMode="numeric"  // Helps on mobile devices by showing a numeric keyboard
                  pattern="[0-9]*"    // Restricts input to numeric values only
                  maxLength="10"      // Limits the input to a maximum of 10 characters
                />

                {errors.contactNo && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.contactNo}
                  </p>
                )}
              </div>
            </div>

            {/* Area Code */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Service Details */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Details
              </label>
              <textarea
                name="postQuery"
                value={formData.postQuery}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 2000) {
                    handleChange(e);
                    setCharCount(value.length);
                  }
                }}
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter details about service you needed"
              />
              <div className="text-right text-gray-500">{charCount}/2000</div>
              {errors.postQuery && (
                <p className="mt-2 text-sm text-red-600">{errors.postQuery}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={createServiceMutation.isPending}
              variant="primary"
              className="w-full"
            >
              {createServiceMutation.isPending ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  <span className="ml-2">Posting...</span>
                </div>
              ) : (
                "Post Query"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
