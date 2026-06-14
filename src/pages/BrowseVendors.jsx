import { memo, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import VendorCard from '../components/vendors/VendorCard';
import { 
  useGetCategoriesQuery, 
  useGetStatesQuery, 
} from '../../src/store/features/couple/coupleDashboard';
import { useGetVendorProfilesQuery } from '../../src/store/features/public/publicApi';

const BUDGETS = [
  { label: 'All Budgets', min: '', max: '' },
  { label: 'Under $1,000', min: 0, max: 999 },
  { label: '$1,000 – $3,000', min: 1000, max: 3000 },
  { label: '$3,000 – $6,000', min: 3001, max: 6000 },
  { label: '$6,000+', min: 6001, max: 999999 }, 
];

const VENDORS_PER_PAGE = 9;

const BrowseVendorsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
    {[...Array(VENDORS_PER_PAGE)].map((_, index) => (
      <div key={index} className="overflow-hidden rounded-xl border border-[#dfddd8] bg-white shadow-sm">
        <div className="h-48 bg-[#ece9e2]" />
        
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-4 w-1/3 rounded bg-[#ece9e2]" />
            <div className="h-4 w-10 rounded bg-[#ece9e2]" />
          </div>
          <div className="h-5 w-3/4 rounded bg-[#ece9e2]" />
          <div className="h-4 w-1/2 rounded bg-[#ece9e2]" />
          <hr className="border-gray-100 pt-1" />
          <div className="h-4 w-2/3 rounded bg-[#ece9e2]" />
        </div>
      </div>
    ))}
  </div>
);

const BrowseVendors = memo(() => {
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: statesData } = useGetStatesQuery();

  // ── States & Filter Management ──
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedBudget, setSelectedBudget] = useState('All Budgets');
  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedCityName, setSelectedCityName] = useState('');
  const [availability, setAvailability] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const categories = useMemo(() => {
    return Array.isArray(categoriesData) ? categoriesData : categoriesData?.data || [];
  }, [categoriesData]);

  const statesList = useMemo(() => statesData?.data || [], [statesData]);

  const selectedStateObj = useMemo(() => statesList.find(s => s.id === selectedStateId), [selectedStateId, statesList]);
  const selectedStateName = selectedStateObj ? selectedStateObj.name : '';
  const availableCities = selectedStateObj ? selectedStateObj.cities : [];

  const currentBudgetObj = useMemo(() => BUDGETS.find((b) => b.label === selectedBudget) || BUDGETS[0], [selectedBudget]);

  const selectedCategoryName = useMemo(() => {
    if (selectedCategory === 'All Categories') return 'All Categories';
    const found = categories.find(c => c.slug === selectedCategory);
    return found ? found.name : 'All Categories';
  }, [selectedCategory, categories]);

  const queryParams = useMemo(() => {
    const params = {
      page: currentPage,
      limit: VENDORS_PER_PAGE,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };

    if (selectedCategory !== 'All Categories') {
      params.category = selectedCategory; 
    }
    if (currentBudgetObj.min !== '') {
      params.minPrice = currentBudgetObj.min;
    }
    if (currentBudgetObj.max !== '') {
      params.maxPrice = currentBudgetObj.max;
    }
    if (selectedStateId !== '') {
      params.state = selectedStateName.toLowerCase(); 
    }
    if (selectedCityName !== '') {
      params.city = selectedCityName.toLowerCase(); 
    }
    
    if (availability !== '') {
      const dateObj = new Date(availability);
      if (!isNaN(dateObj.getTime())) {
        params.availableDate = dateObj.toISOString();
      }
    }

    return params;
  }, [currentPage, selectedCategory, currentBudgetObj, selectedStateId, selectedStateName, selectedCityName, availability]);

  // ── Fetch Server Data ──
  const { data: vendorsApiResponse, isLoading } = useGetVendorProfilesQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });

  const paginatedVendors = vendorsApiResponse?.data || [];
  const metaData = vendorsApiResponse?.meta || {};
  const totalPages = metaData.totalPages || 1;

  useSEO({
    title: 'Browse Vendors',
    description: 'Browse curated wedding vendors across every category.',
    keywords: ['browse vendors', 'wedding vendors', 'marketplace'],
  });

  const handleCategoryChange = (slug) => { setSelectedCategory(slug); setCurrentPage(1); };
  const handleBudgetChange = (label) => { setSelectedBudget(label); setCurrentPage(1); };
  
  const handleStateChange = (e) => {
    setSelectedStateId(e.target.value);
    setSelectedCityName('');
    setCurrentPage(1);
  };

  const handleCityChange = (e) => {
    setSelectedCityName(e.target.value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All Categories');
    setSelectedBudget('All Budgets');
    setSelectedStateId('');
    setSelectedCityName('');
    setAvailability('');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedCategory !== 'All Categories' ||
    selectedBudget !== 'All Budgets' ||
    selectedStateId !== '' ||
    selectedCityName !== '' ||
    availability !== '';

  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, '...', totalPages];
    if (currentPage >= totalPages - 2)
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

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

      {/* Category Section */}
      <div className="mb-5">
        <p className="mb-2 text-base text-[#9a8a7a] font-raleway">Category</p>
        <div className="max-h-52 overflow-y-auto pr-1 scrollbar-thin">
          <label className="flex items-center gap-2.5 mb-1.5 cursor-pointer">
            <input
              type="radio"
              name="category_filter"
              value="All Categories"
              checked={selectedCategory === 'All Categories'}
              onChange={() => handleCategoryChange('All Categories')}
              className="accent-[#7a6050] w-4 h-4 shrink-0"
            />
            <span className={`text-sm font-raleway transition-colors ${
              selectedCategory === 'All Categories' ? 'text-[#3a2a1a] font-semibold' : 'text-[#5a4a3a]'
            }`}>
              All Categories
            </span>
          </label>

          {categories.map((cat) => (
            <label key={cat.id || cat.slug} className="flex items-center gap-2.5 mb-1.5 cursor-pointer">
              <input
                type="radio"
                name="category_filter"
                value={cat.slug}
                checked={selectedCategory === cat.slug}
                onChange={() => handleCategoryChange(cat.slug)}
                className="accent-[#7a6050] w-4 h-4 shrink-0"
              />
              <span className={`text-sm font-raleway transition-colors ${
                selectedCategory === cat.slug ? 'text-[#3a2a1a] font-semibold' : 'text-[#5a4a3a]'
              }`}>
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Budget Section */}
      <div className="mb-5 border-t border-[#e8e0d8] pt-4">
        <p className="mb-2 text-base text-[#9a8a7a] font-raleway">Budget</p>
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

      {/* State Dropdown */}
      <div className="mb-5 border-t border-[#e8e0d8] pt-4">
        <p className="mb-2 text-base text-[#9a8a7a] font-raleway">State</p>
        <select
          value={selectedStateId}
          onChange={handleStateChange}
          className="w-full text-sm px-3 py-2.5 rounded-md border border-[#d4c8bc] bg-white text-[#5a4a3a] outline-none focus:border-[#7a6050] transition-colors box-border"
        >
          <option value="">Select State</option>
          {statesList.map((state) => (
            <option key={state.id} value={state.id}>{state.name}</option>
          ))}
        </select>
      </div>

      {/* City Dropdown */}
      <div className="mb-5 border-t border-[#e8e0d8] pt-4">
        <p className="mb-2 text-base text-[#9a8a7a] font-raleway">City</p>
        <select
          value={selectedCityName}
          onChange={handleCityChange}
          disabled={!selectedStateId}
          className="w-full text-sm px-3 py-2.5 rounded-md border border-[#d4c8bc] bg-white text-[#5a4a3a] outline-none focus:border-[#7a6050] transition-colors box-border disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">Select City</option>
          {availableCities.map((city) => (
            <option key={city.id} value={city.name}>{city.name}</option>
          ))}
        </select>
      </div>

      {/* Availability Section */}
      <div className="mb-2 border-t border-[#e8e0d8] pt-4">
        <p className="mb-2 text-base text-[#9a8a7a] font-raleway">Availability</p>
        <input
          type="date"
          value={availability}
          onChange={(e) => { setAvailability(e.target.value); setCurrentPage(1); }}
          className="w-full text-sm px-3 py-2.5 rounded-md border border-[#d4c8bc] bg-white text-[#5a4a3a] outline-none focus:border-[#7a6050] transition-colors box-border"
        />
      </div>
    </div>
  );

  return (
    <div className=" max-w-[1400px] mx-auto min-h-screen flex items-start md:gap-10 relative font-serif">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed inset-y-0 top-20 left-0 w-72.5 z-50 bg-[#f0e9e1] shadow-xl border-r border-[#e8e0d8] transform transition-transform duration-300 ease-in-out md:hidden overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="sticky top-0 bg-[#f0e9e1] z-10 flex items-center justify-between px-5 py-4 border-b border-[#e8e0d8]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={17} className="text-[#7a6050]" />
            <h2 className="text-base font-semibold text-[#3a3a3a]">Filters</h2>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-md hover:bg-[#e8e0d8] transition-colors text-[#7a6a5a]">
            <X size={19} />
          </button>
        </div>
        <div className="px-5 pt-5 pb-16">
          <SidebarContent />
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 sticky z-10 top-22 mt-8 mb-8 self-start px-5 py-5 bg-[#f0e9e1] shadow-sm border border-[#e8e0d8] rounded-sm max-h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="flex items-center gap-2 mb-5">
          <SlidersHorizontal size={17} className="text-[#7a6050]" />
          <h2 className="text-base font-semibold text-[#3a3a3a]">Filters</h2>
        </div>
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 px-4 md:px-6 py-14 md:py-20 min-w-0 z-10">
        <div className="text-center mb-6">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#201c18] sm:text-5xl">Browse Vendors</h1>
          <p className="mt-2 md:mt-4 text-base md:text-lg leading-6 text-[#606060] font-raleway">
            Discover premium wedding professionals perfect for your special day
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-[#857F7A] font-raleway">
            {metaData.totalItems || 0} vendor{(metaData.totalItems !== 1) ? 's' : ''} found
          </p>
          <button onClick={() => setSidebarOpen(true)} className="flex items-center gap-2 bg-[#3a3028] text-white rounded-lg px-4 py-2 text-sm font-raleway md:hidden">
            <SlidersHorizontal size={14} />
            Filters {hasActiveFilters && <span className="bg-white text-[#3a3028] rounded-full w-4 h-4 text-[10px] font-bold flex items-center justify-center">!</span>}
          </button>
        </div>

        {/* Active Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-4 z-100">
            {selectedCategory !== 'All Categories' && (
              <span className="inline-flex items-center gap-1 bg-[#e8dfd6] text-[#5a4030] text-xs font-raleway px-3 py-1 rounded-full lowercase">
                {selectedCategoryName}
                <button onClick={() => { setSelectedCategory('All Categories'); setCurrentPage(1); }}><X size={11} /></button>
              </span>
            )}
            {selectedBudget !== 'All Budgets' && (
              <span className="inline-flex items-center gap-1 bg-[#e8dfd6] text-[#5a4030] text-xs font-raleway px-3 py-1 rounded-full">
                {selectedBudget}
                <button onClick={() => { setSelectedBudget('All Budgets'); setCurrentPage(1); }}><X size={11} /></button>
              </span>
            )}
            {selectedStateId !== '' && (
              <span className="inline-flex items-center gap-1 bg-[#e8dfd6] text-[#5a4030] text-xs font-raleway px-3 py-1 rounded-full">
                 {selectedStateName}
                <button onClick={() => { setSelectedStateId(''); setSelectedCityName(''); setCurrentPage(1); }}><X size={11} /></button>
              </span>
            )}
            {selectedCityName !== '' && (
              <span className="inline-flex items-center gap-1 bg-[#e8dfd6] text-[#5a4030] text-xs font-raleway px-3 py-1 rounded-full">
                 {selectedCityName}
                <button onClick={() => { setSelectedCityName(''); setCurrentPage(1); }}><X size={11} /></button>
              </span>
            )}
            {availability !== '' && (
              <span className="inline-flex items-center gap-1 bg-[#e8dfd6] text-[#5a4030] text-xs font-raleway px-3 py-1 rounded-full">
                 {availability}
                <button onClick={() => { setAvailability(''); setCurrentPage(1); }}><X size={11} /></button>
              </span>
            )}
          </div>
        )}

        {isLoading ? (
          <BrowseVendorsSkeleton />
        ) : paginatedVendors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {paginatedVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} onClick={() => navigate(`/vendors/${vendor.id}`)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-serif text-[#3a3028] mb-2">No vendors found</p>
            <p className="text-sm font-raleway text-[#888] mb-4">Try adjusting your filters to see more results.</p>
            <button onClick={handleResetFilters} className="text-sm font-raleway text-white bg-[#3a3028] px-5 py-2 rounded-lg hover:bg-[#4a3a30] transition-colors">
              Reset Filters
            </button>
          </div>
        )}

        
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-10 flex-wrap">
            <button 
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} 
              disabled={currentPage <= 1} 
              className="px-3 py-1.5 rounded-md border border-[#d4c8bc] bg-white text-[#7a6a5a] text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f0e9e1] transition-colors"
            >
              Previous
            </button>
            {getPageNumbers().map((p, i) => p === '...' ? (
              <span key={`dots-${i}`} className="w-8 text-center text-[#aaa] text-xs">…</span>
            ) : (
              <button 
                key={p} 
                onClick={() => setCurrentPage(Number(p))} 
                className={`w-8 h-8 rounded-md text-xs font-semibold border transition-colors ${currentPage === p ? 'bg-[#3a3028] border-[#3a3028] text-white' : 'bg-white border-[#d4c8bc] text-[#7a6a5a] hover:bg-[#f0e9e1]'}`}
              >
                {p}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} 
              disabled={currentPage >= totalPages} 
              className="px-3 py-1.5 rounded-md border border-[#d4c8bc] bg-white text-[#7a6a5a] text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f0e9e1] transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
});

BrowseVendors.displayName = 'BrowseVendors';
export default BrowseVendors;