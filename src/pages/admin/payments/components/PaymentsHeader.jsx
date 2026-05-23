import { ChevronDown, Filter } from "lucide-react";

export default function PaymentsHeader({ filter, setFilter }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-xl sm:text-2xl font-playfair font-semibold text-gray-900">
          Payments
        </h1>
        <p className="mt-2 text-base font-raleway text-gray-400">
          Monitor vendor subscription revenues and billing activity
        </p>
      </div>

      <label className="inline-flex items-center gap-2 self-start rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 shadow-sm">
        <Filter size={14} />
        <span>Filter:</span>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="appearance-none bg-transparent pr-6 outline-none"
        >
          <option>Active</option>
          <option>All</option>
          <option>Expired</option>
        </select>
        <ChevronDown size={14} className="text-gray-400" />
      </label>
    </div>
  );
}
