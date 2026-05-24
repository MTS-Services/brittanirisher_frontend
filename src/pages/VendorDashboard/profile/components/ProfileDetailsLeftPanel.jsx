import { useEffect, useRef, useState } from "react";
import { Camera, ImagePlus } from "lucide-react";

const ProfileDetailsLeftPanel = ({ portfolio = [] }) => {
  const [portfolioImages, setPortfolioImages] = useState(portfolio);
  const fileInputRef = useRef(null);
  const createdImageUrlsRef = useRef([]);

  useEffect(() => {
    setPortfolioImages(portfolio);
  }, [portfolio]);

  useEffect(() => {
    return () => {
      createdImageUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (!selectedFiles.length) {
      return;
    }

    const uploadedImageUrls = selectedFiles.map((file) => {
      const imageUrl = URL.createObjectURL(file);
      createdImageUrlsRef.current.push(imageUrl);
      return imageUrl;
    });

    setPortfolioImages((prevImages) => [...prevImages, ...uploadedImageUrls]);
    event.target.value = "";
  };

  return (
    <div className="rounded-lg border border-[#e2e7e2] bg-[#f7f9f7] p-4 sm:p-5">
    <p className="text-[15px] font-semibold text-[#444a46]">Profile Photo</p>
    <div className="mt-2 flex items-center gap-3">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80"
          alt="Profile"
          className="h-14 w-14 rounded-full object-cover"
        />
        <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#cdd5cd] bg-white text-[#5f6661]">
          <Camera size={10} />
        </span>
      </div>
    </div>

    <div className="mt-4 space-y-3">
      <div>
        <label htmlFor="fullName" className="mb-1.5 block text-base font-medium text-[#3f4441]">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          defaultValue="Sarah Jhonsen"
          className="h-10 w-full rounded-md border border-transparent bg-[#e9eeea] px-3 text-sm text-[#5d635f] outline-none focus:border-[#b9c3b8]"
        />
      </div>
      <div>
        <label htmlFor="phoneNumber" className="mb-1.5 block text-base font-medium text-[#3f4441]">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="text"
          defaultValue="(201) 555-0124"
          className="h-10 w-full rounded-md border border-transparent bg-[#e9eeea] px-3 text-sm text-[#5d635f] outline-none focus:border-[#b9c3b8]"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-base font-medium text-[#3f4441]">
          Email
        </label>
        <input
          id="email"
          type="email"
          defaultValue="georgiayoung@example.com"
          className="h-10 w-full rounded-md border border-transparent bg-[#e9eeea] px-3 text-sm text-[#5d635f] outline-none focus:border-[#b9c3b8]"
        />
      </div>
      <div>
        <label htmlFor="about" className="mb-1.5 block text-base font-medium text-[#3f4441]">
          About
        </label>
        <textarea
          id="about"
          defaultValue="Sarah is a owner of a photography and wedding management company. She has a lot of positive reviews and completed 1500+ Wedding events since 2014."
          className="min-h-22 w-full resize-none rounded-md border border-transparent bg-[#e9eeea] px-3 py-2.5 text-sm leading-5 text-[#5d635f] outline-none focus:border-[#b9c3b8]"
        />
      </div>
    </div>

    <div className="mt-5">
      <p className="mb-2 text-[30px] font-semibold capitalize text-[#2e322f] sm:text-[32px]">
        portfolio
      </p>
      <div className="grid grid-cols-3 gap-2">
        {portfolioImages.map((photo, index) => (
          <img
            key={`${photo}-${index}`}
            src={photo}
            alt={`Portfolio ${index + 1}`}
            className="h-24 w-full rounded-md object-cover"
          />
        ))}
        <button
          type="button"
          onClick={handleAddImageClick}
          className="flex h-24 items-center justify-center rounded-md border border-dashed border-[#c0c8bf] bg-[#edf1ed] text-[#475247]"
        >
          <span className="flex flex-col items-center gap-1 text-[16px] font-medium">
            <ImagePlus size={18} />
            Add Another Image
          </span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
    </div>
  );
};

export default ProfileDetailsLeftPanel;
