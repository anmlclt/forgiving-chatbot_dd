
import { Menu, User, MessageSquare, HandHeart } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onGetStarted: () => void;
  renderBottomNavigation: () => JSX.Element;
}

const WelcomeScreen = ({ onGetStarted, renderBottomNavigation }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-[#1A1F2C] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <Button variant="ghost" className="text-white p-2">
          <Menu className="h-6 w-6" />
        </Button>
        <Button variant="ghost" className="text-white p-2">
          <User className="h-6 w-6" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          Welcome to Confess
        </h1>

        {/* Grid of Large Buttons */}
        <div className="grid gap-4">
          <Button
            onClick={() => onGetStarted()}
            className="flex flex-col items-start justify-center h-48 bg-[#2A2F3C] hover:bg-[#2A2F3C]/90 text-white p-8 rounded-xl w-full"
          >
            <HandHeart className="h-16 w-16 mb-6 text-[#9b87f5]" />
            <span className="text-2xl font-medium mb-2">Forgive a sin</span>
            <span className="text-base text-gray-400">Seek absolution and find peace through virtual confession</span>
          </Button>

          <Button
            className="flex flex-col items-start justify-center h-48 bg-[#2A2F3C] hover:bg-[#2A2F3C]/90 text-white p-8 rounded-xl w-full"
          >
            <MessageSquare className="h-16 w-16 mb-6 text-[#9b87f5]" />
            <span className="text-2xl font-medium mb-2">Chat with AI Priest</span>
            <span className="text-base text-gray-400">Seek guidance and spiritual advice</span>
          </Button>
        </div>
      </div>

      {renderBottomNavigation()}
    </div>
  );
};

export default WelcomeScreen;
