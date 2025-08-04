"use client";

import { useState } from "react";
import { Plus, Grid3X3, List, Palette, Image, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import MoodBoardCard from "@/components/mood-board-card";

const dummyStats = [
  {
    title: "Total Boards",
    value: 3,
    icon: Palette,
    color: "bg-brand-100 text-brand-500",
  },
  {
    title: "Images Uploaded",
    value: 45,
    icon: Image,
    color: "bg-violet-100 text-violet-500",
  },
  {
    title: "Exports Created",
    value: 12,
    icon: Download,
    color: "bg-emerald-100 text-emerald-500",
  },
];

const dummyBoards = [
  {
    id: "1",
    title: "Interior Ideas",
    description: "Minimalist interior inspiration",
    isFavorite: "true",
  },
  {
    id: "2",
    title: "Color Palettes",
    description: "Soft pastel colors",
    isFavorite: "false",
  },
  {
    id: "3",
    title: "Fashion Looks",
    description: "Fall fashion trends",
    isFavorite: "false",
  },
];

export default function Dashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [newBoardDescription, setNewBoardDescription] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleCreateBoard = () => {
    if (!newBoardTitle.trim()) return;

    console.log("Board created:", newBoardTitle, newBoardDescription);
    setNewBoardTitle("");
    setNewBoardDescription("");
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar onMenuClick={() => setIsMobileSidebarOpen(true)} />
      <div className="flex">
        <Sidebar
          onCreateBoard={() => setIsCreateModalOpen(true)}
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />

        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome back!</h1>
            <p className="text-slate-600">Create and organize your visual inspiration</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {dummyStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                      <p className="text-sm text-slate-600">{stat.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Boards */}
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-800">Recent Mood Boards</h2>
            <div className="flex items-center space-x-2">
              <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
                <Grid3X3 className="w-4 h-4 mr-2" />
                Grid
              </Button>
              <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
                <List className="w-4 h-4 mr-2" />
                List
              </Button>
            </div>
          </div>

          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {dummyBoards.map((board) => (
              <MoodBoardCard
                key={board.id}
                board={board}
                itemCount={0}
                isFavorite={board.isFavorite === "true"}
                onToggleFavorite={() => {}}
              />
            ))}

            <Card
              className="mood-board-item border-2 border-dashed border-slate-300 hover:border-violet-400 hover:bg-violet-50 transition-all cursor-pointer"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <div className="aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Plus className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="font-medium text-slate-600">Create New Board</p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>

      {/* Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Mood Board</DialogTitle>
            <DialogDescription>
              Give your mood board a name and description to get started.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newBoardTitle}
                onChange={(e) => setNewBoardTitle(e.target.value)}
                placeholder="Enter board title..."
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newBoardDescription}
                onChange={(e) => setNewBoardDescription(e.target.value)}
                placeholder="Enter description..."
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleCreateBoard}
                className="bg-violet-600 hover:bg-violet-700 text-white"
                disabled={!newBoardTitle.trim()}
              >
                Create Board
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-14 h-14 bg-violet-600 hover:bg-violet-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
