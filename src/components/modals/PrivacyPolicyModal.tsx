import React from 'react';
import { X } from 'lucide-react';
import logo from '../../assets/logo.png';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 overflow-hidden">
              <img
                src={logo}
                alt="Estates Hub Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="prose prose-blue max-w-none">
            <div className="bg-blue-50 p-6 rounded-xl mb-8">
              <p className="text-lg text-gray-700">
                Welcome to estateshub ("we," "our," or "us"). Your privacy is important to us. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you use our mobile application estateshub on Android or iOS devices.
              </p>
            </div>

            <div className="space-y-8">
              <section className="bg-white rounded-xl p-6 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">1</span>
                  Information We Collect
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">a) Personal Data</h3>
                    <p className="mb-4 text-gray-600">
                      We may collect personal information that you voluntarily provide when registering, such as:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Name</li>
                      <li>Email address</li>
                      <li>Phone number</li>
                      <li>Profile picture (if applicable)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">b) Automatically Collected Data</h3>
                    <p className="mb-4 text-gray-600">
                      When you use our app, we may automatically collect:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Device Information (model, OS version, unique device identifier)</li>
                      <li>Usage Data (features used, time spent in the app)</li>
                      <li>IP Address</li>
                      <li>Cookies and tracking technologies</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">c) Location Data (if applicable)</h3>
                    <p className="text-gray-600">
                      With your permission, we may collect and process location data to enhance certain features (e.g., nearby services).
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">2</span>
                  How We Use Your Information
                </h2>
                <p className="mb-4 text-gray-600">
                  We use collected data for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>To provide and maintain the app's functionality</li>
                  <li>To personalize user experience</li>
                  <li>To improve app performance and security</li>
                  <li>To send updates, promotions, or important notifications</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section className="bg-white rounded-xl p-6 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">3</span>
                  Sharing Your Information
                </h2>
                <p className="mb-4 text-gray-600">
                  We do not sell or rent your personal data. However, we may share it with:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Service Providers (e.g., cloud storage, analytics tools)</li>
                  <li>Legal Authorities (if required by law or to prevent fraud)</li>
                  <li>Business Partners (only with user consent)</li>
                </ul>
              </section>

              <section className="bg-white rounded-xl p-6 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">4</span>
                  Third-Party Services
                </h2>
                <p className="text-gray-600">
                  Our app may use third-party services such as Google Analytics, Firebase, or Facebook SDK. 
                  These services have their own privacy policies, and we recommend reviewing them.
                </p>
              </section>

              <section className="bg-white rounded-xl p-6 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">5</span>
                  Data Security
                </h2>
                <p className="text-gray-600">
                  We implement security measures (encryption, secure servers) to protect your data. 
                  However, no method is 100% secure, so we cannot guarantee absolute security.
                </p>
              </section>

              <section className="bg-white rounded-xl p-6 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">6</span>
                  Your Rights
                </h2>
                <p className="mb-4 text-gray-600">
                  Depending on your location, you may have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                  <li>Access or correct your data</li>
                  <li>Request deletion of your data</li>
                  <li>Withdraw consent for certain data processing</li>
                </ul>
                <p className="text-gray-600">
                  To exercise these rights, contact us at estateshub4u@gmail.com.
                </p>
              </section>

              <section className="bg-white rounded-xl p-6 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">7</span>
                  Children's Privacy
                </h2>
                <p className="text-gray-600">
                  Our app is not intended for children under 13 (or 16 in some regions). 
                  If we learn that we have collected data from minors, we will take steps to delete it.
                </p>
              </section>

              <section className="bg-white rounded-xl p-6 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">8</span>
                  Changes to This Policy
                </h2>
                <p className="text-gray-600">
                  We may update this Privacy Policy. Any changes will be posted within the app, 
                  and continued use after changes constitutes acceptance.
                </p>
              </section>

              <section className="bg-white rounded-xl p-6 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">9</span>
                  Contact Us
                </h2>
                <p className="mb-4 text-gray-600">
                  If you have any questions, contact us at:
                </p>
                <div className="bg-blue-50 p-6 rounded-xl">
                  <p className="text-gray-700 font-medium">Estates Hub Private Ltd</p>
                  <p className="text-gray-700">Support@estateshub.co.in</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 