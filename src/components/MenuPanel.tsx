
import React from 'react';
import MenuCard from './MenuCard';

interface MenuPanelProps {
  excludedMenus: string[];
  onMenuToggle: (menuId: string) => void;
}

const MenuPanel: React.FC<MenuPanelProps> = ({ excludedMenus, onMenuToggle }) => {
  const menuCategories = [
    { id: 'korean', name: '한식', icon: '🍚', description: '김치찌개, 불고기, 비빔밥 등' },
    { id: 'chinese', name: '중식', icon: '🥢', description: '짜장면, 짬뽕, 탕수육 등' },
    { id: 'japanese', name: '일식', icon: '🍣', description: '초밥, 라멘, 돈카츠 등' },
    { id: 'western', name: '양식', icon: '🍝', description: '파스타, 스테이크, 피자 등' },
    { id: 'thai', name: '태국음식', icon: '🌶️', description: '팟타이, 똠양꿍, 그린커리 등' },
    { id: 'indian', name: '인도음식', icon: '🍛', description: '커리, 난, 탄두리 등' },
    { id: 'mexican', name: '멕시칸', icon: '🌮', description: '타코, 부리또, 나초 등' },
    { id: 'fast', name: '패스트푸드', icon: '🍔', description: '햄버거, 치킨, 피자 등' },
  ];

  // 활성화된 메뉴만 필터링 (제외되지 않은 메뉴)
  const activeMenus = menuCategories.filter(category => !excludedMenus.includes(category.id));

  const handleCheckboxClick = (menuId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    onMenuToggle(menuId);
  };

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-2">메뉴 관리</h2>
        <p className="text-sm text-gray-600">
          선택 가능한 메뉴들을 확인해보세요
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {activeMenus.map(category => (
          <MenuCard
            key={category.id}
            id={category.id}
            name={category.name}
            icon={category.icon}
            description={category.description}
            isExcluded={false}
            onToggle={onMenuToggle}
          />
        ))}
        
        {/* 비활성화된 메뉴들을 블록 처리하여 표시 */}
        {excludedMenus.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">제외된 메뉴</h3>
            <div className="space-y-2">
              {excludedMenus.map(menuId => {
                const category = menuCategories.find(cat => cat.id === menuId);
                if (!category) return null;
                
                return (
                  <div
                    key={menuId}
                    className="p-4 rounded-lg border-2 border-gray-300 bg-gray-100 opacity-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{category.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-400 line-through">
                          {category.name}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {category.description}
                        </p>
                      </div>
                      <div 
                        onClick={(e) => handleCheckboxClick(menuId, e)}
                        className="w-6 h-6 rounded-full border-2 border-gray-400 bg-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-500 hover:border-gray-500 transition-all duration-200"
                      >
                        <span className="text-white text-xs">✕</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPanel;
