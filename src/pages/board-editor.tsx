import { useState, useCallback } from "react";
import {
  ArrowLeft,
  Upload,
  Type,
  StickyNote,
  Save,
  Share2,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import Navbar from "@/components/navbar";
import DraggableItem from "@/components/draggable-item";
import UploadModal from "@/components/upload-modal";
import { exportCanvasAsImage } from "@/lib/export-utils";

// Types untuk data lokal
type BoardItemType = "image" | "text" | "note" | "color-palette";

interface BoardItem {
  id: string;
  type: BoardItemType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  content: any; // fleksibel, karena skemanya tidak dipakai lagi
}

interface MoodBoard {
  id: string;
  title: string;
  description?: string;
}

export default function BoardEditor() {
  // Mock data untuk board
  const [board] = useState<MoodBoard>({
    id: "1",
    title: "My Mood Board",
    description: "A beautiful mood board",
  });

  // State untuk items board
  const [items, setItems] = useState<BoardItem[]>([]);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [currentColor, setCurrentColor] = useState("#6366f1");
  const [currentFontSize, setCurrentFontSize] = useState("16");
  const { toast } = useToast();

  // Generate ID sederhana
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleUpdateItem = useCallback(
    (itemId: string, updates: Partial<BoardItem>) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, ...updates } : item
        )
      );
    },
    []
  );

  const handleDeleteItem = useCallback((itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    setSelectedItem(null);
  }, []);

  const handleUploadImages = async (files: File[]) => {
    try {
      // Simulasi upload - buat URL object untuk preview
      const newItems: BoardItem[] = files.map((file, index) => ({
        id: generateId(),
        type: "image",
        content: {
          url: URL.createObjectURL(file),
          originalName: file.name,
          alt: file.name,
        },
        position: { x: 50 + index * 20, y: 50 + index * 20 },
        size: { width: 300, height: 200 },
      }));

      setItems((prevItems) => [...prevItems, ...newItems]);

      toast({
        title: "Images uploaded",
        description: `${files.length} images added to your board.`,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload images. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddText = () => {
    const newItem: BoardItem = {
      id: generateId(),
      type: "text",
      content: {
        text: "Klik dua kali untuk edit",
        fontSize: parseInt(currentFontSize),
        color: currentColor,
        fontWeight: "normal",
      },
      position: { x: 100, y: 100 },
      size: { width: 200, height: 50 },
    };

    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleAddNote = () => {
    const newItem: BoardItem = {
      id: generateId(),
      type: "note",
      content: {
        title: "Catatan",
        content: "Tulis catatan Anda di sini...",
        backgroundColor: "#fef3c7",
        borderColor: "#f59e0b",
      },
      position: { x: 150, y: 150 },
      size: { width: 250, height: 150 },
    };

    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleEditItem = (itemId: string) => {
    const item = items.find((item) => item.id === itemId);
    if (!item) return;

    if (item.type === "text") {
      const textData = item.content as any;
      setEditText(textData.text);
      setEditingItem(itemId);
    } else if (item.type === "note") {
      const noteData = item.content as any;
      setEditText(noteData.content);
      setEditingItem(itemId);
    }
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;

    const item = items.find((item) => item.id === editingItem);
    if (!item) return;

    if (item.type === "text") {
      handleUpdateItem(editingItem, {
        content: { ...item.content, text: editText },
      });
    } else if (item.type === "note") {
      handleUpdateItem(editingItem, {
        content: { ...item.content, content: editText },
      });
    }

    setEditingItem(null);
    setEditText("");
  };

  const handleExport = async () => {
    try {
      const canvas = document.querySelector(".board-canvas") as HTMLElement;
      if (!canvas) throw new Error("Canvas not found");

      await exportCanvasAsImage(canvas, board?.title || "mood-board");

      toast({
        title: "Export complete",
        description: "Your mood board has been downloaded as an image.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export mood board. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    // Simulasi save
    toast({
      title: "Board saved",
      description: "Your mood board has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="p-6">
        <div className="animate-fade-in">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm mb-6 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">
                    {board.title}
                  </h1>
                  <p className="text-sm text-slate-600">
                    {board.description || "No description"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button
                  size="sm"
                  className="bg-violet-500 hover:bg-violet-600 text-white"
                  onClick={handleSave}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Simpan
                </Button>
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center space-x-4 py-3 border-t border-slate-200">
              <Button
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-violet-500 hover:bg-violet-600 text-white"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Gambar
              </Button>
              <Button variant="outline" onClick={handleAddText}>
                <Type className="w-4 h-4 mr-2" />
                Tambah Teks
              </Button>
              <Button variant="outline" onClick={handleAddNote}>
                <StickyNote className="w-4 h-4 mr-2" />
                Tambah Catatan
              </Button>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600">Warna:</span>
                <Input
                  type="color"
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                  className="w-12 h-8 p-0 border-0"
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600">Ukuran:</span>
                <Select
                  value={currentFontSize}
                  onValueChange={setCurrentFontSize}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="14">14px</SelectItem>
                    <SelectItem value="16">16px</SelectItem>
                    <SelectItem value="18">18px</SelectItem>
                    <SelectItem value="24">24px</SelectItem>
                    <SelectItem value="32">32px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div
              className="board-canvas min-h-[600px] bg-slate-50 rounded-lg p-8 relative overflow-hidden"
              onClick={() => setSelectedItem(null)}
            >
              {items.length === 0 && (
                <div className="absolute inset-8 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Upload className="mx-auto w-16 h-16 text-slate-400 mb-4" />
                    <p className="text-lg font-medium text-slate-600 mb-2">
                      Seret gambar ke sini atau klik Upload Gambar
                    </p>
                    <p className="text-sm text-slate-500">
                      Mendukung JPG, PNG, GIF hingga 10MB
                    </p>
                  </div>
                </div>
              )}

              {items.map((item) => (
                <DraggableItem
                  key={item.id}
                  item={item}
                  onUpdate={handleUpdateItem}
                  onDelete={handleDeleteItem}
                  isSelected={selectedItem === item.id}
                  onSelect={() => setSelectedItem(item.id)}
                  onEdit={handleEditItem}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUploadImages}
      />

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
            <h3 className="text-lg font-semibold mb-4">
              Edit{" "}
              {items.find((i) => i.id === editingItem)?.type === "text"
                ? "Teks"
                : "Catatan"}
            </h3>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full h-32 p-3 border border-slate-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Tulis di sini..."
            />
            <div className="flex justify-end space-x-3 mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingItem(null);
                  setEditText("");
                }}
              >
                Batal
              </Button>
              <Button
                onClick={handleSaveEdit}
                className="bg-violet-500 hover:bg-violet-600 text-white"
              >
                Simpan
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
