import { memo, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import ALL_VENDORS from '../data/vendors';
import VendorCard from '../components/vendors/VendorCard';

const CATEGORIES = [
  'All Categories',
  'Photography',
  'Videography',
  'Floral Design',
  'Catering',
  'Venue',
  'DJ & Music',
  'Planning',
  'Hair & Makeup',
  'Bridal Boutique',
  'Cakes & Desserts',
];

const BUDGETS = [
  { label: 'All Budgets', min: 0, max: Infinity },
  { label: 'Under $1,000', min: 0, max: 999 },
  { label: '$1,000 – $3,000', min: 1000, max: 3000 },
  { label: '$3,000 – $6,000', min: 3001, max: 6000 },
  { label: '$6,000+', min: 6001, max: Infinity },
];

const VENDORS_PER_PAGE = 12;

const BrowseVendors = memo(() => {
  useSEO({
    title: 'Browse Vendors',
    description: 'Browse curated wedding vendors across every category.',
    keywords: ['browse vendors', 'wedding vendors', 'marketplace'],
  });

  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedBudget, setSelectedBudget] = useState('All Budgets');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // ── Filter Logic ──
  const filteredVendors = useMemo(() => {
    const budget = BUDGETS.find((b) => b.label === selectedBudget) || BUDGETS[0];
    return ALL_VENDORS.filter((v) => {
      const categoryMatch =
        selectedCategory === 'All Categories' || v.category === selectedCategory;
      const budgetMatch = v.price >= budget.min && v.price <= budget.max;
      const locationMatch =
        location.trim() === '' ||
        v.location.toLowerCase().includes(location.trim().toLowerCase());
      return categoryMatch && budgetMatch && locationMatch;
    });
  }, [selectedCategory, selectedBudget, location]);

  // ── Pagination Logic ──
  const totalPages = Math.max(1, Math.ceil(filteredVendors.length / VENDORS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedVendors = filteredVendors.slice(
    (safePage - 1) * VENDORS_PER_PAGE,
    safePage * VENDORS_PER_PAGE
  );

  const handleCategoryChange = (cat) => { setSelectedCategory(cat); setCurrentPage(1); };
  const handleBudgetChange = (label) => { setSelectedBudget(label); setCurrentPage(1); };
  const handleLocationChange = (e) => { setLocation(e.target.value); setCurrentPage(1); };
  const handleResetFilters = () => {
    setSelectedCategory('All Categories');
    setSelectedBudget('All Budgets');
    setLocation('');
    setAvailability('');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedCategory !== 'All Categories' ||
    selectedBudget !== 'All Budgets' ||
    location.trim() !== '';

  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (safePage <= 3) return [1, 2, 3, 4, '...', totalPages];
    if (safePage >= totalPages - 2)
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', safePage - 1, safePage, safePage + 1, '...', totalPages];
  };

  // ── Shared Sidebar Content ──
  const SidebarContent = () => (
    <div className="flex flex-col gap-0">
      {hasActiveFilters && (
        <button
          onClick={handleResetFilters}
          className="w-full mb-4 text-xs font-raleway text-[#7a6050] border border-[#d4c8bc] rounded-md py-1.5 hover:bg-[#e8e0d8] transition-colors"
        >
          Reset Filters
        </button>
      )}

      {/* Category */}
      <div className="mb-5">
        <p className="mb-2 text-base  text-[#9a8a7a] font-raleway ">
          Category
        </p>
        {CATEGORIES.map((cat) => (
          <label key={cat} className="flex items-center gap-2.5 mb-1.5 cursor-pointer">
            <input
              type="radio"
              name="category_filter"
              value={cat}
              checked={selectedCategory === cat}
              onChange={() => handleCategoryChange(cat)}
              className="accent-[#7a6050] w-4 h-4 shrink-0"
            />
            <span className={`text-sm font-raleway transition-colors ${
              selectedCategory === cat ? 'text-[#3a2a1a] font-semibold' : 'text-[#5a4a3a]'
            }`}>
              {cat}
            </span>
          </label>
        ))}
      </div>

      {/* Budget */}
      <div className="mb-5 border-t border-[#e8e0d8] pt-4">
        <p className="mb-2 text-base text-[#9a8a7a] font-raleway ">
          Budget
        </p>
        {BUDGETS.map((b) => (
          <label key={b.label} className="flex items-center gap-2.5 mb-1.5 cursor-pointer">
            <input
              type="radio"
              name="budget_filter"
              value={b.label}
              checked={selectedBudget === b.label}
              onChange={() => handleBudgetChange(b.label)}
              className="accent-[#7a6050] w-4 h-4 shrink-0"
            />
            <span className={`text-sm font-raleway transition-colors ${
              selectedBudget === b.label ? 'text-[#3a2a1a] font-semibold' : 'text-[#5a4a3a]'
            }`}>
              {b.label}
            </span>
          </label>
        ))}
      </div>

      {/* Location */}
      <div className="mb-5 border-t border-[#e8e0d8] pt-4">
        <p className="mb-2 text-base text-[#9a8a7a] font-raleway ">
          Location
        </p>
        <input
          type="text"
          placeholder="City or state..."
          value={location}
          onChange={handleLocationChange}
          className="w-full text-sm px-3 py-2.5 rounded-md border border-[#d4c8bc] bg-white text-[#5a4a3a] outline-none focus:border-[#7a6050] transition-colors box-border"
        />
      </div>

      {/* Availability */}
      <div className="mb-2 border-t border-[#e8e0d8] pt-4">
        <p className="mb-2 text-base text-[#9a8a7a] font-raleway ">
          Availability
        </p>
        <input
          type="date"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="w-full text-sm px-3 py-2.5 rounded-md border border-[#d4c8bc] bg-white text-[#5a4a3a] outline-none focus:border-[#7a6050] transition-colors box-border"
        />
      </div>
    </div>
  );

  return (
    // ── 1. Outer wrapper: items-start so sidebar doesn't stretch full height ──
    <div className="container mx-auto min-h-screen flex items-start relative font-serif">

      {/* ── Mobile Overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 top-20 left-0 w-72.5 z-50
          bg-[#f0e9e1] shadow-xl border-r border-[#e8e0d8]
          transform transition-transform duration-300 ease-in-out
          md:hidden
          overflow-y-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* sticky header inside mobile sidebar */}
        <div className="sticky top-0 bg-[#f0e9e1] z-10 flex items-center justify-between px-5 py-4 border-b border-[#e8e0d8]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={17} className="text-[#7a6050]" />
            <h2 className="text-base font-semibold text-[#3a3a3a]">Filters</h2>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-md hover:bg-[#e8e0d8] transition-colors text-[#7a6a5a]"
            aria-label="Close filters"
          >
            <X size={19} />
          </button>
        </div>

        {/* scrollable content area with bottom padding */}
        <div className="px-5 pt-5 pb-16">
          <SidebarContent />
        </div>
      </aside>

    
      <aside className="hidden md:flex flex-col w-64 shrink-0 sticky  z-10 top-8 mt-8 mb-8 self-start px-5 py-5 bg-[#f0e9e1] shadow-sm border border-[#e8e0d8] rounded-sm max-h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="flex items-center gap-2 mb-5">
          <SlidersHorizontal size={17} className="text-[#7a6050]" />
          <h2 className="text-base font-semibold text-[#3a3a3a]">Filters</h2>
        </div>
        <SidebarContent />
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 px-5 md:px-7 pt-8 pb-16 min-w-0 z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="font-serif text-4xl text-[#201c18] sm:text-5xl">Browse Vendors</h1>
          <p className="mt-2 md:mt-4 text-base md:text-lg leading-6 text-[#606060] font-raleway">
            Discover premium wedding professionals perfect for your special day
          </p>
        </div>

        {/* Top bar: vendor count + mobile filter button */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-[#857F7A] font-raleway">
            {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''} found
          </p>
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 bg-[#3a3028] text-white rounded-lg px-4 py-2 text-sm font-raleway md:hidden"
          >
            <SlidersHorizontal size={14} />
            Filters
            {hasActiveFilters && (
              <span className="bg-white text-[#3a3028] rounded-full w-4 h-4 text-[10px] font-bold flex items-center justify-center">
                !
              </span>
            )}
          </button>
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-4 z-100">
            {selectedCategory !== 'All Categories' && (
              <span className="inline-flex items-center gap-1 bg-[#e8dfd6] text-[#5a4030] text-xs font-raleway px-3 py-1 rounded-full">
                {selectedCategory}
                <button onClick={() => { setSelectedCategory('All Categories'); setCurrentPage(1); }}>
                  <X size={11} />
                </button>
              </span>
            )}
            {selectedBudget !== 'All Budgets' && (
              <span className="inline-flex items-center gap-1 bg-[#e8dfd6] text-[#5a4030] text-xs font-raleway px-3 py-1 rounded-full">
                {selectedBudget}
                <button onClick={() => { setSelectedBudget('All Budgets'); setCurrentPage(1); }}>
                  <X size={11} />
                </button>
              </span>
            )}
            {location.trim() !== '' && (
              <span className="inline-flex items-center gap-1 bg-[#e8dfd6] text-[#5a4030] text-xs font-raleway px-3 py-1 rounded-full">
                 {location}
                <button onClick={() => { setLocation(''); setCurrentPage(1); }}>
                  <X size={11} />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Vendor Grid */}
        {paginatedVendors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedVendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                onClick={() => navigate(`/vendors/${vendor.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            {/* <p className="text-4xl mb-4">🔍</p> */}
            <p className="text-lg font-serif text-[#3a3028] mb-2">No vendors found</p>
            <p className="text-sm font-raleway text-[#888] mb-4">
              Try adjusting your filters to see more results.
            </p>
            <button
              onClick={handleResetFilters}
              className="text-sm font-raleway text-white bg-[#3a3028] px-5 py-2 rounded-lg hover:bg-[#4a3a30] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-10 flex-wrap">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="px-3 py-1.5 rounded-md border border-[#d4c8bc] bg-white text-[#7a6a5a] text-xs font-raleway disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f0e9e1] transition-colors"
            >
              ← Previous
            </button>
            {getPageNumbers().map((p, i) =>
              p === '...' ? (
                <span key={`dots-${i}`} className="w-8 text-center text-[#aaa] text-xs">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 rounded-md text-xs font-semibold border transition-colors ${
                    safePage === p
                      ? 'bg-[#3a3028] border-[#3a3028] text-white'
                      : 'bg-white border-[#d4c8bc] text-[#7a6a5a] hover:bg-[#f0e9e1]'
                  }`}
                >
                  {p}
                </button>
              )
            )}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="px-3 py-1.5 rounded-md border border-[#d4c8bc] bg-white text-[#7a6a5a] text-xs font-raleway disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f0e9e1] transition-colors"
            >
              Next →
            </button>
          </div>
        )}

        {totalPages > 1 && (
          <p className="text-center text-xs text-[#aaa] font-raleway mt-3">
            Page {safePage} of {totalPages} — showing {paginatedVendors.length} of {filteredVendors.length} vendors
          </p>
        )}
      </main>
    </div>
  );
});

BrowseVendors.displayName = 'BrowseVendors';

export default BrowseVendors;