
import React from 'react';

interface MenuCardProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  isExcluded: boolean;
  onToggle: (id: string) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({
  id,
  name,
  icon,
  description,
  isExcluded,
  onToggle
}) => {
  return (
    <div
      onClick={() => onToggle(id)}
      className={`
        p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md
        ${isExcluded 
          ? 'border-red-300 bg-red-50 opacity-60' 
          : 'border-gray-200 bg-white hover:border-orange-300'
        }
      `}
    >
      <div className="flex items-center space-x-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <h3 className={`font-medium ${isExcluded ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
            {name}
          </h3>
          <p className={`text-xs ${isExcluded ? 'text-gray-400' : 'text-gray-600'}`}>
            {description}
          </p>
        </div>
        <div className={`
          w-6 h-6 rounded-full border-2 flex items-center justify-center
          ${isExcluded 
            ? 'border-red-400 bg-red-400' 
            : 'border-gray-300 hover:border-orange-400'
          }
        `}>
          {isExcluded && (
            <span className="text-white text-xs">✕</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
