import React, { useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import logo from "../../assets/logo_4.png";
import { Link } from "react-router-dom";
import { PrivacyPolicyModal } from "../modals/PrivacyPolicyModal";

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Linkedin, href: "#" },
];

export const Footer = () => {

  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);


  return (
    <footer className="bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-stretch mb-4">
          {/* Logo and Description */}
          <div className="flex flex-col items-center lg:mr-auto">
            <div className="h-48 w-48 rounded overflow-hidden flex items-center justify-center mb-2">
              <img
                src={logo}
                alt="Site Logo"
                className="max-h-full max-w-full object-contain"
              />
            </div>


            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Download Section */}
            <div className="flex flex-col items-center justify-center ml-auto">
            <h3 className="text-white font-semibold mb-2 text-center">Download</h3>
            <div className="space-y-2 flex flex-col items-center">
              <a href="https://apps.apple.com/app/id6743548963" target="_blank"
                rel="noopener noreferrer" className="block" onClick={(event) => {
                  console.log("Clicked!", event);

                  // If for some reason you want to prevent navigation, call:
                  // event.preventDefault();

                  // Otherwise, just let it proceed naturally.
                }}>
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on App Store"
                  className="h-10"
                />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.estateshub.app" target="_blank"
                rel="noopener noreferrer" className="block" onClick={(event) => {
                  console.log("Clicked!", event);

                  // If for some reason you want to prevent navigation, call:
                  // event.preventDefault();

                  // Otherwise, just let it proceed naturally.
                }}>
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  className="h-14"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="pt-4 mt-4 border-t border-gray-800 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400">© 2024 All Rights Reserved</div>
            <div className="flex flex-wrap justify-center gap-6">
              <button
                onClick={() => setIsPrivacyPolicyOpen(true)}
                className="text-gray-400 hover:text-white"
              >
                Privacy Policy
              </button>
              <Link to="/contact-us" className="text-gray-400 hover:text-white">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
      <PrivacyPolicyModal
        isOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
      />
    </footer>
  );
};
