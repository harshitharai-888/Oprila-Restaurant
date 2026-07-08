import TopBar from "../components/Temp";
import MenuHeader from "../components/MenuHeader";
import CategorySection from "../components/CategorySection";
import MainsSection from "../components/MainSection";
import Sidebar from "../../components/Sidebar";

export default function MenuPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="flex-1 px-6 py-6">
        <TopBar />

        <div className="p-6 bg-white">
          <MenuHeader />
          <CategorySection />
          <MainsSection />
        </div>
      </main>
    </div>
  );
}