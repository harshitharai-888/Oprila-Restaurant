import MenuCard from "./MenuCard";
import AddMenuCard from "./AddMenuCard";

const menuItems = [
  {
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
    title: "Heritage Burrata",
    description: "Aged balsamic, basil oil, heirloom tomatoes...",
    price: "$18.50",
    available: true,
  },
  {
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800",
    title: "Wild Salmon Tartare",
    description: "Hand-cut Atlantic salmon, capers...",
    price: "$22.00",
    available: true,
  },
  {
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
    title: "Roasted Bone Marrow",
    description: "Roasted veal bone, shallot marmalade...",
    price: "$19.00",
    available: false,
    soldOut: true,
    actionText: "Restock Log",
  },
];

export default function CategorySection() {
  return (
    <section className="mt-8">
      {/* Category Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-[28px] font-bold text-[#1F1F1F]">
            Appetizers
          </h2>

          <span className="text-sm text-gray-500">
            ({menuItems.length} items)
          </span>
        </div>

        <button className="text-sm text-gray-500 hover:text-black transition">
          Reorder Category =
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <MenuCard
            key={item.title}
            image={item.image}
            title={item.title}
            description={item.description}
            price={item.price}
            available={item.available}
            soldOut={item.soldOut}
            actionText={item.actionText}
          />
        ))}

        <AddMenuCard />
      </div>
    </section>
  );
}