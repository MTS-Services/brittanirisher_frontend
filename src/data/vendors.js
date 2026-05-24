const weddingPortfolio = [
  'https://images.unsplash.com/photo-1529634806980-b8f0f6ae1f24?w=800&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
  'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
  'https://images.unsplash.com/photo-1523438097201-512ae7d59d9a?w=800&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522673607200-164d1b3d6d1f?w=800&q=80',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80',
  'https://images.unsplash.com/photo-1523438097201-512ae7d59d9a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1523438097201-512ae7d59d9a?w=800&q=80&sat=-20',
  'https://images.unsplash.com/photo-1484156818044-c040038b0719?w=800&q=80',
  'https://images.unsplash.com/photo-1507914372368-b6a8d4c4c05b?w=800&q=80',
  'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80',
  'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80',
];

const baseDetails = {
  availableDates: ['2026-06-10', '2026-06-18', '2026-07-02'],
  bookedDates: ['2026-06-12'],
  contact: { email: 'hello@demo.com', phone: '(555) 555-0100' },
  about: 'Dummy vendor profile content for the details page demo.',
  packages: [
    {
      id: 'starter',
      title: 'Starter Package',
      price: '$1,000',
      priceValue: 1000,
      features: ['Core service', 'Basic delivery', '1 revision'],
    },
    {
      id: 'standard',
      title: 'Standard Package',
      price: '$2,000',
      priceValue: 2000,
      recommended: true,
      features: ['Expanded coverage', 'Priority support', '2 revisions', 'Gallery access'],
    },
    {
      id: 'premium',
      title: 'Premium Package',
      price: '$3,500',
      priceValue: 3500,
      features: ['Full premium service', 'VIP support', 'Unlimited revisions'],
    },
  ],
  serviceHighlights: ['Fast response', 'Custom packages', 'On-time delivery', 'Friendly support'],
  portfolio: weddingPortfolio,
};

const makeVendor = (vendor, extras = {}) => ({
  ...vendor,
  ...baseDetails,
  ...extras,
  contact: {
    ...baseDetails.contact,
    ...(extras.contact || {}),
  },
  packages: extras.packages || baseDetails.packages,
  serviceHighlights: extras.serviceHighlights || baseDetails.serviceHighlights,
  portfolio: extras.portfolio
    ? [...extras.portfolio, ...weddingPortfolio.slice(extras.portfolio.length)]
    : weddingPortfolio,
  availableDates: extras.availableDates || baseDetails.availableDates,
  bookedDates: extras.bookedDates || baseDetails.bookedDates,
});

