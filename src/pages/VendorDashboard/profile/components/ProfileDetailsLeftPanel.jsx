import { useEffect, useRef, useState } from "react";
import { Camera, ImagePlus, X, RefreshCw } from "lucide-react";
import { API_CONFIG } from "../../../../config";
import {
  useUpdateVendorProfileMutation,
  useDeletePortfolioImageMutation,
} from "../../../../store/features/vendor/vendorDashboardApi";

const ProfileDetailsLeftPanel = ({ vendor }) => {
  const defaultProfileImage = "../../../../../public/dummy-profile.jpg";

  const getImageUrl = (url) => {
    if (!url) return defaultProfileImage;
    if (
      url.startsWith("blob:") ||
      url.startsWith("http://") ||
      url.startsWith("https://")
    )
      return url;
    return `${API_CONFIG.BASE_URL}${url}`;
  };

  const [profileImage, setProfileImage] = useState(
    vendor?.profileImage || defaultProfileImage,
  );
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [portfolioImages, setPortfolioImages] = useState(
    vendor?.portfolioImages || [],
  );
  const [newPortfolioFiles, setNewPortfolioFiles] = useState([]);
  const [replaceTarget, setReplaceTarget] = useState(null); // { id, index }
  const [name, setName] = useState(vendor?.name || "");
  const [phone, setPhone] = useState(vendor?.phone || "");
  const [email, setEmail] = useState(vendor?.email || "");
  const [aboutMe, setAboutMe] = useState(vendor?.aboutMe || "");

  const profileImageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const replaceInputRef = useRef(null);
  const createdProfileImageRef = useRef(null);
  const createdImageUrlsRef = useRef([]);

  const [updateVendorProfile, { isLoading }] = useUpdateVendorProfileMutation();
  const [deletePortfolioImage] = useDeletePortfolioImageMutation();

  useEffect(() => {
    setProfileImage(vendor?.profileImage || defaultProfileImage);
    setPortfolioImages(vendor?.portfolioImages || []);
    setName(vendor?.name || "");
    setPhone(vendor?.phone || "");
    setEmail(vendor?.email || "");
    setAboutMe(vendor?.aboutMe || "");
  }, [vendor]);

  useEffect(() => {
    return () => {
      if (createdProfileImageRef.current)
        URL.revokeObjectURL(createdProfileImageRef.current);
      createdImageUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  // ── Profile Image ──────────────────────────────────────────
  const handleProfileImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (createdProfileImageRef.current)
      URL.revokeObjectURL(createdProfileImageRef.current);
    const blobUrl = URL.createObjectURL(file);
    createdProfileImageRef.current = blobUrl;
    setProfileImage(blobUrl);
    setProfileImageFile(file);
    event.target.value = "";
  };

  // ── Portfolio: Add ─────────────────────────────────────────
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    const newImages = files.map((file) => {
      const blobUrl = URL.createObjectURL(file);
      createdImageUrlsRef.current.push(blobUrl);
      return { id: null, mediaUrl: blobUrl, file };
    });
    setPortfolioImages((prev) => [...prev, ...newImages]);
    setNewPortfolioFiles((prev) => [...prev, ...files]);
    event.target.value = "";
  };

  // ── Portfolio: Delete ──────────────────────────────────────
  const handleDeleteImage = async (photo, index) => {
    if (photo.id) {
      try {
        await deletePortfolioImage(photo.id).unwrap();
        setPortfolioImages((prev) => prev.filter((_, i) => i !== index));
      } catch (error) {
        console.error("Delete failed:", error);
      }
    } else {
      URL.revokeObjectURL(photo.mediaUrl);
      setPortfolioImages((prev) => prev.filter((_, i) => i !== index));
      setNewPortfolioFiles((prev) =>
        prev.filter((_, i) => {
          return prev[i] !== photo.file;
        }),
      );
    }
  };

  // ── Portfolio: Replace ─────────────────────────────────────
  const handleReplaceClick = (photo, index) => {
    setReplaceTarget({ id: photo.id, index });
    replaceInputRef.current?.click();
  };

  const handleReplaceImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !replaceTarget) return;

    const blobUrl = URL.createObjectURL(file);
    createdImageUrlsRef.current.push(blobUrl);

    if (replaceTarget.id) {
      try {
        await deletePortfolioImage(replaceTarget.id).unwrap();

        const formData = new FormData();
        formData.append("images", file);
        await updateVendorProfile(formData).unwrap();

        setPortfolioImages((prev) =>
          prev.map((img, i) =>
            i === replaceTarget.index
              ? { id: null, mediaUrl: blobUrl, file }
              : img,
          ),
        );
      } catch (error) {
        console.error("Replace failed:", error);
      }
    } else {
      setPortfolioImages((prev) =>
        prev.map((img, i) =>
          i === replaceTarget.index
            ? { id: null, mediaUrl: blobUrl, file }
            : img,
        ),
      );
    }

    setReplaceTarget(null);
    event.target.value = "";
  };

  // ── Main Save ──────────────────────────────────────────────
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("aboutMe", aboutMe);

      if (profileImageFile) {
        formData.append("profileImage", profileImageFile);
      }

      newPortfolioFiles.forEach((file) => {
        formData.append("images", file);
      });

      await updateVendorProfile(formData).unwrap();
      setProfileImageFile(null);
      setNewPortfolioFiles([]);
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  return (
    <div className="rounded-lg border border-[#e2e7e2] bg-[#f7f9f7] p-4 sm:p-5">
      {/* Profile Photo */}
      <p className="text-[15px] font-semibold text-[#444a46]">Profile Photo</p>
      <div className="mt-2 flex items-center gap-3">
        <div className="relative">
          <img
            src={getImageUrl(profileImage)}
            alt="Profile"
            className="h-28 w-28 rounded-full object-cover"
          />
          <button
            type="button"
            onClick={() => profileImageInputRef.current?.click()}
            className="absolute -bottom-1 -right-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#cdd5cd] bg-white text-[#5f6661]"
            aria-label="Upload profile image"
          >
            <Camera size={14} />
          </button>
        </div>
        <input
          ref={profileImageInputRef}
          type="file"
          accept="image/*"
          onChange={handleProfileImageUpload}
          className="hidden"
        />
      </div>

      {/* Form Fields */}
      <div className="mt-4 space-y-3">
        <div>
          <label
            htmlFor="fullName"
            className="mb-1.5 block text-base font-medium text-[#3f4441]"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-10 w-full rounded-md border border-transparent bg-[#e9eeea] px-3 text-sm text-[#5d635f] outline-none focus:border-[#b9c3b8]"
          />
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="mb-1.5 block text-base font-medium text-[#3f4441]"
          >
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-10 w-full rounded-md border border-transparent bg-[#e9eeea] px-3 text-sm text-[#5d635f] outline-none focus:border-[#b9c3b8]"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-base font-medium text-[#3f4441]"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 w-full rounded-md border border-transparent bg-[#e9eeea] px-3 text-sm text-[#5d635f] outline-none focus:border-[#b9c3b8]"
          />
        </div>
        <div>
          <label
            htmlFor="about"
            className="mb-1.5 block text-base font-medium text-[#3f4441]"
          >
            About
          </label>
          <textarea
            id="about"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            className="min-h-22 w-full resize-none rounded-md border border-transparent bg-[#e9eeea] px-3 py-2.5 text-sm leading-5 text-[#5d635f] outline-none focus:border-[#b9c3b8]"
          />
        </div>
      </div>

      {/* Portfolio */}
      <div className="mt-5">
        <p className="mb-2 text-[30px] font-semibold capitalize text-[#2e322f] sm:text-[32px]">
          portfolio
        </p>
        <div className="grid grid-cols-3 gap-2">
          {portfolioImages.map((photo, index) => (
            <div key={photo.id || index} className="relative h-24">
              <img
                src={getImageUrl(photo.mediaUrl)}
                alt={`Portfolio ${index + 1}`}
                className="h-full w-full rounded-md object-cover"
              />
              <div className="absolute right-1 top-1 flex gap-1">
                <button
                  type="button"
                  onClick={() => handleDeleteImage(photo, index)}
                  className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-white/40 bg-black/50 text-white transition hover:bg-red-500"
                  aria-label="Delete image"
                >
                  <X size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => handleReplaceClick(photo, index)}
                  className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-white/40 bg-black/50 text-white transition hover:bg-blue-500"
                  aria-label="Replace image"
                >
                  <RefreshCw size={18} />
                </button>
              </div>
            </div>
          ))}

          {/* Add New */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-24 items-center justify-center rounded-md border border-dashed border-[#c0c8bf] bg-[#edf1ed] text-[#475247]"
          >
            <span className="flex flex-col items-center gap-1 text-[16px] font-medium">
              <ImagePlus size={18} />
              Add Another Image
            </span>
          </button>
        </div>

        {/* Hidden inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
        <input
          ref={replaceInputRef}
          type="file"
          accept="image/*"
          onChange={handleReplaceImageUpload}
          className="hidden"
        />
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={isLoading}
        className="mt-5 rounded-md bg-[#9baf9a] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#839682] disabled:opacity-60"
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default ProfileDetailsLeftPanel;
