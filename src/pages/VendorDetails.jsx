import React, { memo, useMemo, useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Check,
  X,
  ChevronLeft,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  Heart,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  Music2,
  Pin,
  MessageCircle,
  Globe,
  Send,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  useGetVendorDetailQuery,
  useSendEnquiryMutation,
  useGetVendorCalendarQuery,
} from '../../src/store/features/public/publicApi';
import {
  useGetSaveVendorsQuery,
  useSaveVendorMutation,
} from '../../src/store/features/couple/coupleDashboard';
import { useSEO } from '../hooks/useSEO';
import { API_CONFIG } from '../config';

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });
  } catch (e) {
    return iso;
  }
};

// ── Vendor Profile Full Skeleton Loader ──
const VendorDetailsSkeleton = () => (
  <div className='container mx-auto pt-8 px-4 space-y-10 animate-pulse'>
    {/* Back Button Skeleton */}
    <div className='h-5 w-16 bg-[#ece9e2] rounded' />

    {/* Hero Area Skeleton */}
    <div className='overflow-hidden rounded-md border border-[#eadfcd] bg-white shadow-sm'>
      <div className='h-70 md:h-96 bg-[#ece9e2]' />
      <div className='p-4 md:p-6 flex flex-col md:flex-row md:items-start justify-between gap-6'>
        <div className='space-y-3 flex-1'>
          <div className='h-8 w-1/3 bg-[#ece9e2] rounded' />
          <div className='h-6 w-20 bg-[#ece9e2] rounded-full' />
          <div className='flex gap-4 pt-2'>
            <div className='h-4 w-24 bg-[#ece9e2] rounded' />
            <div className='h-4 w-32 bg-[#ece9e2] rounded' />
            <div className='h-4 w-28 bg-[#ece9e2] rounded' />
          </div>
        </div>
        <div className='flex gap-3'>
          <div className='h-10 w-10 bg-[#ece9e2] rounded-full' />
          <div className='h-10 w-28 bg-[#ece9e2] rounded' />
        </div>
      </div>
    </div>

    {/* Pricing Section Skeleton */}
    <div className='text-center space-y-6'>
      <div className='h-7 w-48 bg-[#ece9e2] rounded mx-auto' />
      <div className='grid gap-8 md:gap-5 lg:grid-cols-3'>
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className='rounded-lg border border-[#e4dbcf] bg-white p-6 space-y-4'
          >
            <div className='h-7 w-1/2 bg-[#ece9e2] rounded' />
            <div className='h-10 w-1/3 bg-[#ece9e2] rounded' />
            <div className='h-4 w-full bg-[#ece9e2] rounded' />
            <hr className='border-[#e4dbcf]' />
            <div className='space-y-2 pt-2'>
              <div className='h-4 w-3/4 bg-[#ece9e2] rounded' />
              <div className='h-4 w-5/6 bg-[#ece9e2] rounded' />
              <div className='h-4 w-2/3 bg-[#ece9e2] rounded' />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* 3-Column Grid Skeleton (About, Calendar, Inquiry) */}
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {/* About Skeleton */}
      <div className='bg-[#faf9f6] rounded-md p-6 border border-[#eadfcd] space-y-4'>
        <div className='h-6 w-1/3 bg-[#ece9e2] rounded' />
        <div className='space-y-2 pt-2'>
          <div className='h-4 w-full bg-[#ece9e2] rounded' />
          <div className='h-4 w-full bg-[#ece9e2] rounded' />
          <div className='h-4 w-4/5 bg-[#ece9e2] rounded' />
        </div>
      </div>
      {/* Calendar Skeleton */}
      <div className='bg-[#faf9f6] rounded-md p-6 border border-[#eadfcd] space-y-4'>
        <div className='h-6 w-1/2 bg-[#ece9e2] rounded' />
        <div className='h-40 bg-[#ece9e2] rounded' />
        <div className='h-10 w-full bg-[#ece9e2] rounded' />
      </div>
      {/* Inquiry Form Skeleton */}
      <div className='bg-[#faf9f6] rounded-md p-6 border border-[#eadfcd] space-y-4'>
        <div className='h-6 w-1/2 bg-[#ece9e2] rounded' />
        <div className='space-y-3'>
          <div className='h-8 w-full bg-[#ece9e2] rounded' />
          <div className='h-8 w-full bg-[#ece9e2] rounded' />
          <div className='h-8 w-full bg-[#ece9e2] rounded' />
        </div>
      </div>
    </div>
  </div>
);

