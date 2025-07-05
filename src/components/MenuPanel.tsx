
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

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-2">메뉴 선택</h2>
        <p className="text-sm text-gray-600">
          먹기 싫은 메뉴를 클릭해서 제외해주세요
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {menuCategories.map(category => (
          <MenuCard
            key={category.id}
            id={category.id}
            name={category.name}
            icon={category.icon}
            description={category.description}
            isExcluded={excludedMenus.includes(category.id)}
            onToggle={onMenuToggle}
          />
        ))}
      </div>
      
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="text-sm text-gray-600 mb-4">
          <span className="font-medium">{excludedMenus.length}</span>개 메뉴가 제외되었습니다
        </div>
        
        <div className="space-y-2">
          <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200">
            메뉴 선택 완료
          </button>
          <button className="w-full bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
            초기화
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuPanel;
