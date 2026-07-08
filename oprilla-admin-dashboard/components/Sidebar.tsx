"use client";

import {
  Settings,
  CircleHelp,
} from "lucide-react";

import NavItem from "@/app/dashboard/components/NavItem";

import {
  RESTAURANT_NAME,
  SUBTITLE,
  NAV_ITEMS,
} from "@/app/dashboard/constants/dashboardConstants";

export default function Sidebar() {
  return (
    <aside className="w-full lg:w-[280px] bg-[#F7F6F3] border-r border-gray-200 flex flex-col justify-between px-9 py-8">

      <div>

        <div className="mb-16">
          <h1 className="text-[28px] font-serif font-semibold text-[#2C2C2C]">
            {RESTAURANT_NAME}
          </h1>

          <p className="text-[11px] tracking-[3px] uppercase text-gray-400 mt-2">
            {SUBTITLE}
          </p>
        </div>

       <nav>
          <ul className="space-y-10">
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                active={item.active}
              />
            ))}
          </ul>
        </nav>

      </div>

      <div>

        <div className="border-t border-gray-300 mb-8"></div>

        <button className="w-full bg-black text-white py-4 rounded-xl text-sm mb-10">
          Quick Booking
        </button>

        <div className="flex items-center gap-4 text-gray-500 text-[15px] mb-6">
          <Settings size={18} />
          <span>Settings</span>
        </div>

        <div className="flex items-center gap-4 text-gray-500 text-[15px]">
          <CircleHelp size={18} />
          <span>Support</span>
        </div>

      </div>

    </aside>
  );
}