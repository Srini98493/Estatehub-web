import React from 'react';
import { Home, Key, DollarSign } from 'lucide-react';

const features = [
  {
    icon: Home,
    title: 'Rent a Home',
    description: 'Find your place with an immersive photo experience and the most listings.',
  },
  {
    icon: Key,
    title: 'Buy a Home',
    description: 'Browse thousands of properties and find your perfect match.',
  },
  {
    icon: DollarSign,
    title: 'Sell a Home',
    description: 'Get the best value for your property with our expert guidance.',
  },
];

export const Features = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Experience the Best of What We Offer
          </h2>
          <p className="mt-4 text-gray-600">
            From innovative tools to seamless functionality,
            our features are crafted to enhance every aspect of your experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};