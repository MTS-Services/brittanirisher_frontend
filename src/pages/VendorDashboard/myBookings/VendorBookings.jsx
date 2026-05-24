import React, { useMemo, useState } from "react";
import { CalendarRange, MessageSquareText, ShieldCheck } from "lucide-react";
import BookingsGrid from "./components/BookingsGrid";
import BookingsHeader from "./components/BookingsHeader";
import BookingsPagination from "./components/BookingsPagination";
import BookingSummaryCards from "./components/BookingSummaryCards";
import BookingTabsActions from "./components/BookingTabsActions";
import NewBookingModal from "./components/NewBookingModal";
import ViewDetailsModal from "./components/ViewDetailsModal";

const tabs = [
  { key: "all", label: "All", count: 34 },
  { key: "booked", label: "Booked", count: 18 },
  { key: "completed", label: "Completed", count: 8 },
];

const initialBookings = [
  {
    id: 1,
    name: "Priya Sharma",
    initials: "PS",
    event: "Grand Ballroom",
    status: "completed",
    date: "Oct 24, 2024",
    value: "৳1,80,000",
    email: "jackson.graham@example.com",
    phone: "(307) 555-0133",
    venue: "Luxury Cottage Prime Resort",
    location: "N.A NewYork",
    packageName: "Basic Package",
    price: "$1500",
  },
  {
    id: 2,
    name: "Meher Afroz",
    initials: "MA",
    event: "Grand Ballroom",
    status: "booked",
    date: "Oct 24, 2024",
    value: "৳1,80,000",
    email: "meher.afroz@example.com",
    phone: "(307) 555-0188",
    venue: "Grand Ballroom",
    location: "Dhaka, Bangladesh",
    packageName: "Premium Package",
    price: "$1800",
  },
  {
    id: 3,
    name: "Tanvir & Nadia Islam",
    initials: "TN",
    event: "Luxury Reception",
    status: "booked",
    date: "Nov 12, 2024",
    value: "৳3,20,000",
    email: "tanvir.nadia@example.com",
    phone: "(307) 555-0199",
    venue: "Luxury Reception Hall",
    location: "Chattogram, Bangladesh",
    packageName: "Luxury Package",
    price: "$3200",
  },
  {
    id: 4,
    name: "Sadia Islam",
    initials: "SI",
    event: "Floral Design",
    status: "completed",
    date: "Aug 15, 2024",
    value: "৳45,000",
    email: "sadia.islam@example.com",
    phone: "(307) 555-0141",
    venue: "Floral Design Studio",
    location: "Sylhet, Bangladesh",
    packageName: "Starter Package",
    price: "$450",
  },
  {
    id: 5,
    name: "Meher Afroz",
    initials: "MA",
    event: "Grand Ballroom",
    status: "booked",
    date: "Oct 24, 2024",
    value: "৳1,80,000",
    email: "meher.afroz@example.com",
    phone: "(307) 555-0188",
    venue: "Grand Ballroom",
    location: "Dhaka, Bangladesh",
    packageName: "Premium Package",
    price: "$1800",
  },
  {
    id: 6,
    name: "Farzana Hossain",
    initials: "FH",
    event: "Engagement",
    status: "completed",
    date: "Dec 05, 2024",
    value: "৳65,000",
    email: "farzana.hossain@example.com",
    phone: "(307) 555-0162",
    venue: "Engagement Lawn",
    location: "Dhaka, Bangladesh",
    packageName: "Standard Package",
    price: "$650",
  },
  {
    id: 7,
    name: "Nusrat Jahan",
    initials: "NJ",
    event: "Outdoor Ceremony",
    status: "pending",
    date: "Dec 15, 2024",
    value: "৳95,000",
    email: "nusrat.jahan@example.com",
    phone: "(307) 555-0114",
    venue: "Outdoor Ceremony Space",
    location: "Narayanganj, Bangladesh",
    packageName: "Standard Package",
    price: "$950",
  },
  {
    id: 8,
    name: "Rafiq & Alina",
    initials: "RA",
    event: "Banquet Hall",
    status: "booked",
    date: "Jan 11, 2025",
    value: "৳2,40,000",
    email: "rafiq.alina@example.com",
    phone: "(307) 555-0109",
    venue: "Banquet Hall",
    location: "Dhaka, Bangladesh",
    packageName: "Premium Package",
    price: "$2400",
  },
  {
    id: 9,
    name: "Kazi Anika",
    initials: "KA",
    event: "Bridal Shower",
    status: "completed",
    date: "Feb 02, 2025",
    value: "৳35,000",
    email: "kazi.anika@example.com",
    phone: "(307) 555-0190",
    venue: "Private Dining",
    location: "Comilla, Bangladesh",
    packageName: "Starter Package",
    price: "$350",
  },
  {
    id: 10,
    name: "Mim & Shuvo",
    initials: "MS",
    event: "Garden Venue",
    status: "pending",
    date: "Feb 20, 2025",
    value: "৳1,10,000",
    email: "mim.shuvo@example.com",
    phone: "(307) 555-0145",
    venue: "Garden Venue",
    location: "Gazipur, Bangladesh",
    packageName: "Standard Package",
    price: "$1100",
  },
  {
    id: 11,
    name: "Ayesha Kabir",
    initials: "AK",
    event: "Candlelight Dinner",
    status: "booked",
    date: "Mar 06, 2025",
    value: "৳78,000",
    email: "ayesha.kabir@example.com",
    phone: "(307) 555-0177",
    venue: "Candlelight Dinner Hall",
    location: "Dhaka, Bangladesh",
    packageName: "Premium Package",
    price: "$780",
  },
  {
    id: 12,
    name: "Rumana Chowdhury",
    initials: "RC",
    event: "Pre-wedding Shoot",
    status: "completed",
    date: "Mar 28, 2025",
    value: "৳52,000",
    email: "rumana.chowdhury@example.com",
    phone: "(307) 555-0151",
    venue: "Pre-wedding Shoot Location",
    location: "Chattogram, Bangladesh",
    packageName: "Starter Package",
    price: "$520",
  },
];

