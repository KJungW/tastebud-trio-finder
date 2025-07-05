
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
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    onToggle(id);
  };

  return (
    <div
      className={`
        p-4 rounded-lg border-2 transition-all duration-200
        ${isExcluded 
          ? 'border-gray-300 bg-gray-100 opacity-50' 
          : 'border-gray-200 bg-white'
        }
      `}
    >
      <div className="flex items-center space-x-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <h3 className={`font-medium ${isExcluded ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
            {name}
          </h3>
          <p className={`text-xs ${isExcluded ? 'text-gray-400' : 'text-gray-600'}`}>
            {description}
          </p>
        </div>
        <div 
          onClick={handleCheckboxClick}
          className={`
            w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-200
            ${isExcluded 
              ? 'border-gray-400 bg-gray-400 hover:bg-gray-500 hover:border-gray-500' 
              : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50'
            }
          `}
        >
          {isExcluded && (
            <span className="text-white text-xs">✕</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
