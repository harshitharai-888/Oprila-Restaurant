"use client";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
import { Settings, CircleHelp, Menu, X } from "lucide-react";

import NavItem from "@/app/dashboard/components/NavItem";

import {
  RESTAURANT_NAME,
  SUBTITLE,
  NAV_ITEMS,
} from "@/app/dashboard/constants/dashboardConstants";

export default function Sidebar({
  isOpen,
  setIsOpen,
}: SidebarProps) {

  return (
    <>
      {/* Mobile + Tablet Header */}
      <div
        className={`xl:hidden fixed top-0 left-0 right-0 z-[60] bg-[#F7F6F3] border-b border-gray-200 px-6 py-4 ${
          isOpen ? "hidden" : "flex items-center"
        }`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="mr-4 text-[#B36A2E]"
        >
          <Menu size={30} />
        </button>

        <div>
          <h1 className="text-2xl font-serif font-semibold text-[#2C2C2C]">
            {RESTAURANT_NAME}
          </h1>

          <p className="text-[11px] tracking-[3px] uppercase text-gray-400 mt-1">
            {SUBTITLE}
          </p>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 xl:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0
          h-screen
          w-[85vw] max-w-[360px]
          bg-[#F7F6F3]
          border-r border-gray-200
          flex flex-col justify-between
          px-8 py-8
          z-50
          transform transition-transform duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full xl:translate-x-0"
          }
          xl:static xl:w-[280px]
        `}
      >
        {/* Logo + Close */}
        <div>
          <div className="flex items-start justify-between mb-14">
            <div>
              <h1 className="text-[28px] font-serif font-semibold text-[#2C2C2C]">
                {RESTAURANT_NAME}
              </h1>

              <p className="text-[11px] tracking-[3px] uppercase text-gray-400 mt-2">
                {SUBTITLE}
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="xl:hidden"
            >
              <X size={32} />
            </button>
          </div>

          {/* Navigation */}
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

        {/* Bottom */}
        <div>
          <div className="border-t border-gray-300 mb-8"></div>

          <button className="w-full bg-black text-white py-4 rounded-xl text-sm font-medium mb-10">
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
    </>
  );
}