import { Home, Folder, Heart, Share2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface SidebarProps {
  onCreateBoard: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({ onCreateBoard, isMobileOpen = false, onMobileClose }: SidebarProps) {
  const [location] = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, current: location === '/dashboard' },
    { name: 'My Boards', href: '#', icon: Folder, current: false },
    { name: 'Favorites', href: '#', icon: Heart, current: false },
    { name: 'Shared', href: '#', icon: Share2, current: false },
  ];

  const recentColors = [
    '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6">
        <Button 
          onClick={() => {
            onCreateBoard();
            onMobileClose?.();
          }}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Mood Board
        </Button>
      </div>
      
      <nav className="px-6">
        <div className="space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                item.current
                  ? 'bg-violet-50 text-violet-600 font-medium'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              onClick={onMobileClose}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="px-6 mt-8">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Recent Colors
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {recentColors.map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-lg cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white shadow-sm h-screen sticky top-16 hidden lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={onMobileClose}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="p-6 pb-3 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
              <Button variant="ghost" size="sm" onClick={onMobileClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </SheetHeader>
          <div className="pt-3">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
