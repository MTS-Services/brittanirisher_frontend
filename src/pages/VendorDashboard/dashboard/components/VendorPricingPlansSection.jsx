import React, { memo, useState } from 'react';
import { Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { PricingSkeleton } from '../../../../components/skeletons/LoadingSkeletons';
import { useGetSubscriptionPlansQuery } from '../../../../store/features/public/publicApi';
import { useUpdateSubscriptionMutation } from '../../../../store/features/vendor/vendorDashboardApi';

const VendorPricingCard = memo(({ plan, onChoose, isSubmitting }) => (
  <article
    data-gsap-card
    className={`relative flex h-full flex-col rounded-lg border p-4 shadow-sm md:p-6 ${
      plan.featured
        ? 'scale-[1.02] border-[#4f5b4d] bg-[#474f47] text-white'
        : 'border-[#e4dbcf] bg-white text-[#2a241e]'
    }`}
  >
    {plan.featured ? (
      <span className='absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#99a897] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white'>
        Most Popular
      </span>
    ) : null}

    <h3 className='mt-5 font-playfair text-3xl'>{plan.planName}</h3>
    <div className='mt-3 flex items-end gap-1'>
      <span className='font-playfair text-5xl font-bold leading-none'>${plan.priceMonthly}</span>
      <span className={`pb-1 text-sm ${plan.featured ? 'text-white' : 'text-[#857F7A]'}`}>
        /{(plan.validFor || 'month').toLowerCase()}
      </span>
    </div>
    <p
      className={`mb-3 mt-4 font-raleway text-base leading-7 md:text-lg ${
        plan.featured ? 'text-white' : 'text-[#857F7A]'
      }`}
    >
      {plan.sortDescription}
    </p>

    <div className={`border-t ${plan.featured ? 'text-white' : 'text-[#857F7A]'}`} />

    <ul className='mb-6 mt-6 space-y-3 text-sm'>
      {plan.featuresAllowed
        ?.filter((feature) => feature.isIncluded)
        .map((feature, index) => (
          <li key={`${feature.name}-${index}`} className='flex items-center gap-2 font-raleway'>
            <Check size={16} className='text-[#16B21B]' />
            <span className='text-sm'>{feature.name}</span>
          </li>
        ))}

      {plan.featuresAllowed
        ?.filter((feature) => !feature.isIncluded)
        .map((feature, index) => (
          <li
            key={`${feature.name}-excluded-${index}`}
            className='flex items-center gap-2 font-raleway opacity-80'
          >
            <X size={16} className={plan.featured ? 'text-white/70' : 'text-[#6b6b6b]'} />
            <span>{feature.name}</span>
          </li>
        ))}
    </ul>

    <button
      type='button'
      onClick={onChoose}
      disabled={isSubmitting}
      className={`mt-auto inline-flex h-12 w-full items-center justify-center rounded-sm text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 ${
        plan.featured ? 'bg-[#c8d2c4] text-[#425044]' : 'bg-[#d6ddcf] text-[#4f5b4d]'
      }`}
    >
      {isSubmitting ? 'Updating...' : 'Select Plan'}
    </button>
  </article>
));

VendorPricingCard.displayName = 'VendorPricingCard';

const VendorPricingPlansSection = () => {
  const [activePlanId, setActivePlanId] = useState(null);
  const { data, isLoading, error } = useGetSubscriptionPlansQuery();
  const [updateSubscription, { isLoading: isUpdatingSubscription }] = useUpdateSubscriptionMutation();
  const plans = data?.data || [];

  const handleChoosePlan = async (planId) => {
    if (!planId) {
      toast.error('Invalid plan id. Please refresh and try again.');
      return;
    }

    try {
      setActivePlanId(planId);
      const response = await updateSubscription({ planId }).unwrap();
      const redirectUrl =
        response?.url ||
        response?.data?.url ||
        response?.paymentUrl ||
        response?.data?.paymentUrl ||
        response?.checkoutUrl ||
        response?.data?.checkoutUrl;

      if (redirectUrl) {
        window.location.assign(redirectUrl);
        return;
      }

      toast.success('Subscription plan updated successfully.');
    } catch (err) {
      const message = err?.data?.message || 'Failed to update subscription plan.';
      toast.error(message);
    } finally {
      setActivePlanId(null);
    }
  };

  return (
    <section data-gsap-reveal className='my-10'>
      <div className='flex flex-wrap items-end justify-between gap-3'>
        <div className='max-w-2xl py-10'>
          <h2 className='font-playfair text-2xl text-[#171411] sm:text-3xl'>Upgrade Your Plan</h2>
          <p className='mt-2 max-w-2xl font-raleway text-sm text-[#6c6155] sm:text-base'>
            Choose a package and unlock more visibility, better lead quality, and faster growth.
          </p>
        </div>
      </div>

      {isLoading ? <PricingSkeleton /> : null}
      {error ? (
        <p className='mt-8 text-sm text-red-600'>Failed to load pricing plans. Please try again.</p>
      ) : null}

      {!isLoading && !error && plans.length === 0 ? (
        <p className='mt-8 text-sm text-[#6d645a]'>No pricing plans found.</p>
      ) : null}

      {!isLoading && !error && plans.length > 0 ? (
        <div className='mt-8 grid auto-rows-fr gap-10 md:gap-6 xl:grid-cols-3'>
          {plans.map((plan) => (
            <VendorPricingCard
              key={plan.id || plan._id}
              plan={{
                ...plan,
                featured: String(plan.planName || '').toLowerCase() === 'professional',
              }}
              isSubmitting={isUpdatingSubscription && activePlanId === (plan.id || plan._id)}
              onChoose={() => handleChoosePlan(plan.id || plan._id)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default VendorPricingPlansSection;
