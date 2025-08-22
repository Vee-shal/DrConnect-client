"use client";
import React, { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { _makePostRequest } from "@/app/lib/api/api";
import { endpoints } from "@/app/lib/api/endpoints";
import { useAuthStore } from "@/app/lib/store/authStore";

const ProfileUpload: React.FC<{ onUpload?: (url: string) => void }> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  const handleClick = () => fileInputRef.current?.click();



  
  // Ensure photo from store is reflected after hydration
  useEffect(() => {
    if (isHydrated && user?.profilePhoto) {
      setImageUrl(user.profilePhoto);
    }
  }, [isHydrated, user?.profilePhoto]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    if (!user?.email) {
      toast.error("Email not found. Please login again.");
      return;
    }

    const file = e.target.files[0];
    setLoading(true);
    toast.loading("Uploading profile image...", { id: "uploadToast" });

    try {
      const formData = new FormData();
      formData.append("profile", file);
      formData.append("email", user.email); // send email to backend

      const res = await _makePostRequest(endpoints.PROFILE.UPDATE_PHOTO, formData);

      if (res.success && res.imageUrl) {
        setImageUrl(res.imageUrl);
        if (user) {
          // Update Zustand store
          setUser({ ...user, profilePhoto: res.imageUrl });
        }

        toast.success("Profile uploaded successfully!", { id: "uploadToast" });
        if (onUpload) onUpload(res.imageUrl);
      } else {
        throw new Error(res.message || "Failed to upload profile image");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Upload failed", { id: "uploadToast" });
    } finally {
      setLoading(false);
    }
  };

  if (!isHydrated) return null; // wait for store hydration

   return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        {/* Profile Circle */}
        <div
          className="p-4 bg-[#00c37a]/10 border border-[#00c37a]/20 rounded-full cursor-pointer hover:scale-105 transition-transform"
          onClick={handleClick}
        >
          <img
            src={imageUrl || "/default-profile.png"}
            alt="Profile"
            className="h-16 w-16 rounded-full object-cover"
          />
        </div>

        {/* + Icon Overlay */}
        <div
          className="absolute -bottom-1 -right-1 bg-[#00c37a] text-white rounded-full p-1 cursor-pointer shadow-lg hover:scale-110 transition-transform"
          onClick={handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>

      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleChange}
        accept="image/*"
      />

      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Account Profile</h2>
        <p className="text-[#00c37a] text-sm mt-1">
          Manage your professional information and settings
        </p>
      </div>
    </div>
  );
};

export default ProfileUpload;
