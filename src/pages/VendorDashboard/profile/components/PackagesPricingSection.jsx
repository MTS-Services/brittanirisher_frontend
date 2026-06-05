import { useEffect, useState } from "react";
import { Check, Pencil, Trash2, X, AlertTriangle } from "lucide-react";
import {
  useCreateVendorPackageMutation,
  useDeleteVendorPackageMutation,
  useGetVendorPackageByIdQuery,
  useUpdateVendorPackageMutation,
} from "../../../../store/features/vendor/vendorDashboardApi";

/* ─────────────────────────────────────────
   Delete Confirm Modal
───────────────────────────────────────── */
const DeleteConfirmModal = ({ onConfirm, onCancel, isDeleting }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-3"
    onClick={onCancel}
    role="presentation"
  >
    <div
      className="w-full max-w-sm overflow-hidden rounded-xl bg-[#f5f5f5] shadow-xl"
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-between border-b border-[#dfdfdf] px-5 py-4">
        <h3 className="font-playfair text-xl leading-none text-[#3e3e3e]">
          Delete Package
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#efefef] text-[#777777]"
          aria-label="Close modal"
        >
          <X size={17} />
        </button>
      </div>

      <div className="px-5 py-6">
        <div className="mb-5 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle size={18} className="text-red-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#333333]">
              Are you sure you want to delete this package?
            </p>
            <p className="mt-1 text-sm text-[#888888]">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="rounded-lg border border-[#d5d5d5] bg-white px-4 py-2 text-sm text-[#555555] transition hover:bg-[#f0f0f0] disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white transition hover:bg-red-600 disabled:opacity-60"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   Package Modal (Add / Edit)
───────────────────────────────────────── */
const PackageModal = ({ editPackageId, onClose }) => {
  const isEditMode = Boolean(editPackageId);

  const [packageName, setPackageName] = useState("");
  const [price, setPrice] = useState("");
  const [badge, setBadge] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [featuresText, setFeaturesText] = useState("");

  const {
    data: response,
    isLoading: isFetching,
  } = useGetVendorPackageByIdQuery(editPackageId, {
    skip: !isEditMode,
  });

  const [createVendorPackage, { isLoading: isCreating }] = useCreateVendorPackageMutation();
  const [updateVendorPackage, { isLoading: isUpdating }] = useUpdateVendorPackageMutation();

  const isSubmitting = isCreating || isUpdating;

  useEffect(() => {
    if (!isEditMode) {
      setPackageName("");
      setPrice("");
      setBadge("");
      setShortDescription("");
      setFeaturesText("");
      return;
    }

    if (response) {
      const pkg = response?.data ?? response?.package ?? response;
      if (!pkg || typeof pkg !== "object") return;

      setPackageName(pkg.packageName ?? "");
      setPrice(String(pkg.price ?? ""));
      setBadge(pkg.badge ?? "");
      setShortDescription(pkg.shortDescription ?? "");
      setFeaturesText(Array.isArray(pkg.features) ? pkg.features.join("\n") : "");
    }
  }, [response, isEditMode, editPackageId]);

  const handleSubmit = async () => {
    const features = featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      packageName,
      price: parseFloat(price) || 0,
      badge,
      shortDescription,
      features,
    };

    try {
      if (isEditMode) {
        await updateVendorPackage({ id: editPackageId, body: payload }).unwrap();
      } else {
        await createVendorPackage(payload).unwrap();
      }
      onClose();
    } catch (error) {
      console.error("Package save failed:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-3"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-xl bg-[#f5f5f5] shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-[#dfdfdf] px-5 py-4">
          <h3 className="font-playfair text-xl leading-none text-[#3e3e3e] sm:text-2xl">
            {isEditMode ? "Edit Package" : "New Package"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#efefef] text-[#777777]"
            aria-label="Close modal"
          >
            <X size={17} />
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto">
          {isEditMode && isFetching ? (
            <div className="flex items-center justify-center py-12 text-sm text-[#888888]">
              Loading...
            </div>
          ) : (
            <div className="space-y-4 px-5 py-4">
              <div>
                <label
                  htmlFor="packageName"
                  className="mb-1.5 block text-base leading-none text-[#333333]"
                >
                  Package Name
                </label>
                <input
                  id="packageName"
                  type="text"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  placeholder="Enter package name"
                  className="h-11 w-full rounded-lg border border-transparent bg-[#e1e1e1] px-3 text-sm text-[#5f5f5f] outline-none placeholder:text-[#989898] focus:border-[#c9c9c9]"
                />
              </div>

              <div>
                <label
                  htmlFor="shortDescription"
                  className="mb-1.5 block text-base leading-none text-[#333333]"
                >
                  Short Description
                </label>
                <textarea
                  id="shortDescription"
                  rows={3}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Enter short description"
                  className="w-full rounded-lg border border-transparent bg-[#e1e1e1] px-3 py-2.5 text-sm text-[#5f5f5f] outline-none placeholder:text-[#989898] focus:border-[#c9c9c9]"
                />
              </div>

              <div>
                <label
                  htmlFor="badge"
                  className="mb-1.5 block text-base leading-none text-[#333333]"
                >
                  Badge
                </label>
                <input
                  id="badge"
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="e.g. Best Seller"
                  className="h-11 w-full rounded-lg border border-transparent bg-[#e1e1e1] px-3 text-sm text-[#5f5f5f] outline-none placeholder:text-[#989898] focus:border-[#c9c9c9]"
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="mb-1.5 block text-base leading-none text-[#333333]"
                >
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="h-11 w-full rounded-lg border border-transparent bg-[#e1e1e1] px-3 text-sm text-[#5f5f5f] outline-none placeholder:text-[#989898] focus:border-[#c9c9c9]"
                />
              </div>

              <div>
                <label
                  htmlFor="features"
                  className="mb-1.5 block text-base leading-none text-[#333333]"
                >
                  Features
                  <span className="ml-1.5 text-xs text-[#989898]">(one per line)</span>
                </label>
                <textarea
                  id="features"
                  rows={4}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder={"2 Photographers\n1 Cinematographer\nUnlimited Shots"}
                  className="w-full rounded-lg border border-transparent bg-[#e1e1e1] px-3 py-2.5 text-sm text-[#5f5f5f] outline-none placeholder:text-[#989898] focus:border-[#c9c9c9]"
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="rounded-lg bg-[#A7B9A6] px-5 py-2.5 text-base leading-none text-white transition hover:bg-[#8fa48e] disabled:opacity-60"
              >
                {isSubmitting
                  ? isEditMode ? "Updating..." : "Adding..."
                  : isEditMode ? "Update Package" : "Add Package"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   Packages & Pricing Section
───────────────────────────────────────── */
const PackagesPricingSection = ({ packages }) => {
  const [modalState, setModalState] = useState({ open: false, editId: null });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  const [deleteVendorPackage, { isLoading: isDeleting }] = useDeleteVendorPackageMutation();

  const handleOpenAdd = () => setModalState({ open: true, editId: null });

  const handleOpenEdit = (id) => {
    if (!id) return;
    setModalState({ open: true, editId: id });
  };

  const handleClose = () => setModalState({ open: false, editId: null });

  const handleDeleteClick = (id) => setDeleteConfirm({ open: true, id });

  const handleDeleteCancel = () => setDeleteConfirm({ open: false, id: null });

  const handleDeleteConfirm = async () => {
    try {
      await deleteVendorPackage(deleteConfirm.id).unwrap();
      setDeleteConfirm({ open: false, id: null });
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <>
      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-playfair text-2xl lg:text-3xl text-[#2b221d]">
            Packages & Pricing
          </h2>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="rounded-lg shadow-sm bg-[#B9C7B8] px-3 py-2 text-sm text-white font-normal"
          >
            + Add Price
          </button>
        </div>

        <div className="grid gap-3 xl:grid-cols-3">
          {packages?.map((item) => {
            const itemId = item._id ?? item.id;

            return (
              <article
                key={itemId}
                className={`flex h-full flex-col rounded-xl border p-5 shadow-sm ${
                  item.featured
                    ? "border-[#464E46] bg-[#464E46] text-white"
                    : "border-gray-100 bg-white text-gray-900"
                }`}
              >
                <div className="mt-8">
                  <h3 className="text-2xl font-playfair font-semibold">
                    {item.packageName}
                  </h3>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="text-4xl font-playfair font-semibold">
                      {item.price}
                    </span>
                    <span
                      className={`pb-1 text-base ${
                        item.featured ? "text-white/70" : "text-gray-500"
                      }`}
                    >
                      / month
                    </span>
                  </div>
                  <p
                    className={`mt-3 text-base leading-6 ${
                      item.featured ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    {item.shortDescription}
                  </p>
                </div>

                <div
                  className={`my-5 border-t ${
                    item.featured ? "border-white/20" : "border-gray-200"
                  }`}
                />

                <ul className="space-y-2 text-base">
                  {item.features?.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check size={14} className="mt-0.5 text-[#1FB356]" />
                      <span
                        className={item.featured ? "text-white/90" : "text-gray-700"}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto grid grid-cols-2 gap-2 pt-6">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(itemId)}
                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#A7B9A6] px-3 py-2 text-sm text-white"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteClick(itemId)}
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
            );
          })}
        </div>
      </section>

      {/* Package Add/Edit Modal */}
      {modalState.open && (
        <PackageModal
          key={modalState.editId ?? "add"}
          editPackageId={modalState.editId}
          onClose={handleClose}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm.open && (
        <DeleteConfirmModal
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
};

export default PackagesPricingSection;