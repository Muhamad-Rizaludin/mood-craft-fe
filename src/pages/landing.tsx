import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Image, Type, Palette as ColorIcon } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Palette className="text-white w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-slate-800">MoodCraft</span>
            </div>
            <Button 
              onClick={() => window.location.href = '/api/login'}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              Masuk
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Buat Mood Board
            <span className="text-violet-600"> Visual</span> Impian Anda
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
            Organisir inspirasi visual Anda dengan mudah. Upload gambar, tambahkan teks, 
            dan buat koleksi warna untuk proyek kreatif Anda.
          </p>
          
          <Button 
            size="lg"
            onClick={() => window.location.href = '/api/login'}
            className="bg-violet-600 hover:bg-violet-700 text-white text-lg px-8 py-4"
          >
            Mulai Gratis Sekarang
          </Button>
        </div>

        {/* Features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Image className="w-6 h-6 text-violet-600" />
              </div>
              <CardTitle>Upload Gambar</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Upload dan atur gambar inspirasi Anda dengan mudah menggunakan drag & drop.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Type className="w-6 h-6 text-violet-600" />
              </div>
              <CardTitle>Tambah Teks & Catatan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Buat catatan dan tambahkan teks dengan berbagai pilihan font dan warna.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ColorIcon className="w-6 h-6 text-violet-600" />
              </div>
              <CardTitle>Palet Warna</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Simpan dan kelola koleksi warna favorit untuk konsistensi desain.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center bg-white rounded-2xl p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Siap Membuat Mood Board Pertama Anda?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Bergabung dengan ribuan kreator yang sudah menggunakan MoodCraft
          </p>
          <Button 
            size="lg"
            onClick={() => window.location.href = '/api/login'}
            className="bg-violet-600 hover:bg-violet-700 text-white text-lg px-8 py-4"
          >
            Daftar Sekarang
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 MoodCraft. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}