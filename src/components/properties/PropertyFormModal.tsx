import React, { useState, useEffect } from "react";
import { X, ChevronDown, X as XIcon } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { api } from "../../utils/api";
import { API_ENDPOINTS } from "../../config/api";
import { useQueryClient } from "@tanstack/react-query";
import { Property } from "../../types";
import { Button } from "../../components/common/Button";
import SuccessModal from "../../components/common/SuccessModal";

interface PropertyFormData {
  propertyTitle: string;
  propertyType: number;
  propertyCategory: number;
  propertyArea: string;
  bedRooms: string;
  bathRooms: string;
  propertyDescription: string;
  amenities: string[];
  location: string;
  price: string;
  currencyType: string;
  availableDate: string;
  address: string;
  landmark: string;
  pinCode: string;
  city: string;
  state: string;
  country: string;
  propertyImages: (File | { file: File; preview: string } | any)[];
  latitude: number;
  longitude: number;
}

// Define interface for attachments to remove
interface AttachmentToRemove {
  attachmentid: any;
  attachmenturl: any;
  attachmenttype: string;
  attachmentname: string;
  isprimary: boolean;
}

interface PropertyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: Property | null;
  isEdit: boolean;
  isHomepage: boolean;
}

const PROPERTY_TYPES = [
  { id: 1, name: "Open Plot" },
  { id: 2, name: "Apartment" },
  { id: 3, name: "Individual House/Villa" },
  { id: 4, name: "Agriculture Land" },
] as const;

const PROPERTY_CATEGORIES = [
  { id: 1, name: "Sell" },
  { id: 2, name: "Rent" },
] as const;

