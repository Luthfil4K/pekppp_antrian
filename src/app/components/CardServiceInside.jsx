"use client";

export default function CardServiceInside({
  icon,
  name,
  description,
  onClick,
  isSelected,
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative rounded-2xl p-4 transition-all duration-300 text-left
        ${isSelected 
          ? "border-2 border-orange-500 bg-orange-50 shadow-lg scale-105" 
          : "border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:border-orange-400 hover:shadow-lg hover:scale-105"
        }
      `}
    >
      <div className="text-4xl mb-3 text-center transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      <div className="min-h-16 flex flex-col justify-between">
        <h3 className="font-bold text-gray-800 text-sm leading-tight group-hover:text-orange-600 transition-colors">
          {name}
        </h3>
        <p className="text-gray-500 text-xs mt-1 line-clamp-2">
          {description}
        </p>
      </div>
    </button>
  );
}