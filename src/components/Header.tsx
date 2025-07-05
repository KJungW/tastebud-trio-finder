
import React, { useState } from 'react';
import { Menu, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface HeaderProps {
  shareLink?: string;
  onUpdate?: () => void;
}

const Header: React.FC<HeaderProps> = ({ shareLink, onUpdate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUpdateHighlighted, setIsUpdateHighlighted] = useState(false);

  const handleShareLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      toast({
        title: "링크가 복사되었습니다!",
        description: "친구들에게 링크를 공유해보세요.",
      });
      // 업데이트 버튼 강조 효과 활성화
      setIsUpdateHighlighted(true);
    }
  };

  const handleUpdate = () => {
    // 강조 상태가 아닐 때는 아무것도 하지 않음
    if (!isUpdateHighlighted) {
      return;
    }
    
    // 강조 효과 제거
    setIsUpdateHighlighted(false);
    
    // 부모 컴포넌트의 업데이트 함수 호출
    if (onUpdate) {
      onUpdate();
    }
    
    toast({
      title: "업데이트 완료!",
      description: "새로운 내용을 확인해보세요.",
    });
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">
              메뉴<span className="text-orange-500">컷</span>
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {shareLink && (
              <>
                <Button
                  onClick={handleShareLink}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  메뉴컷 링크 복사
                </Button>
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleUpdate}
                        variant="outline"
                        className={`px-6 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                          isUpdateHighlighted 
                            ? 'border-orange-500 bg-orange-50 shadow-lg ring-2 ring-orange-200 hover:bg-orange-100 cursor-pointer' 
                            : 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <RefreshCw size={16} className={isUpdateHighlighted ? 'text-orange-500' : 'text-gray-400'} />
                        <span className={isUpdateHighlighted ? 'text-orange-600 font-medium' : 'text-gray-400'}>
                          제외 메뉴 업데이트
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs bg-gray-900 text-white border-gray-700 shadow-xl">
                      <p className="text-sm leading-relaxed">
                        링크를 통해 다른 사람들이 제외한 메뉴 정보를 적용합니다.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
