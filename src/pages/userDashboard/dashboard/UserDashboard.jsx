import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser, logout } from "../../../store/slices/authSlice";
import { ROUTES } from "../../../config";
import { CalendarDays, DollarSign } from "lucide-react";
import DashboardHeader from "./components/DashboardHeader";
import StatsGrid from "./components/StatsGrid";
import SuggestedForYou from "./components/SuggestedForYou";

import { 
  useGetCoupleDashboardQuery, 
  useGetVendorSuggestedQuery ,
  useGetCoupleProfileQuery
} from "../../../store/features/couple/coupleDashboard";

const StatsSkeleton = () => (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 animate-pulse">
    {[1, 2, 3, 4].map((n) => (
      <div key={n} className="h-28 rounded-lg border border-[#f0eee9] bg-gray-50/50 p-6">
        <div className="h-4 w-24 rounded bg-[#ece9e2] mb-3"></div>
        <div className="h-8 w-32 rounded bg-[#ece9e2]"></div>
      </div>
    ))}
  </div>
);

const UserDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  
  const [page, setPage] = useState(1);
  const { data: profileData } = useGetCoupleProfileQuery();

  const {
    data: statusResponse,
    isLoading: isStatusLoading,
    isError: isStatusError,
    error: statusError,
  } = useGetCoupleDashboardQuery();

  const {
    data: profileResponse,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
  } = useGetVendorSuggestedQuery(page);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN, { replace: true });
  };

const headlineName = profileData?.data?.name || user?.firstName || user?.name || "...";
  const formatCurrency = (value) => {
    if (value === undefined || value === null) return "$0";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const statusData = statusResponse?.data;
  const suggestedItems = profileResponse?.data || [];
  const suggestedMeta = profileResponse?.meta;

  const topStats = [
    {
      label: "Wedding Countdown",
      value: statusData?.remainingDate !== undefined ? String(statusData.remainingDate) : "0",
      sub: "days remaining",
      icon: CalendarDays,
    },
    {
      label: "Total Budget",
      value: formatCurrency(statusData?.budget),
      sub: "",
      icon: DollarSign,
    },
    {
      label: "Expend Budget",
      value: formatCurrency(statusData?.expendBudget),
      sub: "",
      icon: DollarSign,
    },
    {
      label: "Remaining Budget",
      value: formatCurrency(statusData?.remainingBudget),
      sub: "",
      icon: DollarSign,
    },
  ];

  if (isStatusError || isProfileError) {
    const activeError = statusError || profileError;
    return (
      <div className="p-4 m-6 text-sm text-red-800 bg-red-50 rounded-lg shadow-sm border border-red-100">
        <span className="font-semibold">Error:</span>{" "}
        {activeError?.data?.message || "Failed to load dashboard data. Please try again later."}
      </div>
    );
  }

  return (
    <main className="font-playfair">
      <DashboardHeader headlineName={headlineName} />
      
      {isStatusLoading ? <StatsSkeleton /> : <StatsGrid stats={topStats} />}
      
      <SuggestedForYou 
        items={suggestedItems} 
        meta={suggestedMeta} 
        isLoading={isProfileLoading}
        onPageChange={(newPage) => setPage(newPage)} 
      />
    </main>
  );
};

export default UserDashboard;