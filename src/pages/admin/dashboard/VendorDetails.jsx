import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import PackagesGrid from "./components/PackagesGrid";
import AboutSection from "./components/AboutSection";
import ServiceHighlights from "./components/ServiceHighlights";
import Portfolio from "./components/Portfolio";
import SubscriptionBanner from "./components/SubscriptionBanner";
import { ChevronLeft } from "lucide-react";

const fallbackVendors = [
  {
    id: 1,
    name: "Grace Photography",
    category: "Photography",
    date: "2024-05-10",
    status: "Approved",
  },
];

export default function VendorDetails() {
  const { vendorId } = useParams();
  const location = useLocation();

  const vendorFromState = location.state?.vendor;
  const parsedId = Number(vendorId);
  const fallbackVendor =
    fallbackVendors.find((vendor) => vendor.id === parsedId) ||
    fallbackVendors[0];
  const vendor = vendorFromState || fallbackVendor;

  const vendorData = {
    name: vendor.name,
    category: vendor.category,
    location: "Bay Area, California",
    email: "debra.holt@example.com",
    phone: "(629) 555-0129",
  };

  const packages = [
    {
      id: "essential",
      title: "Essential Package",
      price: "$1,200",
      description: "Perfect for intimate weddings.",
      recommended: false,
      bullets: [
        "Full wedding coverage",
        "1 professional photographer",
        "150 professionally edited photos",
        "Private online gallery",
        "Digital download",
        "Delivery within 14 days",
      ],
    },
    {
      id: "premium",
      title: "Premium Package",
      price: "$2,500",
      description: "Best for full-day wedding coverage.",
      recommended: true,
      bullets: [
        "Full wedding coverage",
        "2 professional photographers",
        "400 professionally edited photos",
        "Complimentary engagement session",
        "Private online gallery",
        "Sneak peek within 48 hours",
        "Delivery within 10 days",
      ],
    },
    {
      id: "luxury",
      title: "Luxury Package",
      price: "$1,200",
      description: "Complete luxury wedding experience.",
      recommended: false,
      bullets: [
        "Full wedding coverage",
        "2 photographers + 1 videographer",
        "700+ edited photos",
        "Engagement session",
        "Bridal session",
        "Luxury wedding album",
        "Drone photography",
        "Same day teaser",
        "Delivery within 7 days",
      ],
    },
  ];

  const bio = [
    "At Timeless Moments Photography, we believe every wedding tells a unique love story—and our passion is capturing those unforgettable moments with authenticity and elegance.",
    "With over 8 years of experience in wedding photography, we specialize in documenting genuine emotions, candid moments, and timeless portraits that couples can cherish forever. From intimate ceremonies to grand celebrations, our goal is to preserve every detail of your special day with creativity and care.",
    "Our photography style blends modern editorial, candid storytelling, and romantic elegance, ensuring your memories are beautifully captured and delivered in a way that feels personal and timeless.",
    "Your wedding day happens once—our mission is to make those memories last forever.",
  ];

  const highlights = [
    [
      "Full-day coverage (10+ hours)",
      "Online gallery with download rights",
      "Same-day preview photos",
    ],
    [
      "Second photographer included",
      "Complimentary engagement session",
      "Professional retouching",
    ],
    [
      "Second photographer included",
      "Complimentary engagement session",
      "Professional retouching",
    ],
  ];

  const portfolio = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80",
    "https://images.unsplash.com/photo-1621801306185-3079b7b92019?w=800&q=80",
    "https://images.unsplash.com/photo-1544078751-58fee2e8baa1?w=800&q=80",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80",
    "https://images.unsplash.com/photo-1607583481239-1662cc7e644b?w=800&q=80",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80",
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80",
    "https://images.unsplash.com/photo-1610174092497-6a58eb23ce0d?w=800&q=80",
  ];

  return (
    <div className="min-h-screen space-y-8 font-playfair">
      {/* Top Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
      >
        <ChevronLeft size={16} className="mr-1" /> Back
      </button>

      <SubscriptionBanner
        vendorName={vendor.name}
        planName="Starter"
        planPrice="$79"
        expiryDate="5/12/2026"
        description="Manage your subscription, keep your profile active, and continue receiving quality leads from couples searching for vendors like you."
      />

      <HeroSection imageUrl="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80" />
      <PackagesGrid packages={packages} />
      <AboutSection bio={bio} />
      <ServiceHighlights
        highlights={highlights}
        experience="8 years"
        specialty="Romantic & Editorial"
      />
      <Portfolio images={portfolio} />
    </div>
  );
}
