import SettingsHeader from './components/SettingsHeader';
import SettingsSectionShell from './components/SettingsSectionShell';
import SettingsChipRow from './components/SettingsChipRow';
import SettingsPricingCard from './components/SettingsPricingCard';
import SettingsItemModal from './components/SettingsItemModal';
import SettingsSubscriptionModal from './components/SettingsSubscriptionModal';
import { useState } from 'react';

const CATEGORY_CHIPS = [
  'Photography',
  'Catering',
  'Entertainment',
  'Beach Wedding',
  'Garden Wedding',
  'Fairytale Wedding',
];

const STYLE_CHIPS = [
  'Classic Elegance',
  'Modern Chic',
  'Rustic Charm',
  'Bohemian Style',
  'Vintage Romance',
  'Luxury Glam',
  'Minimalist',
];

const PRICING_CARDS = [
  {
    title: 'Starter',
    price: '$29',
    description: 'Perfect for new wedding professionals just starting out.',
    features: [
      'Profile Listing',
      'Portfolio (10 items)',
      'Direct Leads',
      'Basic Support',
    ],
    disabled: [
      'Featured Placement',
      'Analytics Dashboard',
      'Review Management',
    ],
  },
  {
    title: 'Professional',
    price: '$70',
    description: 'The most popular choice for established small businesses.',
    featured: true,
    features: [
      'Priority Listing',
      'Unlimited Portfolio',
      'Lead Notifications',
      'Review Management',
      'Basic Support',
    ],
    disabled: ['Dedicated Account Manager', 'Top-Tier Placement'],
  },
  {
    title: 'Premium',
    price: '$149',
    description: 'Maximum exposure for the wedding industry leaders.',
    features: [
      'Top-Tier Placement',
      'Unlimited Everything',
      'Advanced Analytics',
      'Account Manager',
      'Lead Verification',
    ],
    disabled: [],
  },
];

export default function Settings() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <>
      <div className='space-y-8'>
        <SettingsHeader
          title='Powerful Settings Control for Complete Store Management'
          description='Customize categories, models, and pricing rules with full flexibility from your admin settings panel.'
        />

        <div className='space-y-4'>
          <SettingsSectionShell
            title='Category'
            actionLabel='Add Category'
            onActionClick={() => setActiveModal('category')}
          >
            <SettingsChipRow items={CATEGORY_CHIPS} />
          </SettingsSectionShell>

          <SettingsSectionShell
            title='Wedding Style'
            actionLabel='Add Topics'
            onActionClick={() => setActiveModal('style')}
          >
            <SettingsChipRow items={STYLE_CHIPS} />
          </SettingsSectionShell>

          <SettingsSectionShell
            title='Pricing'
            actionLabel='Add Price'
            onActionClick={() => setActiveModal('price')}
          >
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
              {PRICING_CARDS.map((card) => (
                <SettingsPricingCard key={card.title} {...card} />
              ))}
            </div>
          </SettingsSectionShell>
        </div>
      </div>

      <SettingsItemModal
        open={activeModal === 'category'}
        title='Category name'
        placeholder='Category name'
        submitLabel='Save'
        onClose={() => setActiveModal(null)}
      />

      <SettingsItemModal
        open={activeModal === 'style'}
        title='Wedding Style'
        placeholder='Category name'
        submitLabel='Save'
        onClose={() => setActiveModal(null)}
      />

      <SettingsSubscriptionModal
        open={activeModal === 'price'}
        onClose={() => setActiveModal(null)}
      />
    </>
  );
}
