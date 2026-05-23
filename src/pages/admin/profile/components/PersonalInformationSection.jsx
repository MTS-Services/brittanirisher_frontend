export default function PersonalInformationSection({
  personalInfo,
  onPersonalInfoChange,
  onSave,
}) {
  return (
    <section>
      <div className="space-y-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <h3 className="mb-5 text-xl md:text-2xl font-playfair font-semibold text-gray-900">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-base font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={personalInfo.fullName}
              onChange={onPersonalInfoChange}
              placeholder="MD. ismail Molla"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#A7B9A6] focus:bg-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-base font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={personalInfo.phone}
              onChange={onPersonalInfoChange}
              placeholder="(918) 655-0116"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#A7B9A6] focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-base font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={personalInfo.email}
            onChange={onPersonalInfoChange}
            placeholder="jackson.graham@example.com"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#A7B9A6] focus:bg-white"
          />
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={onSave}
            className="inline-flex rounded-lg bg-[#A7B9A6] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-95"
          >
            Save
          </button>
        </div>
      </div>
    </section>
  );
}
