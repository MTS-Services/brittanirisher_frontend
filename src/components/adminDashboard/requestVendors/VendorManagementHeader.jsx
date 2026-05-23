export default function VendorManagementHeader({ filter, setFilter }) {
  return (
    <header className="mb-6">
      <h1 className="text-2xl font-playfair font-semibold text-gray-900">
        Vendor Management
      </h1>
      <p className="text-base font-raleway text-gray-500 mt-2">
        Manage and approve vendor accounts
      </p>

      <div className="mt-6 inline-flex rounded-lg bg-white border border-gray-100 shadow-sm p-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm ${
            filter === "all" ? "bg-[#A7B9A6] text-white" : "text-gray-600"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("approved")}
          className={`px-4 py-2 rounded-lg text-sm ${
            filter === "approved" ? "bg-[#A7B9A6] text-white" : "text-gray-600"
          }`}
        >
          Approved
        </button>
        <button
          onClick={() => setFilter("reject")}
          className={`px-4 py-2 rounded-lg text-sm ${
            filter === "reject" ? "bg-[#A7B9A6] text-white" : "text-gray-600"
          }`}
        >
          Reject
        </button>
      </div>
    </header>
  );
}
