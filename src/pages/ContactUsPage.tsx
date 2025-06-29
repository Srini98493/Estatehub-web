import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';

export const ContactUsPage = () => {
  return (
    <PageLayout title="Contact Us">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h1>
            <p className="text-gray-600">
              We're here to help and answer any questions you might have.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 justify-items-center">
            {/* Contact Information */}
            <div className="w-full max-w-sm">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                  </div>
                </div>
                <a 
                  href="mailto:Support@estateshub.co.in"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Support@estateshub.co.in
                </a>
              </div>
            </div>

            <div className="w-full max-w-sm">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                  </div>
                </div>
                <a 
                  href="tel:+919000062299"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  +91 90000 62299
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}; 