import { Plus } from "lucide-react";

const BookingTabsActions = ({ tabs, activeTab, onTabChange, onCreate }) => (
  <section className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div className="-mx-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:overflow-visible lg:pb-0">
      <div className="flex min-w-max items-end gap-4 border-b border-[#8a9084] px-1 pb-3 sm:gap-6 lg:gap-10 lg:px-0 lg:pb-4">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className="relative shrink-0 pb-1 text-left"
          >
            <span
              className={`text-base sm:text-lg ${isActive ? "font-semibold text-[#6f7969]" : "text-[#565656]"}`}
            >
              {tab.label}
            </span>
            <span
              className={`ml-2 rounded-full px-2 py-0.5 text-xs sm:px-2.5 sm:text-sm ${isActive ? "bg-[#aab9a2] text-white" : "bg-[#d7e0d1] text-[#6d7a67]"}`}
            >
              {tab.count}
            </span>
            <span
              className={`absolute -bottom-3 left-0 h-1 w-full rounded-full sm:-bottom-3.5 lg:-bottom-4.25 ${isActive ? "bg-[#6f7969]" : "bg-transparent"}`}
            />
          </button>
        );
      })}
      </div>
    </div>

    <button
      type="button"
      className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#6f7969] px-6 py-3 text-sm text-white shadow-[0_12px_26px_rgba(95,105,89,0.22)] transition hover:bg-[#5f6959] sm:w-auto sm:px-8 sm:py-4"
      onClick={onCreate}
    >
      <Plus size={18} />
      New Booking
    </button>
  </section>
);

export default BookingTabsActions;
