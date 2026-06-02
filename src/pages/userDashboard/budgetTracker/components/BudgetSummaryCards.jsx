import React from 'react';
import { DollarSign } from 'lucide-react';
import { useGetCoupleDashboardQuery } from "../../../../store/features/couple/coupleDashboard";

const BudgetSummaryCards = () => {
  const {
    data: statusResponse,
    isLoading: isStatusLoading,
    isError: isStatusError,
    error: statusError,
  } = useGetCoupleDashboardQuery();

  const statusData = statusResponse?.data;
    console.log("================>",statusData);

  const formatCurrency = (value) => {
    if (value === undefined || value === null) return "$0";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const summaryCards = [
    { title: 'Total Budget', value: formatCurrency(statusData?.budget) },

  
    
    { title: 'Expend Budget', value: formatCurrency(statusData?.expendBudget) },
    { title: 'Remaining Budget', value: formatCurrency(statusData?.remainingBudget) },
  ];

  if (isStatusLoading) return <StatsSkeleton />;
  if (isStatusError) return <p className="mt-5 text-red-500">Error loading data!</p>;

  return (
    <div className='mt-5 grid grid-cols-1 gap-3 lg:grid-cols-3 font-raleway'>
      {summaryCards.map((card) => (
        <article
          key={card.title}
          className='relative min-h-29 overflow-hidden rounded-2xl border border-[#00000029] bg-white px-4 py-3'
        >
          <div className='relative z-1 inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#E4E9E3] text-[#464E46]'>
            <DollarSign size={18} strokeWidth={2} />
          </div>
          <p className='relative z-1 mb-0 mt-2.5 text-base font-medium text-[#505050]'>{card.title}</p>
          <h2 className='relative z-1 m-0 text-[1.7rem] tracking-[0.01em] font-playfair text-[#171717] md:text-[2rem]'>
            {card.value}
          </h2>
          <span
            className='absolute -right-8 -top-8 h-23 w-23 rounded-full bg-[#ebebeb]'
            aria-hidden='true'
          />
        </article>
      ))}
    </div>
  );
};

export default BudgetSummaryCards;

const StatsSkeleton = () => (
  <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-3 animate-pulse">
    {[1, 2, 3].map((n) => (
      <div key={n} className="h-29 rounded-2xl border border-[#00000029] bg-gray-50/50 p-4">
        <div className="h-7 w-7 rounded-md bg-gray-200 mb-3"></div>
        <div className="h-4 w-24 rounded bg-gray-200 mb-2"></div>
        <div className="h-8 w-32 rounded bg-gray-300"></div>
      </div>
    ))}
  </div>
);