const PricingCard = memo(({ plan, badge }) => {
  return (
    <article
      className={`relative rounded-lg border p-4 md:p-6 flex flex-col h-full shadow-sm ${
        badge === 1
          ? 'border-[#4f5b4d] bg-[#474f47] text-white scale-[1.02]'
          : 'border-[#e4dbcf] bg-white text-[#2a241e]'
      }`}
    >
      {badge === 1 && (
        <span className='absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#99a897] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white whitespace-nowrap'>
          {/* {badge === 1 ? 'Most Popular' : 'Best Value'} */}
          Recommended
        </span>
      )}

      <h3 className='mt-5 font-playfair text-start text-3xl'>
        {plan.packageName}
      </h3>
      <div className='mt-3 flex items-end gap-1 py-2'>
        <span className='font-playfair font-bold text-start text-4xl leading-none'>
          ${Number(plan.price).toLocaleString()}
        </span>
        <span
          className={`pb-1 text-sm ${badge === 1 ? 'text-white' : 'text-[#857F7A]'}`}
        >
          /package
        </span>
      </div>
      <p
        className={`mt-4 mb-3 font-raleway text-start text-base md:text-lg leading-7 ${badge === 1 ? 'text-white' : 'text-[#857F7A]'}`}
      >
        {plan.shortDescription || 'No description provided for this package.'}
      </p>
      <div
        className={`border-t my-4 ${badge === 1 ? 'border-white/20' : 'border-[#e4dbcf]'}`}
      />
      <ul className='mt-4 mb-6 space-y-3 text-sm flex-1'>
        {plan.features?.map((feature, idx) => (
          <li key={idx} className='flex items-center gap-2 font-raleway'>
            <Check size={16} className='text-[#16B21B] shrink-0' />
            <span className='text-sm font-medium'>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
});

const PricingGrid = ({ packages }) => {
  if (!packages || packages.length === 0) {
    return (
      <p className='text-[#857F7A] font-raleway mt-4'>
        No packages available for this vendor.
      </p>
    );
  }

  return (
    <div className='max-w-7xl mx-auto grid gap-8 md:gap-5 lg:grid-cols-3 auto-rows-fr mt-8'>
      {packages.map((plan, index) => (
        <PricingCard key={plan.id} plan={plan} badge={index} />
      ))}
    </div>
  );
};

const monthLabel = (date) =>
  date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

const buildMonthMatrix = (year, month) => {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const days = [];
  const startDay = first.getDay();
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let d = 1; d <= last.getDate(); d++) days.push(new Date(year, month, d));
  return days;
};

const toSafeString = (value) => (typeof value === 'string' ? value.trim() : '');

const ensureHttpUrl = (value) => {
  const raw = toSafeString(value);
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://${raw}`;
};

const normalizePhoneForUrl = (value) =>
  toSafeString(value).replace(/[^0-9+]/g, '');

const toTelegramUrl = (value) => {
  const raw = toSafeString(value);
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://t.me/${raw.replace(/^@/, '')}`;
};

const toMessengerUrl = (value) => {
  const raw = toSafeString(value);
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://m.me/${raw.replace(/^@/, '')}`;
};

const toWhatsAppUrl = (value) => {
  const raw = toSafeString(value);
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  return `https://wa.me/${digits}`;
};

const VendorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const enquiryRef = useRef(null);

  const { data: response, isLoading, isError } = useGetVendorDetailQuery(id);
  const { data: savedVendorsResponse } = useGetSaveVendorsQuery(
    { page: 1, limit: 200 },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  );

  const [saveVendor, { isLoading: isSaving }] = useSaveVendorMutation();
  const [sendEnquiry, { isLoading: isInquiring }] = useSendEnquiryMutation();

  const vendor = response?.data;

  useSEO({
    title: vendor ? `${vendor.businessName} — Vendor` : 'Vendor details',
    description: vendor ? vendor.aboutMe : 'Vendor details',
  });

  const [selectedDate, setSelectedDate] = useState('');
  const [bookingStatus, setBookingStatus] = useState('idle');
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activePortfolioIndex, setActivePortfolioIndex] = useState(null);
  const contactMenuRef = useRef(null);

  const calendarParams = useMemo(() => {
    if (!id) return null;
    return {
      vendorId: id,
      month: String(month.getMonth() + 1),
      year: month.getFullYear(),
    };
  }, [id, month]);

  const { data: calendarResponse, isLoading: isCalendarLoading } =
    useGetVendorCalendarQuery(calendarParams, { skip: !id });

  const savedVendorList = useMemo(() => {
    const candidates =
      savedVendorsResponse?.data?.vendors ||
      savedVendorsResponse?.vendors ||
      savedVendorsResponse?.data ||
      [];

    return Array.isArray(candidates) ? candidates : [];
  }, [savedVendorsResponse]);

  const isVendorSavedFromQuery = useMemo(() => {
    if (!id) return false;

    return savedVendorList.some((item) => {
      const savedId =
        item?.vendorId || item?.vendor?.id || item?.vendorProfileId || item?.id;

      return String(savedId || '') === String(id);
    });
  }, [id, savedVendorList]);

  useEffect(() => {
    setIsFavorite(isVendorSavedFromQuery);
  }, [isVendorSavedFromQuery]);

  const heroImages = useMemo(() => {
    const arr = [];
    if (vendor?.coverImage) {
      arr.push(vendor.coverImage);
    }
    if (vendor?.portfolioImages && vendor.portfolioImages.length > 0) {
      vendor.portfolioImages.forEach((img) => {
        if (img.mediaUrl) arr.push(img.mediaUrl);
      });
    }
    while (arr.length < 3) {
      arr.push('/dummy-image-square.jpg');
    }
    return arr;
  }, [vendor]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setHeroIndex(0);
    setSelectedDate('');
    setBookingStatus('idle');
    setIsContactOpen(false);
    setActivePortfolioIndex(null);
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contactMenuRef.current &&
        !contactMenuRef.current.contains(event.target)
      ) {
        setIsContactOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const bookedSet = useMemo(() => {
    const bookedDates = calendarResponse?.data?.days || [];
    const set = new Set();
    bookedDates.forEach((day) => {
      if (day?.status === 'BOOKED' && day?.blockedDate) {
        set.add(day.blockedDate.slice(0, 10));
      }
    });
    return set;
  }, [calendarResponse]);

  const portfolioItems = vendor?.portfolioImages || [];
  const hasPortfolio = portfolioItems.length > 0;

  const closePortfolioModal = () => setActivePortfolioIndex(null);

  const showPrevPortfolio = () => {
    if (!hasPortfolio) return;
    setActivePortfolioIndex((current) => {
      if (typeof current !== 'number') return 0;
      return (current - 1 + portfolioItems.length) % portfolioItems.length;
    });
  };

  const showNextPortfolio = () => {
    if (!hasPortfolio) return;
    setActivePortfolioIndex((current) => {
      if (typeof current !== 'number') return 0;
      return (current + 1) % portfolioItems.length;
    });
  };

  useEffect(() => {
    if (typeof activePortfolioIndex !== 'number' || !hasPortfolio) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closePortfolioModal();
      } else if (event.key === 'ArrowLeft') {
        showPrevPortfolio();
      } else if (event.key === 'ArrowRight') {
        showNextPortfolio();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activePortfolioIndex, hasPortfolio, portfolioItems.length]);

  if (isLoading) {
    return <VendorDetailsSkeleton />;
  }

  if (isError || !vendor) {
    return (
      <div className='container mx-auto py-20 text-center font-raleway'>
        <p className='text-lg text-red-500'>
          Vendor not found or failed to load profile.
        </p>
        <button
          onClick={() => navigate(-1)}
          className='mt-4 px-4 py-2 bg-[#3a3028] text-white rounded'
        >
          Go back
        </button>
      </div>
    );
  }

  const prevHero = () =>
    setHeroIndex((i) => (i - 1 + heroImages.length) % heroImages.length);
  const nextHero = () => setHeroIndex((i) => (i + 1) % heroImages.length);

  const serviceHighlights = vendor.highlightedServices || [];
  const days = buildMonthMatrix(month.getFullYear(), month.getMonth());
  const socialLinks =
    vendor.socialLinks && typeof vendor.socialLinks === 'object'
      ? vendor.socialLinks
      : {};
  const contactLinks =
    vendor.contactLinks && typeof vendor.contactLinks === 'object'
      ? vendor.contactLinks
      : {};

  const socialItems = [
    {
      key: 'facebook',
      label: 'Facebook',
      href: ensureHttpUrl(socialLinks.facebook),
      Icon: Facebook,
    },
    {
      key: 'instagram',
      label: 'Instagram',
      href: ensureHttpUrl(socialLinks.instagram),
      Icon: Instagram,
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      href: ensureHttpUrl(socialLinks.linkedin),
      Icon: Linkedin,
    },
    {
      key: 'youtube',
      label: 'YouTube',
      href: ensureHttpUrl(socialLinks.youtube),
      Icon: Youtube,
    },
    {
      key: 'twitter',
      label: 'Twitter',
      href: ensureHttpUrl(socialLinks.twitter),
      Icon: Twitter,
    },
    {
      key: 'tiktok',
      label: 'TikTok',
      href: ensureHttpUrl(socialLinks.tiktok),
      Icon: Music2,
    },
    {
      key: 'pinterest',
      label: 'Pinterest',
      href: ensureHttpUrl(socialLinks.pinterest),
      Icon: Pin,
    },
  ];

  const visibleSocialItems =
    vendor.isSocialShow === true ? socialItems.filter((item) => item.href) : [];

  const contactActions = [
    {
      key: 'email',
      label: 'Email',
      value: toSafeString(contactLinks.email),
      href: toSafeString(contactLinks.email)
        ? `mailto:${toSafeString(contactLinks.email)}`
        : '',
      Icon: Mail,
    },
    {
      key: 'phone',
      label: 'Phone',
      value: toSafeString(contactLinks.phone),
      href: normalizePhoneForUrl(contactLinks.phone)
        ? `tel:${normalizePhoneForUrl(contactLinks.phone)}`
        : '',
      Icon: Phone,
    },
    {
      key: 'website',
      label: 'Website',
      value: toSafeString(contactLinks.website),
      href: ensureHttpUrl(contactLinks.website),
      Icon: Globe,
    },
    {
      key: 'telegram',
      label: 'Telegram',
      value: toSafeString(contactLinks.telegram),
      href: toTelegramUrl(contactLinks.telegram),
      Icon: Send,
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      value: toSafeString(contactLinks.whatsapp),
      href: toWhatsAppUrl(contactLinks.whatsapp),
      Icon: MessageCircle,
    },
    {
      key: 'messenger',
      label: 'Messenger',
      value: toSafeString(contactLinks.messenger),
      href: toMessengerUrl(contactLinks.messenger),
      Icon: MessageSquare,
    },
  ].filter((item) => item.href);

  const prevMonth = () =>
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  const nextMonth = () =>
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));

  const handleBook = () => {
    if (!selectedDate) {
      return;
    }
    setBookingStatus('loading');
    setTimeout(() => {
      setBookingStatus('done');
      toast.success(
        `Booking request sent for ${formatDate(selectedDate)} — ${vendor.businessName}`,
      );
    }, 700);
  };

  const handleSendEnquiry = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !phone || !email) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const enquiryPayload = {
      vendorId: id,
      senderName: name,
      senderPhone: phone,
      senderEmail: email,
      message: message || '',
      status: 'NEW',
    };

    try {
      await sendEnquiry(enquiryPayload).unwrap();
      toast.success('Inquiry sent successfully!');
      form.reset();
    } catch (error) {
      toast.error(
        error?.data?.message || 'Failed to send inquiry. Please try again.',
      );
    }
  };

  const handleToggleFavorite = async () => {
    const previousState = isFavorite;
    setIsFavorite(!previousState);

    try {
      await saveVendor({ vendorId: id }).unwrap();
      toast.success(
        previousState ? 'Removed from favorites' : 'Added to favorites',
      );
    } catch (error) {
      setIsFavorite(previousState);
      toast.error('Failed to update favorite status.');
    }
  };

  return (
    <div className='relative container mx-auto pt-8 font-serif px-4'>
      <img
        src='/Service_Highlights.png'
        alt=''
        aria-hidden='true'
        className='pointer-events-none absolute right-10 top-470 z-50 hidden w-56 translate-x-1/4 -translate-y-1/4 md:block lg:w-40'
      />
      <div className='flex items-center justify-between mb-4'>
        <button
          onClick={() => navigate(-1)}
          className='text-base text-[#4A4A4A] inline-flex items-center gap-1.5 font-raleway bg-transparent border-none cursor-pointer'
        >
          <ChevronLeft size={22} /> Back
        </button>
      </div>

      {/* Hero Layout */}
      <div className='overflow-hidden rounded-md shadow-sm border border-[#eadfcd] bg-white'>
        <div className='relative'>
          <img
            src={`${API_CONFIG.BASE_URL}${heroImages[heroIndex]}`}
            alt={`${vendor.businessName} image ${heroIndex + 1}`}
            className='w-full h-70 md:h-100 object-cover '
          />
          <button
            onClick={prevHero}
            aria-label='Previous image'
            className='absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 md:p-2 rounded-full hover:bg-white shadow-sm'
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextHero}
            aria-label='Next image'
            className='absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 md:p-2 rounded-full hover:bg-white shadow-sm'
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className='p-4 md:p-6'>
          <div className='flex flex-col md:flex-row md:items-start justify-between gap-6'>
            <div>
              <h1 className='text-2xl md:text-3xl font-serif text-[#201c18] capitalize'>
                {vendor.businessName}
              </h1>
              {vendor.category?.name && (
                <div className='py-1 mt-2 px-3 bg-[#e8dfd3] inline-flex rounded-full text-xs font-raleway text-[#4a3f35]'>
                  <span>{vendor.category.name}</span>
                </div>
              )}
            </div>

            <div
              className='relative flex items-center gap-2 self-start md:self-auto'
              ref={contactMenuRef}
            >
              <button
                className='flex items-center justify-center p-2 bg-white border border-[#eadfcd] rounded-full transition-colors disabled:opacity-70'
                onClick={handleToggleFavorite}
                disabled={isSaving}
                aria-label={
                  isFavorite ? 'Remove from favorites' : 'Add to favorites'
                }
              >
                <Heart
                  size={24}
                  className={
                    isFavorite
                      ? 'fill-[#D4A574] text-[#D4A574]'
                      : 'text-[#D4A574]'
                  }
                />
              </button>

              {contactActions.length > 0 && (
                <button
                  type='button'
                  onClick={() => setIsContactOpen((prev) => !prev)}
                  className='inline-flex items-center gap-1 rounded border border-[#d5c2ac] bg-white px-4 py-2.5 font-raleway text-sm font-medium text-[#7a5938] transition-colors hover:bg-[#fff8ef]'
                >
                  <MessageCircle size={16} /> Contact
                </button>
              )}

              <a
                href='#enquiry'
                className='px-5 py-2.5 font-raleway bg-[#D4A574] hover:bg-[#c39463] text-white rounded text-sm font-medium transition-colors'
              >
                Send Inquiry
              </a>

              {isContactOpen && contactActions.length > 0 && (
                <div className='absolute bottom-full right-0 z-20 mb-2 w-[280px] rounded-xl border border-[#eadfcd] bg-white p-3 shadow-xl'>
                  <p className='mb-2 font-raleway text-xs uppercase tracking-[0.18em] text-[#a48a70]'>
                    Quick Contact
                  </p>
                  <div className='space-y-1'>
                    {contactActions.map(({ key, label, value, href, Icon }) => {
                      const shouldOpenNewTab =
                        href.startsWith('http://') ||
                        href.startsWith('https://');

                      return (
                        <a
                          key={key}
                          href={href}
                          target={shouldOpenNewTab ? '_blank' : undefined}
                          rel={
                            shouldOpenNewTab ? 'noreferrer noopener' : undefined
                          }
                          className='flex items-start gap-2 rounded-md px-2 py-2 text-[#4f3f33] transition-colors hover:bg-[#f7efe6]'
                        >
                          <span className='mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f6eee6] text-[#8f6f4f]'>
                            <Icon size={14} />
                          </span>
                          <span className='min-w-0'>
                            <span className='block font-raleway text-[11px] uppercase tracking-wide text-[#9c836b]'>
                              {label}
                            </span>
                            <span className='mt-0.5 block truncate font-raleway text-sm text-[#4a3f35]'>
                              {value}
                            </span>
                          </span>
                          <ExternalLink
                            size={14}
                            className='ml-auto mt-1 text-[#b19882]'
                          />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className='mt-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
            <div className='flex flex-wrap font-raleway items-center gap-x-4 gap-y-2 text-sm text-[#6B6B6B]'>
              <span className='inline-flex items-center gap-1'>
                <MapPin size={18} className='shrink-0' /> {vendor.location}
              </span>
              <span className='inline-flex items-center gap-1'>
                <Mail size={18} className='shrink-0' /> {vendor.user?.email}
              </span>
              {vendor.phone && (
                <span className='inline-flex items-center gap-1'>
                  <Phone size={18} className='shrink-0' /> {vendor.phone}
                </span>
              )}
            </div>

            {visibleSocialItems.length > 0 && (
              <div className='flex flex-nowrap items-center justify-start gap-2 md:justify-end'>
                {visibleSocialItems.map(({ key, label, href, Icon }) => (
                  <a
                    key={key}
                    href={href}
                    target='_blank'
                    rel='noreferrer noopener'
                    aria-label={label}
                    title={label}
                    className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e7dac9] bg-white text-[#8f6f4f] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#d4a574] hover:text-[#c78645]'
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div className='relative overflow-visible'>
        <section className='relative py-14'>
          <div className='relative text-center'>
            <h2 className='font-playfair mb-2 text-2xl text-[#2a241e] md:text-[30px]'>
              Packages &amp; Pricing
            </h2>
            <PricingGrid packages={vendor.packages} />
          </div>
        </section>
      </div>

      {/* Grid: About / Calendar / Enquiry */}
      <section className='grid grid-cols-1 md:grid-cols-3 pb-14 gap-6'>
        {/* About Me */}
        <div className='bg-[#faf9f6] rounded-md shadow-sm p-4 md:p-6 border border-[#eadfcd]'>
          <h2 className='font-playfair text-xl font-semibold text-[#2a241e] md:text-2xl pb-3 border-b border-[#ddd6cd] mb-4'>
            About Me
          </h2>
          <p className='text-base font-raleway text-[#4a3f35] leading-relaxed whitespace-pre-line text-justify'>
            {vendor.aboutMe || 'No introduction written yet.'}
          </p>
        </div>

        {/* Availability Calendar */}
        <div className='bg-[#faf9f6] rounded-md shadow-sm p-4 md:p-6 font-raleway flex flex-col justify-between border border-[#eadfcd] relative'>
          {/* Calendar Internal Loading overlay */}
          {isCalendarLoading && (
            <div className='absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-md'>
              <span className='text-xs text-[#6b7c65] font-semibold animate-pulse'>
                Updating calendar...
              </span>
            </div>
          )}

          <div>
            <div className='flex items-center justify-between mb-4 pb-3 border-b border-[#ddd6cd]'>
              <h2 className='font-playfair text-xl font-semibold text-[#2a241e] md:text-2xl'>
                Available Dates
              </h2>
              <div className='flex items-center gap-2 text-[11px] text-[#6b5e52]'>
                <span className='flex items-center gap-1'>
                  <span className='w-2 h-2 rounded-full bg-[#b0a89c]' /> Booked
                </span>
                <span className='flex items-center gap-1'>
                  <span className='w-2 h-2 rounded-full bg-[#5c6e58]' />{' '}
                  Available
                </span>
              </div>
            </div>

            <div className='flex items-center justify-between mb-4'>
              <button
                onClick={prevMonth}
                className='text-[#4a3f35] p-1 hover:opacity-75 bg-transparent border-none cursor-pointer'
              >
                <ChevronLeft size={20} />
              </button>
              <span className='text-lg font-playfair font-semibold text-[#2a241e]'>
                {monthLabel(month)}
              </span>
              <button
                onClick={nextMonth}
                className='text-[#4a3f35] p-1 hover:opacity-75 bg-transparent border-none cursor-pointer'
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className='grid grid-cols-7 text-center text-xs font-semibold text-[#8a7a6a] mb-2 tracking-wider'>
              {['SUN', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'].map((d) => (
                <div key={d} className='py-1'>
                  {d}
                </div>
              ))}
            </div>

            <div className='grid grid-cols-7 gap-1 text-sm'>
              {days.map((dt, i) => {
                if (!dt) return <div key={`blank-${i}`} className='py-2' />;

                const yearStr = dt.getFullYear();
                const monthStr = String(dt.getMonth() + 1).padStart(2, '0');
                const dayStr = String(dt.getDate()).padStart(2, '0');
                const iso = `${yearStr}-${monthStr}-${dayStr}`;

                const isBooked = bookedSet.has(iso);
                const isSelected = selectedDate === iso;

                if (isSelected) {
                  return (
                    <div
                      key={iso}
                      className='flex items-center justify-center py-1'
                    >
                      <button className='w-8 h-8 rounded-full bg-[#6b7c65] text-white text-xs font-semibold flex items-center justify-center cursor-pointer border-none'>
                        {dt.getDate()}
                      </button>
                    </div>
                  );
                }

                return (
                  <button
                    key={iso}
                    onClick={() => {
                      if (!isBooked) setSelectedDate(iso);
                    }}
                    disabled={isBooked}
                    className={`text-center py-1.5 text-sm rounded transition-colors ${
                      isBooked
                        ? 'text-[#c8bfb5] line-through cursor-not-allowed bg-[#f0ede6]/40'
                        : 'text-[#4a3f35] font-semibold hover:bg-[#6b7c65] hover:text-white cursor-pointer'
                    }`}
                  >
                    {dt.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          <div className='mt-6'>
            <button
              onClick={handleBook}
              disabled={bookingStatus === 'loading' || !selectedDate}
              className='w-full px-4 py-2.5 bg-[#6b7c65] hover:bg-[#5c6e58] text-white text-sm font-medium rounded tracking-wide transition-colors cursor-pointer disabled:opacity-50'
            >
              {bookingStatus === 'loading'
                ? 'Requesting...'
                : 'Request Booking'}
            </button>
          </div>
        </div>

        {/* Inquiry Form */}
        <div
          className='bg-[#faf9f6] rounded-md shadow-sm p-4 md:p-6 border border-[#eadfcd]'
          id='enquiry'
          ref={enquiryRef}
        >
          <h2 className='font-playfair text-xl font-semibold text-[#2a241e] md:text-2xl pb-3 border-b border-[#ddd6cd] mb-4'>
            Send Inquiry
          </h2>
          <form onSubmit={handleSendEnquiry} className='flex flex-col gap-3'>
            <div>
              <label className='block text-xs font-semibold text-[#1a1a1a] mb-1 font-raleway'>
                Name
              </label>
              <input
                name='name'
                required
                placeholder='Enter your full name'
                className='w-full px-3 py-2 border border-[#ddd6cd] rounded text-sm font-raleway text-[#4a3f35] bg-white placeholder-[#b0a89c] outline-none focus:border-[#b0a89c]'
              />
            </div>
            <div>
              <label className='block text-xs font-semibold text-[#1a1a1a] mb-1 font-raleway'>
                Phone Number
              </label>
              <input
                name='phone'
                required
                placeholder='Enter your phone number'
                className='w-full px-3 py-2 border border-[#ddd6cd] rounded text-sm font-raleway text-[#4a3f35] bg-white placeholder-[#b0a89c] outline-none focus:border-[#b0a89c]'
              />
            </div>
            <div>
              <label className='block text-xs font-semibold text-[#1a1a1a] mb-1 font-raleway'>
                Email
              </label>
              <input
                name='email'
                type='email'
                required
                placeholder='Enter your email address'
                className='w-full px-3 py-2 border border-[#ddd6cd] rounded text-sm font-raleway text-[#4a3f35] bg-white placeholder-[#b0a89c] outline-none focus:border-[#b0a89c]'
              />
            </div>
            <div>
              <label className='block text-xs font-semibold text-[#1a1a1a] mb-1 font-raleway'>
                Message
              </label>
              <textarea
                name='message'
                placeholder='Write how we can help you'
                rows={4}
                className='w-full px-3 py-2 border border-[#ddd6cd] rounded text-sm font-raleway text-[#4a3f35] bg-white placeholder-[#b0a89c] outline-none focus:border-[#b0a89c] resize-none'
              />
            </div>
            <button
              type='submit'
              disabled={isInquiring}
              className='w-full mt-2 px-4 py-2.5 bg-[#6b7c65] hover:bg-[#5c6e58] text-white text-sm font-medium rounded transition-colors cursor-pointer disabled:opacity-50'
            >
              {isInquiring ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </section>

      {/* Service Highlights */}
      <section className='relative mb-14 overflow-hidden rounded-md border border-[#eadfcd] bg-[#fbf7f0] px-4 py-6 shadow-sm md:px-6 md:py-7'>
        <div className='relative'>
          <h4 className='font-playfair text-xl font-semibold text-[#2a241e] md:text-2xl'>
            Service Highlights
          </h4>
          {serviceHighlights.length > 0 ? (
            <div className='mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {serviceHighlights.map((h, index) => (
                <div
                  key={index}
                  className='flex items-start gap-2 text-[#6b5e52]'
                >
                  <span className='mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#e0a15f] text-[#e0a15f]'>
                    <Check size={10} />
                  </span>
                  <span className='font-raleway text-sm leading-6'>{h}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-sm font-raleway text-[#857F7A] mt-2'>
              No highlights specified.
            </p>
          )}

          <div className='mt-6 grid gap-3 md:grid-cols-2'>
            <div className='rounded-md bg-white/85 px-4 py-3 ring-1 ring-[#eadfcd]'>
              <p className='text-[10px] uppercase tracking-widest text-[#a08a76] font-raleway font-semibold'>
                Experience
              </p>
              <p className='mt-0.5 font-playfair text-lg text-[#2a241e]'>
                {vendor.experienceYears || 'N/A'}
              </p>
            </div>
            <div className='rounded-md bg-white/85 px-4 py-3 ring-1 ring-[#eadfcd]'>
              <p className='text-[10px] uppercase tracking-widest text-[#a08a76] font-raleway font-semibold'>
                Specialty
              </p>
              <p className='mt-0.5 font-playfair text-lg text-[#2a241e] capitalize'>
                {vendor.speciality || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      {hasPortfolio && (
        <section className='mb-14'>
          <h4 className='font-playfair text-xl font-semibold text-[#2a241e] md:text-2xl pb-4'>
            Portfolio
          </h4>
          <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
            {portfolioItems.map((item, index) => (
              <button
                key={item.id}
                type='button'
                onClick={() => setActivePortfolioIndex(index)}
                className='group overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-[#eadfcd] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574]'
              >
                <img
                  src={`${API_CONFIG.BASE_URL}${item.mediaUrl}`}
                  alt='Portfolio media'
                  className='h-32 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] md:h-36'
                />
              </button>
            ))}
          </div>
        </section>
      )}

      {typeof activePortfolioIndex === 'number' && hasPortfolio && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4'
          onClick={closePortfolioModal}
          role='dialog'
          aria-modal='true'
          aria-label='Portfolio image preview'
        >
          <div
            className='relative w-full max-w-5xl'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type='button'
              onClick={closePortfolioModal}
              className='absolute -top-12 right-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2a241e] shadow-md hover:bg-[#f5f1eb]'
              aria-label='Close portfolio preview'
            >
              <X size={18} />
            </button>

            <img
              src={`${API_CONFIG.BASE_URL}${portfolioItems[activePortfolioIndex].mediaUrl}`}
              alt='Portfolio preview'
              className='max-h-[80vh] w-full rounded-md object-contain bg-[#1f1f1f]'
            />

            {portfolioItems.length > 1 && (
              <>
                <button
                  type='button'
                  onClick={showPrevPortfolio}
                  className='absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#2a241e] shadow-md hover:bg-white'
                  aria-label='Previous portfolio image'
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type='button'
                  onClick={showNextPortfolio}
                  className='absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#2a241e] shadow-md hover:bg-white'
                  aria-label='Next portfolio image'
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            <div className='mt-3 text-center font-raleway text-sm text-white/90'>
              {activePortfolioIndex + 1} / {portfolioItems.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDetails;
