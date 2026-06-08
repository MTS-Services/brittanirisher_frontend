import React, { useMemo, useState } from "react";
import { CalendarRange, MessageSquareText, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import BookingsGrid from "./components/BookingsGrid";
import BookingsHeader from "./components/BookingsHeader";
import BookingsPagination from "./components/BookingsPagination";
import BookingSummaryCards from "./components/BookingSummaryCards";
import BookingTabsActions from "./components/BookingTabsActions";
import NewBookingModal from "./components/NewBookingModal";
import ViewDetailsModal from "./components/ViewDetailsModal";
import { BookingsSkeleton } from "../../../components/skeletons/LoadingSkeletons";
import {
  useCreateBookingMutation,
  useDeleteBookingMutation,
  useGetBookingsQuery,
  useGetVendorPackagesQuery,
  useGetVendorStatusQuery,
  useLazyGetBookingByIdQuery,
} from "../../../store/features/vendor/vendorDashboardApi";

const TAB_KEYS = {
  ALL: "all",
  BOOKED: "booked",
  COMPLETED: "completed",
};

const emptyForm = {
  coupleName: "",
  email: "",
  phone: "",
  venueName: "",
  location: "",
  weddingDate: "",
  packageId: "",
  price: "",
};

const getInitials = (value) =>
  value
    .split(" ")
    .map((part) => part.trim().charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

const VendorBookings = () => {
  const [activeTab, setActiveTab] = useState(TAB_KEYS.ALL);
  const [page, setPage] = useState(1);
  const [newBookingForm, setNewBookingForm] = useState(emptyForm);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const pageSize = 10;

  const statusParam =
    activeTab === TAB_KEYS.ALL ? undefined : activeTab.toUpperCase();

  const { data: bookingResponse, isLoading: isBookingsLoading } =
    useGetBookingsQuery({
      page,
      limit: pageSize,
      status: statusParam,
    });

  const { data: allCountResponse } = useGetBookingsQuery({
    page: 1,
    limit: 1,
  });
  const { data: bookedCountResponse } = useGetBookingsQuery({
    page: 1,
    limit: 1,
    status: "BOOKED",
  });
  const { data: completedCountResponse } = useGetBookingsQuery({
    page: 1,
    limit: 1,
    status: "COMPLETED",
  });
  const { data: vendorProfileResponse } = useGetVendorStatusQuery();
  const { data: vendorPackagesResponse } = useGetVendorPackagesQuery();

  const [getBookingById, { isLoading: isDetailsLoading }] =
    useLazyGetBookingByIdQuery();
  const [createBooking, { isLoading: isCreatingBooking }] = useCreateBookingMutation();
  const [deleteBooking, { isLoading: isDeletingBooking }] = useDeleteBookingMutation();

  const tabs = useMemo(
    () => [
      {
        key: TAB_KEYS.ALL,
        label: "All",
        count: allCountResponse?.meta?.totalItems || 0,
      },
      {
        key: TAB_KEYS.BOOKED,
        label: "Booked",
        count: bookedCountResponse?.meta?.totalItems || 0,
      },
      {
        key: TAB_KEYS.COMPLETED,
        label: "Completed",
        count: completedCountResponse?.meta?.totalItems || 0,
      },
    ],
    [
      allCountResponse?.meta?.totalItems,
      bookedCountResponse?.meta?.totalItems,
      completedCountResponse?.meta?.totalItems,
    ],
  );

  const bookingsData = bookingResponse?.data || [];
  const paginationMeta = bookingResponse?.meta;
  const packageOptions = Array.isArray(vendorPackagesResponse?.data)
    ? vendorPackagesResponse.data.map((pkg) => ({
        id: pkg.id,
        packageName: pkg.packageName,
      }))
    : [];

  const summaryCards = useMemo(
    () => [
      {
        label: "TOTAL BOOKINGS",
        value: String(allCountResponse?.meta?.totalItems || 0),
        icon: MessageSquareText,
      },
      {
        label: "BOOKED",
        value: String(bookedCountResponse?.meta?.totalItems || 0),
        icon: CalendarRange,
      },
    ],
    [
      allCountResponse?.meta?.totalItems,
      bookedCountResponse?.meta?.totalItems,
    ],
  );

  const totalPages = Math.max(1, paginationMeta?.totalPages || 1);
  const currentPage = Math.min(page, totalPages);

  const visibleBookings = useMemo(
    () =>
      bookingsData.map((booking) => ({
        id: booking.id,
        name: booking.coupleName,
        initials: getInitials(booking.coupleName || "NA"),
        event: booking.venueName,
        status: booking.status,
        date: booking.weddingDate
          ? new Date(booking.weddingDate).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })
          : "N/A",
        value: booking.price,
        email: booking.email,
        phone: booking.phone,
        venue: booking.venueName,
        location: booking.location,
        packageName: booking.package?.packageName || "N/A",
        price:
          typeof booking.price === "number"
            ? `$${booking.price}`
            : `${booking.price || "0"}`,
      })),
    [bookingsData],
  );

  const openNewBooking = () => {
    setIsNewBookingOpen(true);
    setNewBookingForm(emptyForm);
  };

  const closeNewBooking = () => {
    setIsNewBookingOpen(false);
  };

  const handleFormChange = (field, value) => {
    setNewBookingForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleCreateBooking = (event) => {
    event.preventDefault();

    const payload = {
      coupleName: newBookingForm.coupleName.trim(),
      email: newBookingForm.email.trim(),
      phone: newBookingForm.phone.trim(),
      venueName: newBookingForm.venueName.trim(),
      location: newBookingForm.location.trim(),
      weddingDate: newBookingForm.weddingDate ? new Date(newBookingForm.weddingDate).toISOString() : "",
      price: Number(newBookingForm.price || 0),
      packageId: newBookingForm.packageId,
      status: "BOOKED",
    };

    if (
      !payload.coupleName ||
      !payload.email ||
      !payload.phone ||
      !payload.venueName ||
      !payload.location ||
      !payload.weddingDate ||
      !payload.packageId
    ) {
      toast.error("Please fill in all booking fields.");
      return;
    }

    createBooking(payload)
      .unwrap()
      .then(() => {
        toast.success("Booking created successfully.");
        setIsNewBookingOpen(false);
        setNewBookingForm(emptyForm);
        setPage(1);
        setActiveTab(TAB_KEYS.ALL);
      })
      .catch((error) => {
        toast.error(error?.data?.message || "Failed to create booking.");
      });
  };

  const openViewDetails = async (booking) => {
    setSelectedBookingId(booking.id);

    try {
      const response = await getBookingById(booking.id).unwrap();
      const bookingData = response?.data;
      if (!bookingData) {
        toast.error("Booking details not found.");
        return;
      }

      const mappedBooking = {
        id: bookingData.id,
        name: bookingData.coupleName,
        initials: getInitials(bookingData.coupleName || "NA"),
        email: bookingData.email,
        phone: bookingData.phone,
        weddingDate: bookingData.weddingDate
          ? new Date(bookingData.weddingDate).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })
          : "N/A",
        venue: bookingData.venueName,
        location: bookingData.location,
        packageName: bookingData.package?.packageName || "N/A",
        price:
          typeof bookingData.price === "number"
            ? `$${bookingData.price}`
            : `${bookingData.price || "0"}`,
      };

      setSelectedBooking(mappedBooking);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to load booking details.");
      setSelectedBookingId(null);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!bookingId) return;

    try {
      await deleteBooking(bookingId).unwrap();
      toast.success("Booking deleted successfully.");

      if (selectedBookingId === bookingId) {
        setSelectedBookingId(null);
        setSelectedBooking(null);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete booking.");
    }
  };

  const closeDetailsModal = () => {
    setSelectedBookingId(null);
    setSelectedBooking(null);
  };

  return (
    <main className="font-raleway ">
      <BookingsHeader
        vendorName={vendorProfileResponse?.data?.businessName || "Vendor"}
        subtitle="Your dream wedding is coming together beautifully"
      />

      <BookingSummaryCards cards={summaryCards} />

      <BookingTabsActions
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(key) => {
          setActiveTab(key);
          setPage(1);
        }}
        onCreate={openNewBooking}
      />

      <BookingsGrid
        bookings={visibleBookings}
        onViewDetails={openViewDetails}
        onDelete={handleDeleteBooking}
      />

      {isBookingsLoading ? <BookingsSkeleton /> : null}

      <BookingsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {isNewBookingOpen ? (
        <NewBookingModal
          formData={newBookingForm}
          onChange={handleFormChange}
          onClose={closeNewBooking}
          onSubmit={handleCreateBooking}
          isSubmitting={isCreatingBooking}
          packageOptions={packageOptions}
        />
      ) : null}

      {selectedBookingId ? (
        <ViewDetailsModal
          booking={selectedBooking}
          onClose={closeDetailsModal}
          isLoading={isDetailsLoading || !selectedBooking}
        />
      ) : null}
    </main>
  );
};

export default VendorBookings;
