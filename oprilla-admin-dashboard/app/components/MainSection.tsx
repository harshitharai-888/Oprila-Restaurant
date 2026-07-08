import FeaturedCard from "./TempFeaturedCard";
import MenuCard from "./MenuCard";

const menuItems = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
    title: "Black Truffle Tagliatelle",
    description: "House-made pasta, winter black truffle...",
    price: "$32.00",
    available: true,
    actionText: "Sales",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800",
    title: "Grilled Branzino",
    description: "Sustainably sourced, lemon-herb stuffing...",
    price: "$45.00",
    available: true,
    actionText: "Sales",
  },
];

export default function MainsSection() {
  return (
    <section className="mt-14">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-[28px] font-bold text-[#1F1F1F]">
            Mains
          </h2>

          <span className="text-sm text-gray-500">
            (18 items)
          </span>
        </div>

        <button className="text-sm text-gray-500 hover:text-black transition">
          Reorder Category =
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <FeaturedCard
          image="https://images.unsplash.com/photo-1544025162-d76694265947?w=800"
          title="Dry-Aged Prime Ribeye"
          description="45-day dry aged in house. Served with confit garlic, tallow butter, and smoked salt. Our best-selling steak cut for the current quarter."
          price="$68.00"
        />

        {menuItems.map((item) => (
          <MenuCard
            key={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
            price={item.price}
            available={item.available}
            actionText={item.actionText}
          />
        ))}
      </div>
    </section>
  );
}