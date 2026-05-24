import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const Profile = () => {
  const { user } = useUser();
  const [appCount, setAppCount] = useState(0);
  const [loadingApps, setLoadingApps] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    const fetchApps = async () => {
      try {
        const snap = await getDocs(
          collection(db, "applications", user.id, "jobs")
        );
        setAppCount(snap.size);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      } finally {
        setLoadingApps(false);
      }
    };
    fetchApps();
  }, [user?.id]);

  const name = user?.fullName || user?.firstName || "User";
  const email = user?.primaryEmailAddress?.emailAddress || "—";
  const avatar = user?.imageUrl;

  const stats = [
    {
      label: "Jobs Applied",
      value: loadingApps ? "—" : appCount,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      bg: "bg-blue-50",
      text: "text-[#3985b6]",
      border: "border-blue-100",
    },
    {
      label: "Profile Views",
      value: "0",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      bg: "bg-purple-50",
      text: "text-purple-500",
      border: "border-purple-100",
    },
    {
      label: "Profile Unlocks",
      value: "0",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      ),
      bg: "bg-emerald-50",
      text: "text-emerald-500",
      border: "border-emerald-100",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full flex flex-col">
      {/* Top accent band — mirrors the Generate card */}
      <div className="bg-linear-to-br from-[#eaf4fb] to-[#d6eaf7] px-5 pt-5 pb-4 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-[#3985b6]/[0.07]" />
        <div className="absolute right-5 top-4 w-10 h-10 rounded-full bg-[#3985b6]/5" />

        {/* Avatar + identity */}
        <div className="relative z-10 flex items-center gap-3">
          {avatar ? (
            <img
              src={avatar}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#3985b6] flex items-center justify-center text-white font-bold text-lg ring-2 ring-white shadow-sm">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="font-semibold text-gray-800 text-[15px] truncate leading-snug">{name}</p>
            <p className="text-[11.5px] text-[#7aabbf] truncate mt-0.5">{email}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
          {/* Two column: stats left, image right */}
          <div className="px-5 py-4 flex items-center gap-3 flex-1">
              {/* Stats column */}
              <div className="flex flex-col gap-2.5 flex-1 min-w-0">
                  <p className="text-[10px] font-semibold tracking-widest text-gray-300 uppercase mb-0.5">
                      Activity
                  </p>
                  {stats.map((stat) => (
                      <div
                          key={stat.label}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-xl border ${stat.bg} ${stat.border}`}
                      >
                          <div className={`flex items-center gap-2 ${stat.text}`}>
                              {stat.icon}
                              <span className="text-[12.5px] font-medium text-gray-600">{stat.label}</span>
                          </div>
                          <span className={`text-sm font-bold ${stat.text}`}>{stat.value}</span>
                      </div>
                  ))}
              </div>

              {/* Decorative image column — hidden on mobile */}
              <div className="hidden sm:flex items-center justify-center w-28 shrink-0">
                  <img
                      src="https://d2u6422zz9hxmk.cloudfront.net/Assets/Analyze-bro.png"
                      alt=""
                      className="w-full opacity-80"
                  />
              </div>
          </div>
    </div>
  );
};

export default Profile;
