import { useState } from "react";
import { Check, Pencil, Trash2, X } from "lucide-react";

const PackagesPricingSection = ({ packages }) => {
  const [isAddPriceModalOpen, setIsAddPriceModalOpen] = useState(false);

  return (
    <>
      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-playfair text-2xl text-[#2b221d]">
            Packages & Pricing
          </h2>
          <button
            type="button"
            onClick={() => setIsAddPriceModalOpen(true)}
            className="rounded-lg shadow-sm bg-[#B9C7B8] px-3 py-2 text-sm text-white font-normal"
          >
            + Add Price
          </button>
        </div>

        <div className="grid gap-3 xl:grid-cols-3">
          {packages.map((item) => (
            <article
              key={item.name}
              className={`flex h-full flex-col rounded-xl border p-5 shadow-sm ${
                item.featured
                  ? "border-[#464E46] bg-[#464E46] text-white"
                  : "border-gray-100 bg-white text-gray-900"
              }`}
            >
              <div className="mt-8">
                <h3 className="text-2xl font-playfair font-semibold">
                  {item.name}
                </h3>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-4xl font-playfair font-semibold">
                    {item.price}
                  </span>
                  <span
                    className={`pb-1 text-base ${item.featured ? "text-white/70" : "text-gray-500"}`}
                  >
                    / month
                  </span>
                </div>
                <p
                  className={`mt-3 text-base leading-6 ${item.featured ? "text-white/80" : "text-gray-500"}`}
                >
                  {item.subtitle}
                </p>
              </div>

              <div
                className={`my-5 border-t ${item.featured ? "border-white/20" : "border-gray-200"}`}
              />

              <ul className="space-y-2 text-base">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check size={14} className="mt-0.5 text-[#1FB356]" />
                    <span
                      className={
                        item.featured ? "text-white/90" : "text-gray-700"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto grid grid-cols-2 gap-2 pt-6">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#A7B9A6] px-3 py-2 text-sm text-white"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  type="button"
                  className={`inline-flex items-center justify-center gap-2 rounded-sm border px-3 py-2 text-sm ${
                    item.featured
                      ? "border-white/35 text-white"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {isAddPriceModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-3"
          onClick={() => setIsAddPriceModalOpen(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-xl bg-[#f5f5f5] shadow-xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="New Subscription"
          >
            <div className="flex items-center justify-between border-b border-[#dfdfdf] px-5 py-4">
              <h3 className="font-playfair text-xl leading-none text-[#3e3e3e] sm:text-[40px]">
                New Subscription
              </h3>
              <button
                type="button"
                onClick={() => setIsAddPriceModalOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#efefef] text-[#777777]"
                aria-label="Close modal"
              >
                <X size={17} />
              </button>
            </div>

            <form className="space-y-4 px-5 py-4">
              <div>
                <label
                  htmlFor="subscriptionTitle"
                  className="mb-1.5 block text-base leading-none text-[#333333]"
                >
                  Subscription Tittle
                </label>
                <input
                  id="subscriptionTitle"
                  type="text"
                  placeholder="Enter Subscription tittle here"
                  className="h-11 w-full rounded-lg border border-transparent bg-[#e1e1e1] px-3 text-sm text-[#5f5f5f] outline-none placeholder:text-[#989898] focus:border-[#c9c9c9]"
                />
              </div>

              <div>
                <label
                  htmlFor="subscriptionDescription"
                  className="mb-1.5 block text-base leading-none text-[#333333]"
                >
                  Subscription Description
                </label>
                <textarea
                  id="subscriptionDescription"
                  rows={4}
                  placeholder="Description"
                  className="w-full rounded-lg border border-transparent bg-[#e1e1e1] px-3 py-2.5 text-sm text-[#5f5f5f] outline-none placeholder:text-[#989898] focus:border-[#c9c9c9]"
                />
              </div>

              <div>
                <label
                  htmlFor="validFor"
                  className="mb-1.5 block text-base leading-none text-[#333333]"
                >
                  Valid For
                </label>
                <input
                  id="validFor"
                  type="text"
                  placeholder="1 Month"
                  className="h-11 w-full rounded-lg border border-transparent bg-[#e1e1e1] px-3 text-sm text-[#5f5f5f] outline-none placeholder:text-[#989898] focus:border-[#c9c9c9]"
                />
              </div>

              <div>
                <label
                  htmlFor="includedItems"
                  className="mb-1.5 block text-base leading-none text-[#333333]"
                >
                  What's include
                </label>
                <textarea
                  id="includedItems"
                  rows={4}
                  placeholder="write what's include"
                  className="w-full rounded-lg border border-transparent bg-[#e1e1e1] px-3 py-2.5 text-sm text-[#5f5f5f] outline-none placeholder:text-[#989898] focus:border-[#c9c9c9]"
                />
              </div>

              <div>
                <label
                  htmlFor="subscriptionPrice"
                  className="mb-1.5 block text-base leading-none text-[#333333]"
                >
                  Price
                </label>
                <input
                  id="subscriptionPrice"
                  type="text"
                  placeholder="$0.00"
                  className="h-11 w-full rounded-lg border border-transparent bg-[#e1e1e1] px-3 text-sm text-[#5f5f5f] outline-none placeholder:text-[#989898] focus:border-[#c9c9c9]"
                />
              </div>

              <button
                type="button"
                className="rounded-lg bg-[#A7B9A6] px-5 py-2.5 text-base leading-none text-white"
              >
                Add Packages
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PackagesPricingSection;
