
import MenuCard from "./MenuCard";
import { MenuItem } from "../menu/service/menuservice";

interface MainsSectionProps {
  items: MenuItem[];
}

export default function MainsSection({ items }: MainsSectionProps) {
  return (
    <section className="mt-14">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-[28px] font-bold text-[#1F1F1F]">
            Mains
          </h2>

          <span className="text-sm text-gray-500">
            ({items.length} items)
          </span>
        </div>

        <button className="text-sm text-gray-500 hover:text-black transition">
          Reorder Category
        </button>
      </div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <MenuCard
            key={item.id}
            image={item.imageUrl}
            title={item.name}
            description={item.description}
            price={`$${item.price}`}
            available={item.isAvailable}
            actionText="View Sales"
          />
        ))}
      </div>
    </section>
  );
}