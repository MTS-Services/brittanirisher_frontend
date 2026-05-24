import React from 'react';
import PackagesPricingSection from './components/PackagesPricingSection';
import ProfileDetailsSection from './components/ProfileDetailsSection';
import ProfileHeroSection from './components/ProfileHeroSection';

const packages = [
  {
    name: 'Essential Package',
    price: '$1,200',
    subtitle: 'Perfect for intimate weddings.',
    features: [
      'Full wedding coverage',
      '1 professional photographer',
      '150 professionally edited photos',
      'Private online gallery',
      'Digital download',
      'Delivery within 14 days',
    ],
    featured: false,
  },
  {
    name: 'Premium Package',
    price: '$2,500',
    subtitle: 'Best for full-day wedding coverage.',
    features: [
      'Full wedding coverage',
      '2 professional photographers',
      '400 professionally edited photos',
      'Complimentary engagement session',
      'Private online gallery',
      'Sneak peek within 48 hours',
      'Delivery within 10 days',
    ],
    featured: true,
  },
  {
    name: 'Luxury Package',
    price: '$1,200',
    subtitle: 'Complete luxury wedding experience.',
    features: [
      'Full wedding coverage',
      '2 photographers + 1 videographer',
      '700+ edited photos',
      'Engagement session',
      'Bridal session',
      'Luxury wedding album',
      'Drone photography',
      'Same day teaser',
      'Delivery within 7 days',
    ],
    featured: false,
  },
];

const portfolio = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80',
 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=600&q=80',
];

const VendorProfile = () => (

    <section className='w-full font-raleway text-[#2e322f]'>
      <ProfileHeroSection />
      <ProfileDetailsSection portfolio={portfolio} />
      <PackagesPricingSection packages={packages} />
    </section>

);

export default VendorProfile;
