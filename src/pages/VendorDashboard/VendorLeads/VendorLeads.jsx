import { useEffect, useMemo, useState } from 'react';
import LeadsDetailsModal from './components/LeadsDetailsModal';
import LeadsMobileList from './components/LeadsMobileList';
import LeadsTable from './components/LeadsTable';
import VendorLeadsPagination from './components/VendorLeadsPagination';
import VendorLeadsHeader from './components/VendorLeadsHeader';

const initialLeads = [
  {
    id: 1,
    name: 'Eleanor Pena',
    email: 'aliza@gmail.com',
    phone: '+880 1712-345678',
    status: 'New',
    message: 'I want to book a reservation for my upcoming marriage. Can you tell me about the details of the packages.',
  },
  {
    id: 2,
    name: 'Esther Howard',
    email: 'liyana@gmail.com',
    phone: '+880 1934-567890',
    status: 'Pending',
    message: 'Looking for a flexible wedding package with vendor support.',
  },
  {
    id: 3,
    name: 'Annette Black',
    email: 'liyana@gmail.com',
    phone: '+880 1934-567890',
    status: 'Contracted',
    message: 'Need confirmation for venue, catering, and decoration services.',
  },
  {
    id: 4,
    name: 'Jenny Wilson',
    email: 'liyana@gmail.com',
    phone: '+880 1934-567890',
    status: 'Contracted',
    message: 'Please share your available dates for the next season.',
  },
  {
    id: 5,
    name: 'Darlene Robertson',
    email: 'liyana@gmail.com',
    phone: '+880 1934-567890',
    status: 'Pending',
    message: 'Interested in premium wedding planning with photography add-ons.',
  },
  {
    id: 6,
    name: 'Guy Hawkins',
    email: 'liyana@gmail.com',
    phone: '+880 1934-567890',
    status: 'Contracted',
    message: 'Confirming the contracted package details and timeline.',
  },
  {
    id: 7,
    name: 'Jerome Bell',
    email: 'liyana@gmail.com',
    phone: '+880 1934-567890',
    status: 'New',
    message: 'Need a starter package for a small wedding ceremony.',
  },
  {
    id: 8,
    name: 'Kristin Watson',
    email: 'liyana@gmail.com',
    phone: '+880 1934-567890',
    status: 'Pending',
    message: 'Would love to know package pricing and inclusion list.',
  },
  {
    id: 9,
    name: 'Kristin Watson',
    email: 'liyana@gmail.com',
    phone: '+880 1934-567890',
    status: 'Contracted',
    message: 'Following up on the final contracted service details.',
  },
];

export default function VendorLeads() {
  const perPage = 5;
  const [leads, setLeads] = useState(initialLeads);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [page, setPage] = useState(1);

  const pagedLeads = useMemo(() => {
    const start = (page - 1) * perPage;
    return leads.slice(start, start + perPage);
  }, [leads, page, perPage]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(leads.length / perPage));
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [leads.length, page, perPage]);

  const closeMenu = () => setOpenMenuId(null);

  const handleMenuToggle = (event, id) => {
    event.stopPropagation();
    setOpenMenuId((current) => (current === id ? null : id));
  };

  const handleSeeDetails = (lead) => {
    setSelectedLead(lead);
    setOpenMenuId(null);
  };

  const handleDelete = (id) => {
    setLeads((current) => current.filter((lead) => lead.id !== id));
    setOpenMenuId(null);
  };

  const handleStatusChange = (id, status) => {
    setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, status } : lead)));
    setOpenMenuId(null);
  };

  return (
    <main className='font-raleway' onClick={closeMenu}>
      <VendorLeadsHeader />

      <section className='rounded-xl border border-gray-100 bg-white'>
        <LeadsMobileList
          leads={pagedLeads}
          openMenuId={openMenuId}
          onMenuToggle={handleMenuToggle}
          onSeeDetails={handleSeeDetails}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />

        <LeadsTable
          leads={pagedLeads}
          openMenuId={openMenuId}
          onMenuToggle={handleMenuToggle}
          onSeeDetails={handleSeeDetails}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />

        <VendorLeadsPagination
          page={page}
          setPage={setPage}
          perPage={perPage}
          totalResults={leads.length}
        />
      </section>

      {selectedLead ? <LeadsDetailsModal lead={selectedLead} onClose={() => setSelectedLead(null)} /> : null}
    </main>
  );
}