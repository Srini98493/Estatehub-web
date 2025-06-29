import React from 'react';

const blogPosts = [
  {
    title: 'Why investing in real estate is good decision',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Why it makes total sense for my parents production company',
    author: 'Type Specimen',
  },
  {
    title: 'Why investing in real estate is good decision',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Why it makes total sense for my parents production company',
    author: 'Type Specimen',
  },
  {
    title: 'Why investing in real estate is good decision',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Why it makes total sense for my parents production company',
    author: 'Type Specimen',
  },
  {
    title: 'Why investing in real estate is good decision',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Why it makes total sense for my parents production company',
    author: 'Type Specimen',
  },
];

export const BlogSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Home Solutions: Expert Tips and Insights
          </h2>
          <p className="mt-4 text-gray-600">
            Unlock the secrets to effective home maintenance. Discover
            professional advice to keep your home in top shape
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogPosts.map((post, index) => (
            <article key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <p className="text-sm text-gray-500">By {post.author}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};