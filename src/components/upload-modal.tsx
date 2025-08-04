import { useState, useRef } from "react";
import { X, Upload, ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
}

export default function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );

    if (files.length === 0) {
      toast({
        title: "Invalid files",
        description: "Please select only image files.",
        variant: "destructive",
      });
      return;
    }

    const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast({
        title: "Files too large",
        description: "Please select images smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) return;
    onUpload(selectedFiles);
    setSelectedFiles([]);
    onClose();
  };

  const handleClose = () => {
    setSelectedFiles([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Upload Gambar
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div
            className={`drag-drop-zone p-8 border-2 border-dashed border-slate-300 rounded-lg text-center transition-colors cursor-pointer hover:border-violet-400 hover:bg-violet-50 ${
              dragActive ? 'border-violet-500 bg-violet-50' : ''
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto w-12 h-12 text-slate-400 mb-4" />
            <p className="text-slate-600 mb-2">
              {selectedFiles.length > 0 
                ? `${selectedFiles.length} file terpilih`
                : 'Seret file ke sini atau klik untuk pilih'
              }
            </p>
            <p className="text-sm text-slate-500">JPG, PNG, GIF maksimal 10MB per file</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>

          {selectedFiles.length > 0 && (
            <div className="max-h-32 overflow-y-auto space-y-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-slate-50 rounded">
                  <ImageIcon className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600 flex-1 truncate">{file.name}</span>
                  <span className="text-xs text-slate-500">
                    {(file.size / 1024 / 1024).toFixed(1)}MB
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={handleClose}>
              Batal
            </Button>
            <Button 
              onClick={handleUpload}
              disabled={selectedFiles.length === 0}
              className="bg-violet-500 hover:bg-violet-600 text-white"
            >
              Upload {selectedFiles.length > 0 && `(${selectedFiles.length})`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
