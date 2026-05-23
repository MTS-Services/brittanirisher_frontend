import { useState, useRef, useEffect } from "react";
import VendorManagementHeader from "../../../components/adminDashboard/requestVendors/VendorManagementHeader";
import RequestedVendorsTable from "../../../components/adminDashboard/requestVendors/RequestedVendorsTable";
import RequestedVendorsMobileList from "../../../components/adminDashboard/requestVendors/RequestedVendorsMobileList";
import RequestedVendorsActionMenu from "../../../components/adminDashboard/requestVendors/RequestedVendorsActionMenu";
import RequestedVendorsPagination from "../../../components/adminDashboard/requestVendors/RequestedVendorsPagination";

const vendors = [
  {
    id: 1,
    name: "Elegant Frames",
    category: "Photography",
    date: "2024-05-10",
    status: "Reject",
  },
  {
    id: 2,
    name: "Grand Feast Catering",
    category: "Catering",
    date: "2024-05-10",
    status: "Approved",
  },
  {
    id: 3,
    name: "Midnight Melodies DJ",
    category: "Entertainment",
    date: "2024-05-10",
    status: "Reject",
  },
  {
    id: 4,
    name: "Elegant Frames",
    category: "Photography",
    date: "2024-05-10",
    status: "Approved",
  },
  {
    id: 5,
    name: "Elegant Frames",
    category: "Photography",
    date: "2024-05-10",
    status: "Approved",
  },
  {
    id: 6,
    name: "Elegant Frames",
    category: "Photography",
    date: "2024-05-10",
    status: "Approved",
  },
  {
    id: 7,
    name: "Elegant Frames",
    category: "Photography",
    date: "2024-05-10",
    status: "Approved",
  },
  {
    id: 8,
    name: "Elegant Frames",
    category: "Photography",
    date: "2024-05-10",
    status: "Approved",
  },
];

export default function RequestedVendors() {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState(null);
  const activeMenuRef = useRef(null);
  const [menuPos, setMenuPos] = useState(null);

  const filtered = vendors.filter((v) => {
    if (!filter || filter === "all") return true;
    if (filter === "approved") return v.status.toLowerCase() === "approved";
    if (filter === "reject") return v.status.toLowerCase() === "reject";
    return true;
  });

  const perPage = 7;
  const totalResults = filtered.length;
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    function handleDocClick(e) {
      if (activeMenuRef.current && !activeMenuRef.current.contains(e.target)) {
        setOpenId(null);
        setMenuPos(null);
      }
    }

    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, []);

  const handleAction = (action, vendor) => {
    setOpenId(null);
    setMenuPos(null);
    // placeholder for real handlers
    // eslint-disable-next-line no-console
    console.log("action", action, vendor);
  };

  const toggleMenu = (id, evt) => {
    if (openId === id) {
      setOpenId(null);
      setMenuPos(null);
      return;
    }

    const btn = evt.currentTarget;
    const rect = btn.getBoundingClientRect();
    const menuWidth = 176;
    const left = Math.min(
      Math.max(rect.right - menuWidth, 8),
      window.innerWidth - menuWidth - 8,
    );
    const top = rect.bottom + 8;

    setOpenId(id);
    setMenuPos({ top, left });
  };

  return (
    <div className="space-y-8">
      <div className="">
        <VendorManagementHeader filter={filter} setFilter={setFilter} />

        <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
       

          <RequestedVendorsTable
            paged={paged}
            openId={openId}
            toggleMenu={toggleMenu}
          />

          <RequestedVendorsMobileList
            paged={paged}
            openId={openId}
            toggleMenu={toggleMenu}
          />

          <RequestedVendorsActionMenu
            openId={openId}
            menuPos={menuPos}
            activeMenuRef={activeMenuRef}
            vendors={vendors}
            onAction={handleAction}
          />

          <RequestedVendorsPagination
            page={page}
            setPage={setPage}
            perPage={perPage}
            totalResults={totalResults}
          />
        </div>
      </div>
    </div>
  );
}
