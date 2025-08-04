import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Move, Edit3 } from "lucide-react";

// Tipe minimal langsung didefinisikan di sini
type BoardItemType = "image" | "text" | "note" | "color-palette";

interface BoardItem {
  id: string;
  type: BoardItemType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  content: any; // fleksibel, karena skemanya tidak dipakai lagi
}

interface DraggableItemProps {
  item: BoardItem;
  onUpdate: (id: string, updates: Partial<BoardItem>) => void;
  onDelete: (id: string) => void;
  isSelected?: boolean;
  onSelect?: () => void;
  onEdit?: (id: string) => void;
}

export default function DraggableItem({
  item,
  onUpdate,
  onDelete,
  isSelected = false,
  onSelect,
  onEdit,
}: DraggableItemProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cursorMode, setCursorMode] = useState<"move" | "edit">("move");
  const elementRef = useRef<HTMLDivElement>(null);

  const position = item.position;
  const size = item.size;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (
      e.target instanceof HTMLElement &&
      (e.target.closest(".no-drag") ||
        ["BUTTON", "INPUT", "TEXTAREA"].includes(e.target.tagName))
    ) {
      return;
    }

    if (e.altKey && onEdit) {
      onEdit(item.id);
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    onSelect?.();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) setCursorMode("edit");
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (!e.altKey) setCursorMode("move");
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newX = Math.max(0, e.clientX - dragStart.x);
      const newY = Math.max(0, e.clientY - dragStart.y);
      onUpdate(item.id, { position: { x: newX, y: newY } });
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart, item.id, onUpdate]);

  const renderContent = () => {
    const content = item.content;

    switch (item.type) {
      case "image":
        return (
          <div className="relative">
            <img
              src={content.url}
              alt={content.alt || "Image"}
              className="w-full h-full object-cover rounded-lg"
              draggable={false}
            />
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-xs text-white bg-black bg-opacity-50 rounded px-2 py-1 truncate">
                {content.originalName}
              </p>
            </div>
          </div>
        );

      case "text":
        return (
          <div
            className="p-3 bg-white rounded-lg shadow-sm border border-slate-200 min-h-[40px] flex items-center"
            style={{
              fontSize: `${content.fontSize}px`,
              color: content.color,
              fontWeight: content.fontWeight,
            }}
          >
            <span className="break-words">{content.text}</span>
          </div>
        );

      case "note":
        return (
          <div
            className="p-4 rounded-lg border-l-4 shadow-sm min-h-[100px]"
            style={{
              backgroundColor: content.backgroundColor,
              borderLeftColor: content.borderColor,
            }}
          >
            {content.title && (
              <p className="text-sm font-medium text-slate-700 mb-2">
                {content.title}
              </p>
            )}
            <p className="text-sm text-slate-600 whitespace-pre-wrap break-words">
              {content.content}
            </p>
          </div>
        );

      case "color-palette":
        return (
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 min-h-[120px]">
            {content.title && (
              <p className="text-xs font-medium text-slate-700 mb-3">
                {content.title}
              </p>
            )}
            <div className="grid grid-cols-3 gap-2">
              {content.colors.map((color: string, index: number) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded border border-slate-200 shadow-sm"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        );

      default:
        return <div className="p-4 bg-white rounded-lg">Unknown item type</div>;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`absolute draggable-item select-none ${
        isDragging ? "dragging" : ""
      } ${
        isSelected
          ? "ring-2 ring-violet-500 ring-offset-2"
          : "hover:ring-1 hover:ring-violet-300"
      } transition-all duration-200 ${
        cursorMode === "edit" ? "cursor-pointer" : "cursor-move"
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: isDragging ? 1000 : isSelected ? 100 : 1,
        transform: isDragging ? "scale(1.05) rotate(1deg)" : "none",
      }}
      onMouseDown={handleMouseDown}
      title={
        cursorMode === "edit"
          ? "Alt + Klik untuk edit"
          : "Klik dan seret untuk pindah"
      }
    >
      {renderContent()}

      {isSelected && (
        <div className="absolute -top-12 -right-1 flex items-center space-x-2 z-50">
          <div className="flex items-center bg-violet-500 text-white text-xs px-2 py-1 rounded shadow-lg">
            {cursorMode === "edit" ? (
              <>
                <Edit3 className="w-3 h-3 mr-1" />
                Alt + Klik untuk edit
              </>
            ) : (
              <>
                <Move className="w-3 h-3 mr-1" />
                Seret untuk pindah
              </>
            )}
          </div>
          {onEdit && (
            <Button
              variant="secondary"
              size="sm"
              className="no-drag w-7 h-7 p-0 shadow-lg hover:bg-blue-600 bg-blue-500 text-white"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(item.id);
              }}
              title="Edit item ini"
            >
              <Edit3 className="w-3 h-3" />
            </Button>
          )}
          <Button
            variant="destructive"
            size="sm"
            className="no-drag w-7 h-7 p-0 shadow-lg hover:bg-red-600"
            onClick={(e) => {
              e.stopPropagation();
              if (confirm("Yakin ingin menghapus item ini?")) {
                onDelete(item.id);
              }
            }}
            title="Hapus item ini"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
