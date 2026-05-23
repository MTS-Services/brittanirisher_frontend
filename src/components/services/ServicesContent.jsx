import React, { memo } from 'react';

const ServiceCard = memo(({ title, description }) => (
  <div className='bg-white p-6 rounded-lg shadow-md'>
    <h2 className='text-2xl font-semibold text-blue-600 mb-3'>{title}</h2>
    <p className='text-gray-600'>{description}</p>
  </div>
));

ServiceCard.displayName = 'ServiceCard';

// Defined outside the component — never re-created on re-render
const SERVICES = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies',
  },
  {
    id: 2,
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications',
  },
  {
    id: 3,
    title: 'UI/UX Design',
    description: 'Beautiful and intuitive user interfaces',
  },
  {
    id: 4,
    title: 'Consulting',
    description: 'Expert technical consulting and architecture',
  },
];

const ServicesContent = memo(() => {
  return (
    <div className='px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-4xl'>
        <h1 className='mb-6 text-4xl font-bold text-gray-800'>Our Services</h1>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

ServicesContent.displayName = 'ServicesContent';

export default ServicesContent;
