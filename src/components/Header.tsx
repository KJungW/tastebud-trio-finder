
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface HeaderProps {
  shareLink?: string;
}

const Header: React.FC<HeaderProps> = ({ shareLink }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleShareLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      toast({
        title: "링크가 복사되었습니다!",
        description: "친구들에게 링크를 공유해보세요.",
      });
    }
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
              <Button
                onClick={handleShareLink}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                메뉴컷 링크 복사
              </Button>
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
