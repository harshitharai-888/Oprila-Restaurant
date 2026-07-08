"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import TopBar from "../components/Temp";
import MenuHeader from "../components/MenuHeader";
import CategorySection from "../components/CategorySection";
import MainsSection from "../components/MainSection";

import { getMenu, MenuCategory } from "../menu/service/menuservice";

export default function MenuPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const data = await getMenu();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      }
    }

    fetchMenu();
  }, []);

  const starters = categories.find(
    (category) => category.name === "Starters"
  );

  const mains = categories.find(
    (category) => category.name === "Mains"
  );

  return (
    <div className="min-h-screen bg-[#F7F6F3] xl:flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <TopBar
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <div className="p-4 md:p-6">
          <MenuHeader />

          {starters && (
            <CategorySection items={starters.items} />
          )}

          {mains && (
            <MainsSection items={mains.items} />
          )}
        </div>
      </main>
    </div>
  );
}