const parseAmenities = (amenitiesString: string): string[] => {
  // Check if the input string is empty or undefined
  if (!amenitiesString || amenitiesString.trim() === '') {
    return [];
  }

  // Remove curly braces, split by commas, and clean up each item
  return amenitiesString
    .replace(/[{}"]/g, '')  // Remove curly braces and double quotes
    .split(',')              // Split by comma
    .map(amenity => amenity.trim().replace(/'/g, '"')) // Clean up each item
    .filter(Boolean);        // Remove any empty strings from the array
};

const compressImage = (file: File, quality: number): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Set canvas dimensions to the original image dimensions
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Convert canvas to blob with specified quality
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() }));
          } else {
            reject(new Error('Canvas is empty'));
          }
        }, 'image/jpeg', quality); // Use 'image/jpeg' to compress
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const PropertyFormModal: React.FC<PropertyFormModalProps> = ({
  isOpen,
  onClose,
  initialData,
  isEdit,
  isHomepage,
}) => {
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  
  // Updated to use AttachmentToRemove interface for images to remove
  const [imagesToRemove, setImagesToRemove] = useState<AttachmentToRemove[]>([]);
  
  const [formData, setFormData] = useState<PropertyFormData>({
    propertyTitle: "",
    propertyType: 0,
    propertyCategory: 0,
    propertyArea: "",
    bedRooms: "",
    bathRooms: "",
    propertyDescription: "",
    amenities: [],
    location: "",
    price: "",
    currencyType: "",
    availableDate: "",
    address: "",
    landmark: "",
    pinCode: "",
    city: "",
    state: "",
    country: "",
    propertyImages: [],
    latitude: 0,
    longitude: 0,
  });
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({});
  const [charCount, setCharCount] = useState(0);

  const currentDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        propertyTitle: initialData.propertytitle || "",
        propertyType: initialData.propertytypeid || 0,
        propertyCategory: Number(initialData.propertycategory) || 0,
        propertyArea: initialData.area ? initialData.area.toString() : "",
        bedRooms: initialData.bedrooms ? initialData.bedrooms.toString() : "",
        bathRooms: initialData.bathrooms ? initialData.bathrooms.toString() : "",
        propertyDescription: initialData.propertydescription || "",
        amenities: parseAmenities(Array.isArray(initialData.amenities) ? initialData.amenities.join(",") : initialData.amenities || ""),
        location: initialData.generallocation || "",
        price: initialData.price ? initialData.price.toString() : "",
        currencyType: initialData.currencytype || "",
        availableDate: initialData.availabledate || "",
        address: initialData.address || "",
        landmark: initialData.landmark || "",
        pinCode: initialData.pincode || "",
        city: initialData.city || "",
        state: initialData.state || "",
        country: initialData.country || "",
        propertyImages: initialData.attachments || [],
        latitude: initialData.latitude || 0,
        longitude: initialData.longitude || 0,
      });
      
      // Reset imagesToRemove whenever initialData changes
      setImagesToRemove([]);
    }
  }, [initialData, isEdit]);

  if (!isOpen) return null;

  const isBedroomsBathroomsDisabled = formData.propertyType === 1 || formData.propertyType === 4; // Assuming 1 is Open Plot and 4 is Agriculture Land

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessages({});

    const newErrorMessages: { [key: string]: string } = {};

    if (!formData.propertyTitle) {
      newErrorMessages.propertyTitle = "Property Title is required.";
    }
    if (!formData.propertyType) {
      newErrorMessages.propertyType = "Property Type is required.";
    }
    if (!formData.propertyCategory) {
      newErrorMessages.propertyCategory = "Property Category is required.";
    }
    if (!formData.city) {
      newErrorMessages.city = "City is required.";
    }
    if (!formData.state) {
      newErrorMessages.state = "State is required.";
    }
    if (!formData.country) {
      newErrorMessages.country = "Country is required.";
    }
    if (!formData.pinCode) {
      newErrorMessages.pincode = "Pincode is required.";
    }
    if (!formData.price) {
      newErrorMessages.price = "Price is required.";
    }
    if (!formData.availableDate) {
      newErrorMessages.availableDate = "Available Date is required.";
    }
    if (!formData.location) {
      newErrorMessages.location = "Location is required.";
    }
    if (!formData.currencyType) {
      newErrorMessages.currencyType = "Currency is required.";
    }

    if (Object.keys(newErrorMessages).length > 0) {
      setErrorMessages(newErrorMessages);
      setIsSubmitting(false);
      return;
    }

    try {
      const bedroomsToSend = isBedroomsBathroomsDisabled ? 0 : parseInt(formData.bedRooms) || 0;
      const bathroomsToSend = isBedroomsBathroomsDisabled ? 0 : parseInt(formData.bathRooms) || 0;

      const formDataToSend = new FormData();

      formDataToSend.append("userId", user?.userid.toString() || "");
      formDataToSend.append(
        "propertyCategory",
        formData?.propertyCategory?.toString() || ""
      );
      formDataToSend.append(
        "propertyType",
        formData?.propertyType?.toString() || ""
      );
      formDataToSend.append("propertyTitle", formData?.propertyTitle || "");
      formDataToSend.append(
        "propertyDescription",
        formData?.propertyDescription || ""
      );
      formDataToSend.append("address", formData?.address || "");
      formDataToSend.append("location", formData?.location || "");
      formDataToSend.append("landmark", formData?.landmark || "");
      formDataToSend.append("pinCode", formData?.pinCode || "");
      formDataToSend.append("city", formData?.city || "");
      formDataToSend.append("state", formData?.state || "");
      formDataToSend.append("country", formData?.country || "");
      formDataToSend.append("latitude", formData?.latitude?.toString() || "");
      formDataToSend.append("longitude", formData?.longitude?.toString() || "");
      formDataToSend.append("availableDate", formData?.availableDate || "");
      formDataToSend.append("bedRooms", bedroomsToSend.toString());
      formDataToSend.append("bathRooms", bathroomsToSend.toString());
      formDataToSend.append(
        "amenities",
        JSON.stringify(formData?.amenities || [])
      );
      formDataToSend.append("propertyArea", formData?.propertyArea || "0");
      formDataToSend.append("currencyType", formData?.currencyType || "");
      formDataToSend.append("price", formData?.price || "");
      formDataToSend.append("status", "Available");

      // Process and compress images
      if (Array.isArray(formData?.propertyImages)) {
        const compressionQuality = 0.4; // Set your desired compression quality (0 to 1)
        const compressionPromises = formData.propertyImages.map(async (imageObj) => {
          if (imageObj?.file instanceof File) {
            const compressedFile = await compressImage(imageObj.file, compressionQuality);
            formDataToSend.append("propertyImages", compressedFile);
          }
        });

        await Promise.all(compressionPromises); // Wait for all images to be compressed
      }

      if (isEdit) {
        // Add images to remove to the form data
        formDataToSend.append(
          "attachmentsToRemove",
          JSON.stringify(imagesToRemove)
        );
        
        await api.put(
          API_ENDPOINTS.UPDATE_PROPERTY(initialData?.propertyid ?? 0),
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await api.post(API_ENDPOINTS.CREATE_PROPERTY, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setSuccessModalOpen(true);

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["userProperties"] }),
        queryClient.invalidateQueries({ queryKey: ["properties"] }),
      ]);
    } catch (error) {
      console.error("Error creating/updating property:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (formData?.propertyImages.length + files.length > 10) {
      alert("You can only upload up to 10 images");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      propertyImages: [...(prev?.propertyImages || []), ...newImages],
    }));
  };

  // Updated removeImage function to match React Native implementation
  const removeImage = (index: number) => {
    const imageToRemove = formData.propertyImages[index];
    
    // If it's an existing attachment from the database (has attachmentid), add to removal list
    if (imageToRemove.attachmentid) {
      setImagesToRemove(prev => [...prev, {
        attachmentid: imageToRemove.attachmentid,
        attachmenturl: imageToRemove.attachmenturl,
        attachmenttype: imageToRemove.attachmenttype || 'image',
        attachmentname: imageToRemove.attachmentname || 'image',
        isprimary: imageToRemove.isprimary || false
      }]);
    }
    
    // Remove from displayed images regardless of type
    setFormData((prev) => ({
      ...prev,
      propertyImages: prev.propertyImages.filter((_, i) => i !== index),
    }));
  };

  const resetFormData = () => {
    setFormData({
      propertyTitle: "",
      propertyType: 0,
      propertyCategory: 0,
      propertyArea: "",
      bedRooms: "",
      bathRooms: "",
      propertyDescription: "",
      amenities: [],
      location: "",
      price: "",
      currencyType: "",
      availableDate: "",
      address: "",
      landmark: "",
      pinCode: "",
      city: "",
      state: "",
      country: "",
      propertyImages: [],
      latitude: 0,
      longitude: 0,
    });
    // Reset the imagesToRemove array
    setImagesToRemove([]);
  };

  const handleClose = () => {
    resetFormData();
    onClose();
    setSuccessModalOpen(false);
  };

  // Date input change handler (to prevent past dates)
  const handleAvailableDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (selectedDate < currentDate) {
      setErrorMessages((prev) => ({
        ...prev,
        availableDate: "Available Date cannot be in the past.",
      }));
    } else {
      setErrorMessages((prev) => ({
        ...prev,
        availableDate: "",
      }));
    }

    setFormData((prev) => ({
      ...prev,
      availableDate: selectedDate,
    }));
  };

  // console.log("🔥 formData.propertyType:", formData.availableDate);
  // console.log("🧩 selectedType:", selectedTyCategory);
  // console.log("📦 PROPERTY_CATEGORIES:", PROPERTY_CATEGORIES);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg w-full max-w-5xl ${isHomepage ? 'max-h-[70vh]' : 'max-h-[90vh]'} overflow-y-auto`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-black">
              {isEdit ? "Edit Property" : "Create Property"}
            </h2>
            <button
              onClick={() => {
                resetFormData();
                onClose();
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
  
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Property Title"
                  value={formData.propertyTitle}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only up to 75 characters
                    if (value.length <= 75) {
                      setFormData({ ...formData, propertyTitle: value });
                      setErrorMessages((prev) => ({
                        ...prev,
                        propertyTitle: "",
                      }));
                    }
                  }}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />
  
                {errorMessages.propertyTitle && (
                  <p className="text-red-500 text-sm">
                    {errorMessages.propertyTitle}
                  </p>
                )}
              </div>
  
              <div className="relative flex flex-col">
                <select
                  value={Number(formData.propertyCategory) || 0}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      propertyCategory: Number(e.target.value),
                    });
                    // Clear error if a valid category is selected
                    if (Number(e.target.value) !== 0) {
                      setErrorMessages((prevErrors) => ({
                        ...prevErrors,
                        propertyCategory: "",
                      }));
                    }
                  }}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none cursor-pointer pr-10 text-gray-900 placeholder-gray-400"
                  style={{ backgroundColor: "white" }}
                >
                  <option value={0} className="text-gray-400 bg-white">
                    Select Category
                  </option>
                  {PROPERTY_CATEGORIES.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                      className="text-gray-900"
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
  
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                {errorMessages.propertyCategory && (
                  <p className="text-red-500 text-sm">
                    {errorMessages.propertyCategory}
                  </p>
                )}
              </div>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative flex flex-col">
                <select
                  value={formData.propertyType || ""}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      propertyType: Number(e.target.value),
                    });
                    setErrorMessages((prev) => ({ ...prev, propertyType: "" }));
                  }}
                  style={{ backgroundColor: "white" }}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer pr-10 text-gray-900 placeholder-gray-400"
                >
                  <option value="" className="bg-white">
                    Select Property Type
                  </option>
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                {errorMessages.propertyType && (
                  <p className="text-red-500 text-sm">
                    {errorMessages.propertyType}
                  </p>
                )}
              </div>
              <input
                type="text"
                placeholder="Area Size (in Sq.Ft/Sq.Yard)"
                value={formData?.propertyArea || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow only up to 25 characters
                  if (value.length <= 25) {
                    setFormData({ ...formData, propertyArea: e.target.value })
                  }
                }}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Bedrooms"
                value={formData?.bedRooms || ""}
                onChange={(e) =>
                  setFormData({ ...formData, bedRooms: e.target.value })
                }
                disabled={isBedroomsBathroomsDisabled}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 disabled:bg-gray-300"
              />
              <input
                type="text"
                placeholder="Bathrooms"
                value={formData?.bathRooms || ""}
                onChange={(e) =>
                  setFormData({ ...formData, bathRooms: e.target.value })
                }
                disabled={isBedroomsBathroomsDisabled}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 disabled:bg-gray-300"
              />
            </div>
  
            <div>
              <textarea
                placeholder="Property Description"
                value={formData?.propertyDescription || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 2000) {
                    setFormData({
                      ...formData,
                      propertyDescription: value,
                    });
                    setCharCount(value.length);
                  }
                }}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
              <div className="text-right text-gray-500">{charCount}/2000</div>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <div className="flex flex-wrap gap-2 p-3 border border-gray-200 rounded-lg">
                  {formData?.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-black"
                    >
                      {amenity}
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            amenities:
                              formData?.amenities.filter(
                                (a) => a !== amenity
                              ) || [],
                          });
                        }}
                        className="ml-2 hover:text-black"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <select
                    value=""
                    onChange={(e) => {
                      if (
                        e.target.value &&
                        !formData?.amenities.includes(e.target.value)
                      ) {
                        setFormData({
                          ...formData,
                          amenities: [
                            ...formData?.amenities,
                            e.target.value,
                          ],
                        });
                      }
                    }}
                    className="flex-1 min-w-[120px] border-0 focus:ring-0 p-1 bg-transparent text-gray-400"
                  >
                    <option value="" className="text-gray-400">
                      Add Amenity
                    </option>
                    <option value="Swimming Pool" className="text-gray-900">
                      Swimming Pool
                    </option>
                    <option value="Gym" className="text-gray-900">
                      Gym
                    </option>
                    <option value="Parking" className="text-gray-900">
                      Parking
                    </option>
                    <option value="Security" className="text-gray-900">
                      Security
                    </option>
                    <option value="Garden" className="text-gray-900">
                      Garden
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Location"
                  value={formData?.location || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only up to 75 characters
                    if (value.length <= 75) {
                      setFormData({ ...formData, location: value });
                    }
                    // Clear error when typing
                    if (value.trim() !== "") {
                      setErrorMessages((prev) => ({ ...prev, location: "" }));
                    }
                  }}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />
                {errorMessages.location && (
                  <p className="mt-2 text-sm text-red-600">{errorMessages.location}</p>
                )}
              </div>
            </div>
  
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Price"
                  value={formData?.price || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Check if the input is a valid number and its length doesn't exceed 15 digits
                    if (/^\d*$/.test(value) && value.length <= 15) {
                      setFormData({ ...formData, price: value });
                      setErrorMessages((prev) => ({ ...prev, price: "" }));
                    }
                  }}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />
                {errorMessages.price && (
                  <p className="text-red-500 text-sm">{errorMessages.price}</p>
                )}
              </div>
  
              <div className="relative">
                <select
                  value={formData.currencyType || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, currencyType: e.target.value })
                    // Clear error when typing
                    if (e.target.value.trim() !== "") {
                      setErrorMessages((prev) => ({ ...prev, currencyType: "" }));
                    }
                  }}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none cursor-pointer pr-10 text-gray-900 placeholder-gray-400"
                >
                  <option value="" className="text-gray-400">
                    Currency
                  </option>
                  <option value="USD" className="text-gray-900">
                    USD
                  </option>
                  <option value="EUR" className="text-gray-900">
                    EUR
                  </option>
                  <option value="INR" className="text-gray-900">
                    INR
                  </option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                {errorMessages.currencyType && (
                  <p className="mt-2 text-sm text-red-600">{errorMessages.currencyType}</p>
                )}
              </div>
            </div>
  
            <div className="flex flex-col">
              <input
                type="date"
                placeholder="Available Date"
                value={formData?.availableDate || ""}
                min={new Date().toISOString().split("T")[0]} // This sets min to today
                onChange={handleAvailableDateChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
              {errorMessages.availableDate && (
                <p className="text-red-500 text-sm">
                  {errorMessages.availableDate}
                </p>
              )}
            </div>
  
            <div>
              <div className="flex items-center justify-between mb-2 my-4">
                <label className="text-sm font-medium">
                  Upload Images (Max 10)
                </label>
                <span className="text-sm text-gray-500">
                  {formData?.propertyImages.length}/10
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden w-full"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload" // Link the label to the hidden input
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-center"
                >
                  Choose Images (Browse)
                </label>
              </div>
              {formData?.propertyImages.length > 0 && (
                <div className="mt-4 my-8 grid grid-cols-5 gap-4">
                  {formData?.propertyImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.preview || image.attachmenturl}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <XIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
  
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-black">
                Property Address Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="Address"
                    value={formData?.address || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only up to 75 characters
                      if (value.length <= 75) {
                        setFormData({ ...formData, address: value });
                      }
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  />
                  {errorMessages.address && (
                    <p className="text-red-500 text-sm">
                      {errorMessages.address}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="Landmark"
                    value={formData?.landmark || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only up to 60 characters
                      if (value.length <= 60) {
                        setFormData({ ...formData, landmark: value });
                      }
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  />
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="PIN Code"
                    value={formData?.pinCode || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Check if the input is a valid number and its length doesn't exceed 10 digits
                      if (/^\d*$/.test(value) && value.length <= 10) {
                        setFormData({ ...formData, pinCode: value });
  
                        // Clear error when typing
                        if (value.trim() !== "") {
                          setErrorMessages((prev) => ({ ...prev, pinCode: "" }));
                        }
                      }
                    }}
                    onBlur={() => {
                      // Show error on blur if field is empty
                      if (!formData?.pinCode?.trim()) {
                        setErrorMessages((prev) => ({
                          ...prev,
                          pinCode: "Pincode is required.",
                        }));
                      }
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  />
                  {errorMessages.pincode && (
                    <p className="text-red-500 text-sm">
                      {errorMessages.pincode}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only up to 30 characters
                      if (value.length <= 30) {
                        setFormData({ ...formData, city: value });
                        setErrorMessages((prev) => ({ ...prev, city: "" }));
                      }
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  />
                  {errorMessages.city && (
                    <p className="text-red-500 text-sm">{errorMessages.city}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="State"
                    value={formData?.state || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only up to 25 characters
                      if (value.length <= 25) {
                        setFormData({ ...formData, state: value });
  
                        // Clear error when typing
                        if (value.trim() !== "") {
                          setErrorMessages((prev) => ({ ...prev, state: "" }));
                        }
                      }
                    }}
                    onBlur={() => {
                      // Show error on blur if field is empty
                      if (!formData?.state?.trim()) {
                        setErrorMessages((prev) => ({
                          ...prev,
                          state: "State is required.",
                        }));
                      }
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  />
                  {errorMessages.state && (
                    <p className="text-red-500 text-sm">
                      {errorMessages.state}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="Country"
                    value={formData?.country || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 20) {
                        setFormData({ ...formData, country: value });
  
                        // Clear error when typing
                        if (value.trim() !== "") {
                          setErrorMessages((prev) => ({ ...prev, country: "" }));
                        }
                      }
                    }}
                    onBlur={() => {
                      // Show error on blur if field is empty
                      if (!formData?.country?.trim()) {
                        setErrorMessages((prev) => ({
                          ...prev,
                          country: "Country is required.",
                        }));
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-lg border ${errorMessages.country ? "border-red-500" : "border-gray-200"
                      } focus:outline-none focus:ring-2 ${errorMessages.country ? "focus:ring-red-500" : "focus:ring-blue-500"
                      } placeholder-gray-400`}
                  />
                  {errorMessages.country && (
                    <p className="text-red-500 text-sm mt-1">{errorMessages.country}</p>
                  )}
                </div>
              </div>
            </div>
  
            <div className="flex flex-col items-center gap-4">
              <Button type="submit" disabled={isSubmitting} className="w-[50%]">
                {isSubmitting && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {isEdit ? "Update Property" : "Create Property"}
              </Button>
              <button
                type="button"
                onClick={() => {
                  resetFormData();
                  onClose();
                }}
                className="w-full py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <SuccessModal
        title={isEdit ? "Property Updated Successfully" : "Property Added Successfully"}
        description={isEdit ? "Property updated successfully and will be posted once the approval is done" : "Property added successfully and will be posted once the approval is done"}
        isOpen={isSuccessModalOpen}
        onClose={() => {
          handleClose();
        }}
      />
    </div>
  );
};
