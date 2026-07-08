import { Bell, Moon,Plus,Sparkles } from "lucide-react";
import { Wand2 } from "lucide-react";

export default function TopBar() {
  return (
    <div className="h-16 bg-white border-b flex items-center justify-end px-8 gap-4">

      {/* Notification */}
      <div className="relative cursor-pointer">
        <Bell className="w-5 h-5 text-[#1F1F1F]" />

        {/* Red Notification Dot */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
      </div>

      {/* Dark Mode */}
      <Moon className="w-5 h-5 text-[#1F1F1F] cursor-pointer" />

       <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-black font-medium">
  <Plus className="w-4 h-4 text-black" />
  Add Category
</button>
      <button className="flex items-center gap-2 h-10 px-5 bg-black text-white rounded-lg text-sm font-medium">
  <Wand2 className="w-4 h-4" />
  Add New Item
</button>
    </div>
  );
}