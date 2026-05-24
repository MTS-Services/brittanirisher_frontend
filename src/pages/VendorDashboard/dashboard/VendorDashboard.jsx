import { BookCopy, CalendarDays, Mail } from 'lucide-react';
import SubscriptionBanner from './components/SubscriptionBanner';
import StatsCardsSection from './components/StatsCardsSection';
import UpcomingWeddingsSection from './components/UpcomingWeddingsSection';
import NewInquiriesSection from './components/NewInquiriesSection';
import TotalLeadsSection from './components/TotalLeadsSection';

const statCards = [
  { label: 'New Leads', value: '32', icon: Mail },
  {
    label: 'Upcoming Wedding Program',
    value: '12',
    sub: 'Days Remaining',
    icon: CalendarDays,
  },
  { label: 'Total Booking', value: '120', icon: BookCopy },
];

const upcomingWeddings = [
  {
    couple: 'Eleanor & Julian',
    date: 'Sept 14, 2024',
    venue: 'The Glass House, NY',
    image: '/Bloom_and_Petal.png',
  },
  {
    couple: 'Sophia & Marcus',
    date: 'Oct 02, 2024',
    venue: 'Ritz-Carlton Ballroom',
    image: '/Elegant_Photography.jpg',
  },
];

const inquiries = [
  {
    name: 'Clara M.',
    service: 'Wedding Planning',
    time: '2h ago',
    note: 'Looking for a full-service planner for..',
  },
  {
    name: 'David L.',
    service: 'Floral Design',
    time: '3h ago',
    note: 'Inquiry regarding availability for a..',
  },
];

const leadsData = [
  { month: 'Jan', leads: 150 },
  { month: 'Feb', leads: 220 },
  { month: 'Mar', leads: 80 },
  { month: 'Apr', leads: 300 },
  { month: 'May', leads: 360 },
  { month: 'Jun', leads: 110 },
  { month: 'Jul', leads: 240 },
  { month: 'Aug', leads: 430 },
  { month: 'Sep', leads: 200 },
  { month: 'Oct', leads: 300 },
  { month: 'Nov', leads: 260 },
  { month: 'Dec', leads: 360 },
];

const leadBars = leadsData.map((item, index) => ({
  ...item,
  fill: index === leadsData.length - 1 ? '#596158' : '#e1e6df',
}));

const VendorDashboard = () => {
  return (
    <main className='font-raleway text-[#0c0c0c]'>
      <SubscriptionBanner />

      <StatsCardsSection cards={statCards} />

     <section className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[1.55fr_0.85fr]">
      <UpcomingWeddingsSection weddings={upcomingWeddings} />
      <NewInquiriesSection inquiries={inquiries} />
    </section>

      <TotalLeadsSection data={leadBars} />
    </main>
  );
};

export default VendorDashboard;
