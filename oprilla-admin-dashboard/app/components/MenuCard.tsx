import { TrendingUp } from "lucide-react";

type MenuCardProps = {
  image: string;
  title: string;
  description: string;
  price: string;
  available?: boolean;
  soldOut?: boolean;
  actionText?: string;
};


import { BarChart3,RotateCcw } from "lucide-react";
export default function MenuCard({
  image,
  title,
  description,
  price,
  available = true,
  soldOut = false,
  actionText = "View Sales",
}: MenuCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition h-[260px] flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-24 object-cover"
        />

        {/* SOLD OUT Badge */}
        {soldOut && (
          <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-md text-[10px] font-semibold z-20">
            SOLD OUT
          </div>
        )}

        {/* Price */}
        <div className="absolute top-3 right-3 bg-white text-black px-3 py-1 rounded-lg shadow-md font-bold text-sm z-20">
          {price}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div className="flex justify-between items-start gap-3">
          <h3 className="font-bold text-lg text-[#1F1F1F] leading-6">
            {title}
          </h3>

          

            <button
              className={`mt-1 w-9 h-5 rounded-full relative transition ${
                available ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition ${
                  available ? "left-4" : "left-0.5"
                }`}
              />
            </button>
          </div>
        

        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {description}
        </p>

        <div className="flex justify-between items-center pt-3 border-t border-gray-200">

  <div className="flex items-center gap-1 text-xs text-gray-500">

    {actionText === "Restock Log" ? (
      <>
        <RotateCcw className="w-3 h-3" />
        <span>Restock Log</span>
      </>
    ) : (
      <>
        <BarChart3 className="w-3 h-3" />
        <span>View Sales</span>
      </>
    )}

  </div>

  <button className="border border-gray-300 rounded-md px-3 py-1 text-xs text-gray-700 hover:bg-gray-100">
    Edit
  </button>

</div>
          

      </div>
      </div>
    
    
  );
}