const summaryCards = [
  { label: "TOTAL BOOKINGS", value: "2", icon: MessageSquareText },
  {
    label: "UPCOMING",
    value: "8",
    meta: "(Next event in 4 days)",
    icon: CalendarRange,
  },
  { label: "AWAITING REQUESTS", value: "3", icon: ShieldCheck },
];

const emptyForm = {
  coupleName: "",
  email: "",
  phone: "",
  venueName: "",
  location: "",
  weddingDate: "",
  packageName: "Basic",
  price: "",
};

const packageOptions = ["Basic", "Standard", "Premium", "Luxury"];

const getInitials = (value) =>
  value
    .split(" ")
    .map((part) => part.trim().charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

const VendorBookings = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);
  const [bookingsData, setBookingsData] = useState(initialBookings);
  const [newBookingForm, setNewBookingForm] = useState(emptyForm);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const pageSize = 6;

  const filteredBookings = useMemo(() => {
    if (activeTab === "all") {
      return bookingsData;
    }

    return bookingsData.filter((booking) => booking.status === activeTab);
  }, [activeTab, bookingsData]);

  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleBookings = filteredBookings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
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

    const nextBooking = {
      id: Date.now(),
      name: newBookingForm.coupleName || "New Couple",
      initials: getInitials(newBookingForm.coupleName || "NC"),
      event: newBookingForm.venueName || "New Venue",
      status: "pending",
      date: newBookingForm.weddingDate || "TBD",
      value: newBookingForm.price || "$0",
      email: newBookingForm.email || "couple@example.com",
      phone: newBookingForm.phone || "(000) 000-0000",
      venue: newBookingForm.venueName || "New Venue",
      location: newBookingForm.location || "Unknown",
      packageName: newBookingForm.packageName,
      price: newBookingForm.price || "$0",
    };

    setBookingsData((current) => [nextBooking, ...current]);
    setIsNewBookingOpen(false);
    setActiveTab("all");
    setPage(1);
  };

  return (
    <main className="font-raleway ">
      <BookingsHeader
        vendorName="Studio Bella"
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
        onViewDetails={setSelectedBooking}
      />

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
          packageOptions={packageOptions}
        />
      ) : null}

      {selectedBooking ? (
        <ViewDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      ) : null}
    </main>
  );
};

export default VendorBookings;
