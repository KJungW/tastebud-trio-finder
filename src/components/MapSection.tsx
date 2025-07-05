
import React, { useState, useRef, useCallback, useMemo } from 'react';

interface MapSectionProps {
  excludedMenus: string[];
}

const MapSection: React.FC<MapSectionProps> = ({ excludedMenus }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // 지도 움직임 범위 제한
  const MAX_OFFSET = 200; // 최대 이동 거리

  // 메뉴별 식당 데이터 (각 메뉴당 1~2개로 줄임)
  const menuRestaurants = {
    korean: [
      { 
        id: 'korean1', 
        name: '맛있는 한식당', 
        rating: 4.5, 
        icon: '🍚',
        address: '서울시 강남구 테헤란로 123',
        phone: '02-1234-5678',
        price: '1만원대',
        description: '전통 한식의 맛을 그대로 담은 가게입니다. 김치찌개와 불고기가 특히 유명해요!',
        hours: '11:00 - 22:00',
        tags: ['김치찌개', '불고기', '비빔밥']
      },
      { 
        id: 'korean2', 
        name: '전통 김치찌개', 
        rating: 4.2, 
        icon: '🍚',
        address: '서울시 강남구 역삼동 456',
        phone: '02-2345-6789',
        price: '8천원대',
        description: '30년 전통의 김치찌개 전문점입니다. 매콤달콤한 김치찌개가 일품이에요.',
        hours: '10:30 - 21:30',
        tags: ['김치찌개', '된장찌개', '순두부찌개']
      },
    ],
    chinese: [
      { 
        id: 'chinese1', 
        name: '중국집', 
        rating: 4.0, 
        icon: '🥢',
        address: '서울시 강남구 논현동 789',
        phone: '02-3456-7890',
        price: '1만2천원대',
        description: '정통 중국 요리의 맛을 느낄 수 있는 곳입니다. 짜장면과 탕수육이 인기메뉴예요.',
        hours: '11:30 - 22:30',
        tags: ['짜장면', '탕수육', '짬뽕']
      },
      { 
        id: 'chinese2', 
        name: '짜장면 전문', 
        rating: 4.4, 
        icon: '🥢',
        address: '서울시 강남구 삼성동 321',
        phone: '02-4567-8901',
        price: '9천원대',
        description: '40년 전통의 짜장면 전문점입니다. 깊은 맛의 짜장면을 맛보세요.',
        hours: '11:00 - 21:00',
        tags: ['짜장면', '짬뽕', '깐풍기']
      },
    ],
    japanese: [
      { 
        id: 'japanese1', 
        name: '일본 라멘', 
        rating: 4.7, 
        icon: '🍣',
        address: '서울시 강남구 청담동 654',
        phone: '02-5678-9012',
        price: '1만5천원대',
        description: '일본 현지의 맛을 그대로 재현한 라멘 전문점입니다. 진한 육수가 일품이에요.',
        hours: '12:00 - 23:00',
        tags: ['라멘', '초밥', '우동']
      },
      { 
        id: 'japanese2', 
        name: '초밥 전문점', 
        rating: 4.8, 
        icon: '🍣',
        address: '서울시 강남구 압구정동 987',
        phone: '02-6789-0123',
        price: '3만원대',
        description: '신선한 회와 정통 초밥을 즐길 수 있는 고급 스시바입니다.',
        hours: '17:00 - 24:00',
        tags: ['초밥', '사시미', '우니']
      },
    ],
    western: [
      { 
        id: 'western1', 
        name: '이탈리아 파스타', 
        rating: 4.2, 
        icon: '🍝',
        address: '서울시 강남구 신사동 147',
        phone: '02-7890-1234',
        price: '2만원대',
        description: '이탈리아 현지의 맛을 그대로 담은 파스타 전문점입니다.',
        hours: '11:30 - 22:00',
        tags: ['파스타', '피자', '리조또']
      },
      { 
        id: 'western2', 
        name: '스테이크 하우스', 
        rating: 4.6, 
        icon: '🍝',
        address: '서울시 강남구 도산대로 258',
        phone: '02-8901-2345',
        price: '4만원대',
        description: '프리미엄 스테이크를 즐길 수 있는 고급 레스토랑입니다.',
        hours: '17:00 - 23:00',
        tags: ['스테이크', '와인', '샐러드']
      },
    ],
    thai: [
      { 
        id: 'thai1', 
        name: '태국 커리', 
        rating: 4.3, 
        icon: '🌶️',
        address: '서울시 강남구 가로수길 369',
        phone: '02-9012-3456',
        price: '1만8천원대',
        description: '태국 현지의 진한 맛을 느낄 수 있는 커리 전문점입니다.',
        hours: '11:00 - 22:30',
        tags: ['팟타이', '똠양꿍', '그린커리']
      },
      { 
        id: 'thai2', 
        name: '팟타이 맛집', 
        rating: 4.5, 
        icon: '🌶️',
        address: '서울시 강남구 신사동 741',
        phone: '02-0123-4567',
        price: '1만5천원대',
        description: '태국 현지의 맛을 그대로 재현한 팟타이 전문점입니다.',
        hours: '11:30 - 22:00',
        tags: ['팟타이', '똠양꿍', '쏨땀']
      },
    ],
    indian: [
      { 
        id: 'indian1', 
        name: '인도 카레', 
        rating: 4.1, 
        icon: '🍛',
        address: '서울시 강남구 논현동 852',
        phone: '02-1234-5678',
        price: '1만2천원대',
        description: '정통 인도 카레의 맛을 느낄 수 있는 곳입니다.',
        hours: '11:00 - 21:30',
        tags: ['커리', '난', '탄두리']
      },
      { 
        id: 'indian2', 
        name: '탄두리 치킨', 
        rating: 4.3, 
        icon: '🍛',
        address: '서울시 강남구 삼성동 963',
        phone: '02-2345-6789',
        price: '1만5천원대',
        description: '인도 전통 양념으로 조리한 탄두리 치킨이 유명한 곳입니다.',
        hours: '11:30 - 22:00',
        tags: ['탄두리', '커리', '난']
      },
    ],
    mexican: [
      { 
        id: 'mexican1', 
        name: '멕시칸 타코', 
        rating: 4.4, 
        icon: '🌮',
        address: '서울시 강남구 청담동 159',
        phone: '02-3456-7890',
        price: '1만원대',
        description: '멕시코 현지의 맛을 그대로 담은 타코 전문점입니다.',
        hours: '11:00 - 22:00',
        tags: ['타코', '부리또', '나초']
      },
      { 
        id: 'mexican2', 
        name: '부리또 전문', 
        rating: 4.2, 
        icon: '🌮',
        address: '서울시 강남구 압구정동 357',
        phone: '02-4567-8901',
        price: '1만2천원대',
        description: '신선한 재료로 만드는 부리또가 유명한 멕시칸 레스토랑입니다.',
        hours: '11:30 - 21:30',
        tags: ['부리또', '타코', '케사디야']
      },
    ],
    fast: [
      { 
        id: 'fast1', 
        name: '패스트푸드', 
        rating: 3.8, 
        icon: '🍔',
        address: '서울시 강남구 역삼동 753',
        phone: '02-5678-9012',
        price: '8천원대',
        description: '빠르고 맛있는 패스트푸드를 즐길 수 있는 곳입니다.',
        hours: '07:00 - 23:00',
        tags: ['햄버거', '치킨', '피자']
      },
      { 
        id: 'fast2', 
        name: '치킨 전문점', 
        rating: 4.1, 
        icon: '🍔',
        address: '서울시 강남구 논현동 951',
        phone: '02-6789-0123',
        price: '1만5천원대',
        description: '바삭바삭한 치킨이 유명한 패스트푸드점입니다.',
        hours: '11:00 - 24:00',
        tags: ['치킨', '양념치킨', '후라이드']
      },
    ],
  };

  // 고정된 위치 데이터 (각 식당별로 고정된 위치)
  const fixedPositions = {
    korean1: { left: 35, top: 30 },
    korean2: { left: 65, top: 40 },
    chinese1: { left: 45, top: 60 },
    chinese2: { left: 70, top: 25 },
    japanese1: { left: 25, top: 70 },
    japanese2: { left: 60, top: 75 },
    western1: { left: 40, top: 45 },
    western2: { left: 75, top: 55 },
    thai1: { left: 30, top: 50 },
    thai2: { left: 55, top: 35 },
    indian1: { left: 50, top: 65 },
    indian2: { left: 35, top: 80 },
    mexican1: { left: 65, top: 70 },
    mexican2: { left: 45, top: 25 },
    fast1: { left: 70, top: 40 },
    fast2: { left: 25, top: 45 },
  };

  // 활성화된 메뉴의 식당들만 필터링 (위치 고정)
  const activeRestaurants = useMemo(() => {
    return Object.entries(menuRestaurants)
      .filter(([menuType]) => !excludedMenus.includes(menuType))
      .flatMap(([menuType, restaurants]) => 
        restaurants.map((restaurant) => ({
          ...restaurant,
          menuType,
          // 고정된 위치 사용
          ...fixedPositions[restaurant.id as keyof typeof fixedPositions]
        }))
      );
  }, [excludedMenus]); // excludedMenus가 변경될 때만 재계산

  // 범위 제한 함수
  const constrainOffset = (offset: { x: number, y: number }) => {
    return {
      x: Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, offset.x)),
      y: Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, offset.y))
    };
  };

  // 드래그 시작
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - mapOffset.x,
      y: e.clientY - mapOffset.y
    });
  }, [mapOffset]);

  // 드래그 중
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const newOffset = {
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    };
    
    setMapOffset(constrainOffset(newOffset));
  }, [isDragging, dragStart]);

  // 드래그 종료
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 마우스가 지도 영역을 벗어날 때
  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 중앙으로 이동
  const centerMap = useCallback(() => {
    setMapOffset({ x: 0, y: 0 });
  }, []);

  // 식당 핀 클릭 핸들러
  const handleRestaurantClick = useCallback((restaurant: any) => {
    setSelectedRestaurant(restaurant);
  }, []);

  // 상세 정보 닫기
  const closeDetail = useCallback(() => {
    setSelectedRestaurant(null);
  }, []);

  // 지도 스타일의 그리드 배경 생성 (더 조밀하게)
  const gridLines = Array.from({ length: 40 }, (_, i) => (
    <div key={i} className="absolute border-gray-200" style={{
      left: `${i * 2.5}%`,
      top: 0,
      width: '1px',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.03)'
    }} />
  ));

  const horizontalGridLines = Array.from({ length: 30 }, (_, i) => (
    <div key={i} className="absolute border-gray-200" style={{
      top: `${i * 3.33}%`,
      left: 0,
      height: '1px',
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.03)'
    }} />
  ));

  // 도로 스타일의 선들
  const roadLines = [
    { left: '25%', top: '0%', width: '2px', height: '100%', color: 'rgba(139,69,19,0.3)' },
    { left: '50%', top: '0%', width: '2px', height: '100%', color: 'rgba(139,69,19,0.3)' },
    { left: '75%', top: '0%', width: '2px', height: '100%', color: 'rgba(139,69,19,0.3)' },
    { left: '0%', top: '25%', width: '100%', height: '2px', color: 'rgba(139,69,19,0.3)' },
    { left: '0%', top: '50%', width: '100%', height: '2px', color: 'rgba(139,69,19,0.3)' },
    { left: '0%', top: '75%', width: '100%', height: '2px', color: 'rgba(139,69,19,0.3)' },
  ];

  return (
    <div className="flex-1 bg-gray-100 relative">
      {/* 지도 컨테이너 */}
      <div className="absolute inset-4 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* 드래그 가능한 지도 영역 */}
        <div 
          ref={mapRef}
          className="h-full relative cursor-grab active:cursor-grabbing"
          style={{
            transform: `translate(${mapOffset.x}px, ${mapOffset.y}px)`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {/* 지도 배경 - 실제 지도 스타일 */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-yellow-50">
            {/* 그리드 라인 */}
            {gridLines}
            {horizontalGridLines}
            
            {/* 도로 라인 */}
            {roadLines.map((road, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  left: road.left,
                  top: road.top,
                  width: road.width,
                  height: road.height,
                  backgroundColor: road.color
                }}
              />
            ))}
            
            {/* 건물/구역 시뮬레이션 */}
            <div className="absolute top-10 left-10 w-20 h-16 bg-gray-300 rounded opacity-60"></div>
            <div className="absolute top-20 right-20 w-16 h-12 bg-gray-400 rounded opacity-60"></div>
            <div className="absolute bottom-20 left-20 w-24 h-20 bg-gray-300 rounded opacity-60"></div>
            <div className="absolute bottom-10 right-10 w-18 h-14 bg-gray-400 rounded opacity-60"></div>
            
            {/* 공원/녹지 시뮬레이션 */}
            <div className="absolute top-1/3 left-1/3 w-32 h-24 bg-green-200 rounded-full opacity-40"></div>
            <div className="absolute bottom-1/3 right-1/3 w-28 h-20 bg-green-300 rounded-full opacity-40"></div>
          </div>
          
          {/* 활성화된 메뉴의 식당 마커들 - 고정된 위치에 배치 */}
          <div className="absolute inset-0 p-8">
            {activeRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${restaurant.left}%`, top: `${restaurant.top}%` }}
              >
                {/* 마커 - 메뉴 이모티콘으로 변경 */}
                <div className="relative group">
                  <div 
                    className="w-12 h-12 bg-white rounded-full border-3 border-gray-300 shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-200 hover:shadow-xl hover:border-orange-400"
                    onClick={() => handleRestaurantClick(restaurant)}
                  >
                    <span className="text-2xl">{restaurant.icon}</span>
                  </div>
                  
                  {/* 마커 팝업 */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-lg shadow-lg p-3 min-w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-20">
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-800 text-sm">{restaurant.name}</h4>
                      <div className="flex items-center justify-center space-x-1 mt-1">
                        <span className="text-yellow-500 text-xs">★</span>
                        <span className="text-xs text-gray-600">{restaurant.rating}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center justify-center space-x-1">
                        <span>{restaurant.icon}</span>
                        <span>
                          {restaurant.menuType === 'korean' && '한식'}
                          {restaurant.menuType === 'chinese' && '중식'}
                          {restaurant.menuType === 'japanese' && '일식'}
                          {restaurant.menuType === 'western' && '양식'}
                          {restaurant.menuType === 'thai' && '태국음식'}
                          {restaurant.menuType === 'indian' && '인도음식'}
                          {restaurant.menuType === 'mexican' && '멕시칸'}
                          {restaurant.menuType === 'fast' && '패스트푸드'}
                        </span>
                      </div>
                    </div>
                    {/* 화살표 */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 현재 위치 마커 - 지도 정중앙에 위치 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            {/* 현재 위치 핀 - 더 예쁘게 꾸민 버전 */}
            <div className="relative">
              {/* 핀 그림자 */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-black/20 rounded-full blur-sm"></div>
              
              {/* 핀 본체 */}
              <div className="relative w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 고정된 UI 요소들 (드래그되지 않음) */}
        
        {/* 지도 제목 */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">📍 주변 식당 지도</h3>
            <p className="text-sm text-gray-600">
              {activeRestaurants.length}개의 식당이 표시됩니다
            </p>
            {isDragging && (
              <p className="text-xs text-blue-600 mt-1">드래그 중...</p>
            )}
          </div>
        </div>

        {/* 지도 컨트롤 */}
        <div className="absolute top-4 right-4 space-y-2 z-10">
          <button 
            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm flex items-center justify-center hover:bg-white transition-colors"
            onClick={centerMap}
            title="중앙으로 이동"
          >
            <span className="text-gray-600 text-sm">⌂</span>
          </button>
          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm flex items-center justify-center hover:bg-white transition-colors">
            <span className="text-gray-600 text-sm">+</span>
          </button>
          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm flex items-center justify-center hover:bg-white transition-colors">
            <span className="text-gray-600 text-sm">−</span>
          </button>
        </div>

        {/* 식당 상세 정보 모달 */}
        {selectedRestaurant && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
              {/* 헤더 */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">{selectedRestaurant.icon}</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{selectedRestaurant.name}</h2>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm font-medium">{selectedRestaurant.rating}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">{selectedRestaurant.price}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={closeDetail}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <span className="text-gray-600">×</span>
                  </button>
                </div>
              </div>

              {/* 내용 */}
              <div className="p-6 space-y-4">
                {/* 설명 */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">소개</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{selectedRestaurant.description}</p>
                </div>

                {/* 정보 */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-500 text-sm w-16">주소</span>
                    <span className="text-sm text-gray-700">{selectedRestaurant.address}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-500 text-sm w-16">전화</span>
                    <span className="text-sm text-gray-700">{selectedRestaurant.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-500 text-sm w-16">영업시간</span>
                    <span className="text-sm text-gray-700">{selectedRestaurant.hours}</span>
                  </div>
                </div>

                {/* 태그 */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">대표 메뉴</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedRestaurant.tags.map((tag: string, index: number) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex space-x-3">
                  <button className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                    예약하기
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                    길찾기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapSection;
