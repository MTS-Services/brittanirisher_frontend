import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import PackagesGrid from "./components/PackagesGrid";
import AboutSection from "./components/AboutSection";
import ServiceHighlights from "./components/ServiceHighlights";
import Portfolio from "./components/Portfolio";
import SubscriptionBanner from "./components/SubscriptionBanner";
import { ChevronLeft } from "lucide-react";
import { API_CONFIG } from "../../../config";
import { useGetAdminVendorByIdQuery } from "../../../store/features/admin/adminVendor/adminVendorApi";

const toPublicAssetUrl = (path) => {
  if (!path) return "";
  if (String(path).startsWith("http")) return path;

  const base = (API_CONFIG.BASE_URL || "").replace(/\/$/, "");
  const normalizedPath = String(path).startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
};

const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const splitIntoColumns = (items, columnCount = 3) => {
  const safeItems = Array.isArray(items) ? items : [];
  if (!safeItems.length) return [["No service highlights available"]];

  const chunkSize = Math.ceil(safeItems.length / columnCount);
  const columns = [];
  for (let index = 0; index < safeItems.length; index += chunkSize) {
    columns.push(safeItems.slice(index, index + chunkSize));
  }
  return columns;
};

export default function VendorDetails() {
  const navigate = useNavigate();
  const { vendorId } = useParams();
  const location = useLocation();

  const vendorFromState = location.state?.vendor;
  const selectedVendorId = vendorId || vendorFromState?.id;

  const { data, isLoading, isError } = useGetAdminVendorByIdQuery(selectedVendorId, {
    skip: !selectedVendorId,
    refetchOnMountOrArgChange: true,
  });

  const vendorProfile = data?.data || vendorFromState?.raw || null;

  const vendorName =
    vendorProfile?.businessName ||
    vendorProfile?.user?.name ||
    vendorFromState?.name ||
    "Unknown Vendor";
  const categoryName =
    vendorProfile?.category?.name ||
    vendorProfile?.category ||
    vendorFromState?.category ||
    "N/A";
  const locationText = vendorProfile?.location || "N/A";
  const email = vendorProfile?.user?.email || "N/A";
  const phone = vendorProfile?.phone || "N/A";

  const packageItems = Array.isArray(vendorProfile?.packages)
    ? vendorProfile.packages
    : [];

  const packages = packageItems.map((item, index) => ({
    id: item.id || `${item.packageName}-${index}`,
    title: item.packageName || "Package",
    price: item.price ? `$${item.price}` : "$0",
    description: item.shortDescription || item.badge || "Custom package",
    recommended: index === 0,
    bullets:
      Array.isArray(item.features) && item.features.length > 0
        ? item.features
        : ["No feature listed"],
  }));

  const aboutText = vendorProfile?.aboutMe
    ? [vendorProfile.aboutMe]
    : ["No about information provided."];

  const highlights = splitIntoColumns(vendorProfile?.highlightedServices || []);

  const portfolio = (vendorProfile?.portfolioImages || [])
    .map((image) => toPublicAssetUrl(image?.mediaUrl))
    .filter(Boolean);

  const heroImage = toPublicAssetUrl(vendorProfile?.coverImage) || portfolio[0] || "";
  const heroImages = [toPublicAssetUrl(vendorProfile?.coverImage), ...portfolio].filter(Boolean);

  const bannerPlanName = packageItems[0]?.packageName || "N/A";
  const bannerPlanPrice = packageItems[0]?.price ? `$${packageItems[0].price}` : "$0";
  const bannerExpiryDate = formatDate(vendorProfile?.updatedAt);

  if (!selectedVendorId) {
    return (
      <div className="min-h-screen space-y-6 font-playfair">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          <ChevronLeft size={16} className="mr-1" /> Back
        </button>
        <p className="text-sm text-red-600">Vendor id not found.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen space-y-6 font-playfair">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          <ChevronLeft size={16} className="mr-1" /> Back
        </button>
        <p className="text-sm text-gray-600">Loading vendor details...</p>
      </div>
    );
  }

  if (isError || !vendorProfile) {
    return (
      <div className="min-h-screen space-y-6 font-playfair">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          <ChevronLeft size={16} className="mr-1" /> Back
        </button>
        <p className="text-sm text-red-600">Failed to load vendor details.</p>
      </div>
    );
  }

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
        vendorName={vendorName}
        planName={bannerPlanName}
        planPrice={bannerPlanPrice}
        expiryDate={bannerExpiryDate}
        description="Manage your subscription, keep your profile active, and continue receiving quality leads from couples searching for vendors like you."
      />

      <HeroSection
        imageUrl={heroImage}
        imageUrls={heroImages}
        name={vendorName}
        category={categoryName}
        location={locationText}
        email={email}
        phone={phone}
      />
      <PackagesGrid packages={packages} />
      <AboutSection bio={aboutText} />
      <ServiceHighlights
        highlights={highlights}
        experience={vendorProfile?.experienceYears || "N/A"}
        specialty={vendorProfile?.speciality || "N/A"}
      />
      <Portfolio images={portfolio} />
    </div>
  );
}