const VENDORS = [
  makeVendor(
    {
      id: 1,
      name: 'Elegant Photography',
      category: 'Photography',
      description: 'Capturing timeless moments with a cinematic, editorial style.',
      fullDescription:
        'Elegant Photography specialises in editorial-style wedding imagery with an emphasis on natural light and candid moments. Packages include a second shooter and an online gallery.',
      location: 'Los Angeles, CA',
      price: 1200,
      priceDisplay: '$1,200',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    },
    {
      contact: { email: 'hello@elegantphoto.com', phone: '(323) 555-0129' },
      availableDates: ['2026-06-10', '2026-06-18', '2026-07-02', '2026-07-15'],
      bookedDates: ['2026-06-12', '2026-06-20'],
      about:
        'With over a decade capturing weddings, we focus on emotive storytelling and timeless portraiture. Our team blends documentary and editorial approaches to create cohesive wedding day coverage.',
      packages: [
        {
          id: 'essential',
          title: 'Essential Package',
          price: '$1,200',
          priceValue: 1200,
          features: ['Full wedding coverage', '1 professional photographer', '150 professionally edited photos', 'Private online gallery'],
        },
        {
          id: 'premium',
          title: 'Premium Package',
          price: '$2,500',
          priceValue: 2500,
          recommended: true,
          features: ['Full wedding coverage', '2 professional photographers', '400 professionally edited photos', 'Complimentary engagement session', 'Private online gallery'],
        },
        {
          id: 'luxury',
          title: 'Luxury Package',
          price: '$3,800',
          priceValue: 3800,
          features: ['Complete luxury wedding experience', '2 photographers + 1 videographer', '700+ edited photos', 'Bridal session'],
        },
      ],
      serviceHighlights: ['Full-day coverage (10+ hours)', 'Online gallery with download rights', 'Second photographer included', 'Complimentary engagement session'],
      portfolio: [
        'https://images.unsplash.com/photo-1505577058444-a3dab0f0c6d6?w=800&q=80',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80',
        'https://images.unsplash.com/photo-1490806840354-4f7c9b62b2b6?w=800&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
      ],
    },
  ),
  makeVendor(
    {
      id: 2,
      name: 'Desert Bloom Weddings',
      category: 'Venue',
      description: 'Experience the romance of the Southwest with rustic-chic outdoor settings.',
      fullDescription:
        'Desert Bloom Weddings offers a rustic outdoor venue with flexible layouts, on-site coordination, and catering partnerships for desert or boho-inspired ceremonies.',
      location: 'Phoenix, AZ',
      price: 3500,
      priceDisplay: '$3,500',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=80',
    },
    {
      contact: { email: 'events@desertbloomweddings.com', phone: '(602) 555-0144' },
      availableDates: ['2026-06-05', '2026-06-12', '2026-08-22'],
      bookedDates: ['2026-06-18'],
      about:
        'A desert-inspired venue with flexible floor plans, ceremony backdrops, and temperature-controlled indoor backup spaces.',
      portfolio: [
        'https://images.unsplash.com/photo-1519167758481-83f29cd272c2?w=800&q=80',
        'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80',
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
        'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800&q=80',
        'https://images.unsplash.com/photo-1484156818044-c040038b0719?w=800&q=80',
      ],
    },
  ),
  makeVendor(
    {
      id: 3,
      name: 'Sweet Petals Bakery',
      category: 'Cakes & Desserts',
      description: 'Custom-designed floral wedding cakes that taste as beautiful as they look.',
      fullDescription:
        'Sweet Petals Bakery produces handcrafted wedding cakes with seasonal flavors, sugar florals, and delivery/setup options for local venues.',
      location: 'Los Angeles, CA',
      price: 850,
      priceDisplay: '$850',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=1200&q=80',
    },
    {
      contact: { email: 'orders@sweetpetalsbakery.com', phone: '(213) 555-0178' },
      availableDates: ['2026-06-11', '2026-06-19', '2026-07-03'],
      bookedDates: ['2026-06-24'],
      about:
        'Specializing in buttercream, fondant, and dessert tables with custom floral detailing and tasting appointments every week.',
      portfolio: [
        'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80',
        'https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80',
        'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80',
        'https://images.unsplash.com/photo-1542826438-d4e4d6e5d9ad?w=800&q=80',
        'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=800&q=80',
        'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
      ],
    },
  ),
  makeVendor(
    {
      id: 4,
      name: 'Grand Ballroom Estate',
      category: 'Venue',
      description: 'Elegant ballroom venue with stunning chandeliers and classic architecture.',
      fullDescription:
        'Grand Ballroom Estate is a full-service venue with exclusive catering partners, event coordination, and a capacious ballroom that fits up to 400 guests.',
      location: 'Los Angeles, CA',
      price: 5500,
      priceDisplay: '$5,500',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80',
    },
    {
      contact: { email: 'bookings@grandballroomestate.com', phone: '(310) 555-0192' },
      availableDates: ['2026-09-10', '2026-09-24'],
      bookedDates: ['2026-09-03'],
      about:
        'A classic ballroom venue with chandeliers, sweeping staircases, valet parking, and a dedicated coordination team.',
      portfolio: [
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
        'https://images.unsplash.com/photo-1519167758481-83f29cd272c2?w=800&q=80',
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
        'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80',
        'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
        'https://images.unsplash.com/photo-1484156818044-c040038b0719?w=800&q=80',
      ],
    },
  ),
  makeVendor(
    {
      id: 5,
      name: 'Graceful Silhouettes',
      category: 'Bridal Boutique',
      description: 'Designer wedding gowns and custom tailoring for a timeless bridal look.',
      fullDescription:
        'Graceful Silhouettes provides private fittings, bespoke alterations, and curated designer collections for modern and classic brides.',
      location: 'New York, NY',
      price: 2500,
      priceDisplay: '$2,500',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b6cd?w=1200&q=80',
    },
    {
      contact: { email: 'stylist@gracefulsilhouettes.com', phone: '(212) 555-0164' },
      availableDates: ['2026-07-20', '2026-08-05', '2026-08-12'],
      bookedDates: ['2026-07-29'],
      about:
        'A boutique bridal studio offering private appointments, tailoring, and accessories styling in a calm, luxury environment.',
      portfolio: [
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
        'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80',
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e0?w=800&q=80',
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80',
      ],
    },
  ),
  makeVendor(
    {
      id: 6,
      name: 'Enchanted Petals',
      category: 'Floral Design',
      description: 'Bespoke floral arrangements and installations for a dream-like atmosphere.',
      fullDescription:
        'Enchanted Petals specialises in seasonal installations, centerpieces, and ceremony arches with sustainable sourcing and bespoke color palettes.',
      location: 'Seattle, WA',
      price: 1800,
      priceDisplay: '$1,800',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1561128290-006d59d4d9dc?w=1200&q=80',
    },
    {
      contact: { email: 'hello@enchantedpetals.co', phone: '(206) 555-0188' },
      availableDates: ['2026-06-30', '2026-07-07', '2026-09-01'],
      bookedDates: ['2026-06-15'],
      about:
        'A floral studio creating ceremony arches, reception centerpieces, and editorial floral styling with local blooms.',
      portfolio: [
        'https://images.unsplash.com/photo-1494733716274-0567dc9b2a5f?w=800&q=80',
        'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800&q=80',
        'https://images.unsplash.com/photo-1484156818044-c040038b0719?w=800&q=80',
        'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&q=80',
        'https://images.unsplash.com/photo-1469533778471-92a68acc3633?w=800&q=80',
        'https://images.unsplash.com/photo-1523438097201-f2e7df5c7e39?w=800&q=80',
      ],
    },
  ),
  makeVendor(
    {
      id: 7,
      name: 'Radiant Glow Artistry',
      category: 'Hair & Makeup',
      description: 'Professional bridal makeup and hairstyling to enhance your natural beauty.',
      fullDescription:
        'Radiant Glow Artistry offers on-location bridal beauty services with trial sessions, travel packages, and team bookings for larger bridal parties.',
      location: 'Miami, FL',
      price: 600,
      priceDisplay: '$600',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80',
    },
    {
      contact: { email: 'book@radiantglow.art', phone: '(305) 555-0136' },
      availableDates: ['2026-06-14', '2026-07-01', '2026-07-18'],
      bookedDates: ['2026-06-22'],
      about:
        'A glam team that provides bridal trials, on-site touchups, and soft-glam looks tailored to photography lighting.',
      portfolio: [
        'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80',
        'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80',
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
        'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=800&q=80',
        'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80',
      ],
    },
  ),
  makeVendor(
    {
      id: 8,
      name: 'Gourmet Union',
      category: 'Catering',
      description: 'Exquisite multi-cuisine menus and premium dining service for your guests.',
      fullDescription:
        'Gourmet Union curates tasting menus, provides full-service waitstaff, and offers customizable stations for plated or family-style service.',
      location: 'Chicago, IL',
      price: 4500,
      priceDisplay: '$4,500',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=1200&q=80',
    },
    {
      contact: { email: 'events@gourmetunion.com', phone: '(312) 555-0108' },
      availableDates: ['2026-08-15', '2026-08-22', '2026-09-05'],
      bookedDates: ['2026-08-08'],
      about:
        'A wedding catering team serving plated dinners, live stations, tasting menus, and dessert pairings for events of all sizes.',
      portfolio: [
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
        'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
        'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
        'https://images.unsplash.com/photo-1464306076886-da185f6a9c4f?w=800&q=80',
        'https://images.unsplash.com/photo-1520218508822-998633d997e6?w=800&q=80',
      ],
    },
  ),
  makeVendor(
    {
      id: 9,
      name: 'Rhythm & Beats Entertainment',
      category: 'DJ & Music',
      description: 'Curated playlists and high-energy performances to keep the dance floor full.',
      fullDescription:
        'Rhythm & Beats provides DJ packages with MC services, lighting, and custom playlists tailored to your event vibe.',
      location: 'Austin, TX',
      price: 1500,
      priceDisplay: '$1,500',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1200&q=80',
    },
    {
      contact: { email: 'hello@rhythmandbeats.co', phone: '(512) 555-0140' },
      availableDates: ['2026-06-21', '2026-07-09', '2026-09-12'],
      bookedDates: ['2026-06-28'],
      about:
        'A DJ and entertainment crew with lighting, MC support, and setlist planning for receptions, sangeets, and after-parties.',
      portfolio: [
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
        'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80',
        'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80',
        'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?w=800&q=80',
        'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80',
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
      ],
    },
  ),
];

export default VENDORS;
