import { useState } from 'react';
import LeadsDetailsModal from './components/LeadsDetailsModal';
import LeadsMobileList from './components/LeadsMobileList';
import LeadsTable from './components/LeadsTable';
import VendorLeadsPagination from './components/VendorLeadsPagination';
import VendorLeadsHeader from './components/VendorLeadsHeader';
import { useGetEnquiriesQuery,useUpdateEnquiryStatusMutation, 
  useDeleteEnquiryMutation  } from '../../../store/features/vendor/vendorDashboardApi'; 

export default function VendorLeads() {
  const perPage = 10;
  const [page, setPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  const { data: response, isLoading, error } = useGetEnquiriesQuery(page);
  const [updateStatus] = useUpdateEnquiryStatusMutation();
  const [deleteEnquiry] = useDeleteEnquiryMutation();

  const enquiries = response?.data || [];
  const meta = response?.meta || { totalItems: 0 };

  const closeMenu = () => setOpenMenuId(null);

  const handleMenuToggle = (event, id) => {
    event.stopPropagation();
    setOpenMenuId((current) => (current === id ? null : id));
  };

  const handleSeeDetails = (lead) => {
    setSelectedLeadId(lead.id);
    setOpenMenuId(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEnquiry(id).unwrap();
      setOpenMenuId(null);
    } catch (err) {
      console.error("Failed to delete the lead: ", err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      setOpenMenuId(null);
    } catch (err) {
      console.error("Failed to update status: ", err);
    }
  };

  if (isLoading) {
    return <div className="flex py-20 justify-center font-raleway text-gray-500">Loading leads...</div>;
  }

  if (error) {
    return <div className="flex py-20 justify-center font-raleway text-red-500">Failed to load leads data.</div>;
  }

  return (
    <main className='font-raleway' onClick={closeMenu}>
      <VendorLeadsHeader />

      <section className='rounded-xl border border-gray-100 bg-white'>
        <LeadsMobileList
          leads={enquiries}
          openMenuId={openMenuId}
          onMenuToggle={handleMenuToggle}
          onSeeDetails={handleSeeDetails}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />

        <LeadsTable
          leads={enquiries}
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
          totalResults={meta.totalItems}
        />
      </section>

      {selectedLeadId ? (
        <LeadsDetailsModal leadId={selectedLeadId} onClose={() => setSelectedLeadId(null)} />
      ) : null}
    </main>
  );
}