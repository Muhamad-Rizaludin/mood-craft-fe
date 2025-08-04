import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MoodBoardCardProps {
  title: string;
  description?: string;
  itemCount?: number;
}

export default function MoodBoardCard({
  title,
  description = "No description",
  itemCount = 0,
}: MoodBoardCardProps) {
  return (
    <Card className="mood-board-item bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer group">
      <div className="aspect-square relative bg-gradient-to-br from-brand-50 to-purple-50 flex items-center justify-center">
        {/* Placeholder initial icon */}
        <div className="text-brand-300">
          <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center">
            <span className="text-2xl font-bold text-brand-500">
              {/* {title.charAt(0)} */}
            </span>
          </div>
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100"
          >
            <Heart className="w-4 h-4 text-slate-400" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-800 mb-1 truncate">{title}</h3>
        <p className="text-sm text-slate-600 mb-3 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">Updated recently</span>
          <span className="text-xs text-slate-500">{itemCount} items</span>
        </div>
      </div>
    </Card>
  );
}
