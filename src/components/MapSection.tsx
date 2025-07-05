
import React from 'react';

interface MapSectionProps {
  excludedMenus: string[];
}

const MapSection: React.FC<MapSectionProps> = ({ excludedMenus }) => {
  const mockRestaurants = [
    { id: 1, name: '맛있는 한식당', type: 'korean', lat: 37.566, lng: 126.978 },
    { id: 2, name: '이탈리아 파스타', type: 'italian', lat: 37.567, lng: 126.979 },
    { id: 3, name: '중국집', type: 'chinese', lat: 37.565, lng: 126.977 },
    { id: 4, name: '일본 라멘', type: 'japanese', lat: 37.568, lng: 126.980 },
  ];

  const filteredRestaurants = mockRestaurants.filter(restaurant => 
    !excludedMenus.includes(restaurant.type)
  );

  return (
    <div className="flex-1 bg-gray-100 relative">
      <div className="absolute inset-4 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto bg-blue-200 rounded-full flex items-center justify-center">
              <span className="text-3xl">📍</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">주변 식당 지도</h3>
              <p className="text-sm text-gray-600">
                {filteredRestaurants.length}개의 식당이 표시됩니다
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm max-w-sm mx-auto">
              <h4 className="font-medium mb-2">필터링된 식당들:</h4>
              <div className="space-y-2">
                {filteredRestaurants.map(restaurant => (
                  <div key={restaurant.id} className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{restaurant.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
