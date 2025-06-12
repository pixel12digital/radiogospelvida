import React from 'react';

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12 lg:py-16">
      {children}
    </div>
  );
} 