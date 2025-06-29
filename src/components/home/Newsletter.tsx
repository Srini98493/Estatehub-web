import React from 'react';
import { Button } from '../common/Button';

export const Newsletter = () => {
  return (
    <section className="relative py-24 mb-16">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Subscribe to our newsletter
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Stay updated with the latest properties and real estate insights
        </p>
        <div className="max-w-xl mx-auto">
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
            <Button
              size="lg"
              className="whitespace-nowrap"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};