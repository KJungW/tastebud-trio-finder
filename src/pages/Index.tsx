
import React, { useState } from 'react';
import Header from '../components/Header';
import MapSection from '../components/MapSection';
import MenuPanel from '../components/MenuPanel';

const Index = () => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [excludedMenus, setExcludedMenus] = useState<string[]>([]);
  const [shareLink, setShareLink] = useState('');

  const handleStartNewSession = () => {
    setIsSessionActive(true);
    // 실제로는 백엔드에서 고유 ID 생성
    const sessionId = Math.random().toString(36).substr(2, 9);
    setShareLink(`${window.location.origin}/join/${sessionId}`);
  };

  const handleMenuToggle = (menuId: string) => {
    setExcludedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  if (!isSessionActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Header />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center space-y-8 p-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-800">
                메뉴<span className="text-orange-500">컷</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-md mx-auto">
                함께 먹을 사람들과 메뉴를 간편하게 정해보세요
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto">
              <div className="space-y-4">
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800 mb-2">이런 고민 있으셨죠?</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 다른 사람들과 메뉴 정하기 어려워요</li>
                    <li>• 누구는 뭘 싫어하는지 모르겠어요</li>
                    <li>• 주변 식당 정보도 잘 몰라요</li>
                  </ul>
                </div>
                
                <button
                  onClick={handleStartNewSession}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  새로운 메뉴컷 시작하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header shareLink={shareLink} />
      <div className="flex h-[calc(100vh-4rem)]">
        <MapSection excludedMenus={excludedMenus} />
        <MenuPanel 
          excludedMenus={excludedMenus} 
          onMenuToggle={handleMenuToggle}
        />
      </div>
    </div>
  );
};

export default Index;
