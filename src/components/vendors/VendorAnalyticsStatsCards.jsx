import {
  BookCopy,
  CalendarDays,
  DollarSign,
  Mail,
} from 'lucide-react';

const formatCurrency = (value) => {
  const amount = Number(value) || 0;
  return `$${amount.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
};

const VendorAnalyticsStatsCards = ({ dashboardData }) => {
  const cards = [
    {
      key: 'new-leads',
      title: 'New Leads',
      value: String(dashboardData?.newLeedsEnquiry ?? 0),
      icon: Mail,
    },
    {
      key: 'total-revenue',
      title: 'Total Revenue',
      value: formatCurrency(dashboardData?.totalRevenue),
      icon: DollarSign,
    },
    {
      key: 'upcoming-wedding',
      title: 'Upcoming Wedding Program',
      value: String(dashboardData?.upcomingWeddingCard ?? 0),
      subLabel: 'Days Remaining',
      icon: CalendarDays,
    },
    {
      key: 'total-bookings',
      title: 'Total Booking',
      value: String(dashboardData?.totalBookings ?? 0),
      icon: BookCopy,
    },
  ];

  return (
    <section className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.key}
            className='relative overflow-hidden rounded-xl border border-[#ebe8e1] bg-white px-5 py-4 shadow-[0_6px_16px_rgba(0,0,0,0.02)]'
          >
            <div className='absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#f4f5f1]' />
            <div className='relative z-10'>
              <span className='mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#e4e9e3] text-[#4b554a]'>
                <Icon size={16} />
              </span>
              <p className='text-xs font-medium text-[#667067]'>{card.title}</p>
              <p className='mt-1 flex items-end gap-2 text-2xl font-semibold leading-none text-[#1f2320]'>
                {card.value}
                {card.subLabel ? (
                  <span className='text-xs font-medium text-[#8d948d]'>
                    {card.subLabel}
                  </span>
                ) : null}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default VendorAnalyticsStatsCards;
