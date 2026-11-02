import React from 'react';
import { 
  BookOpen, Sparkles, Camera, MapPin, Award, 
  ShieldCheck, HelpCircle, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const GuidePage: React.FC = () => {
  const guideSteps = [
    {
      num: 1,
      title: "Cara Membuka & Mempelajari Materi Haji",
      icon: BookOpen,
      color: "from-sky-500 to-hajj-primary",
      steps: [
        "Pilih menu 'Materi Haji' di navbar atas atau bottom navigation ponsel.",
        "Pilih salah satu dari 6 kartu rukun haji (misal: Niat & Ihram, Wukuf, atau Thawaf).",
        "Baca pengertian syariat, dasar hukum dalil, tata cara berurutan, dan poin penting.",
        "Dengarkan lantunan audio doa/talbiyah dan refleksikan maknanya dalam kehidupan sehari-hari.",
        "Gunakan tombol 'Lihat Visualisasi AR' untuk melihat model 3D rukun tersebut di Ruang AR."
      ]
    },
    {
      num: 2,
      title: "Cara Mengakses Pengalaman 3D & WebAR",
      icon: Sparkles,
      color: "from-amber-400 to-hajj-gold",
      steps: [
        "Buka menu 'Ruang AR' dari beranda atau halaman materi.",
        "Gunakan pemilih rukun untuk berganti antar scene 3D (Rukun 1 s.d Rukun 6).",
        "Gunakan jari atau mouse untuk memutar (orbit), menggeser, dan memperbesar model 3D di viewer Assemblr.",
        "Tekan tombol 'Buka AR di Browser' untuk meluncurkan mode Web AR Assemblr di ponselmu tanpa perlu mengunduh aplikasi tambahan."
      ]
    },
    {
      num: 3,
      title: "Cara Memindai QR Marker Menggunakan Kamera",
      icon: Camera,
      color: "from-emerald-500 to-teal-700",
      steps: [
        "Siapkan gambar marker fisik (tersedia di tab 'Lihat Marker AR' untuk diunduh atau ditampilkan di layar lain).",
        "Klik tombol utama 'Aktifkan Kamera & Pindai Marker AR' pada halaman Ruang AR.",
        "Beri izin akses kamera saat peramban (browser) memintanya. Kamera belakang smartphone akan diprioritaskan otomatis.",
        "Arahkan kotak pembidik kamera ke QR Code marker hingga status berubah menjadi 'Marker Ditemukan'.",
        "Klik tombol konfirmasi untuk langsung membuka scene AR di browser."
      ]
    },
    {
      num: 4,
      title: "Cara Menjelajahi Peta Perjalanan Haji 3D",
      icon: MapPin,
      color: "from-blue-600 to-indigo-800",
      steps: [
        "Buka menu 'Peta Perjalanan' untuk melihat visualisasi isometrik padang pasir Mekkah.",
        "Geser layar untuk memutar sudut pandang 3D dan gunakan tombol zoom (+ / -) untuk memperbesar.",
        "Ketuk nomor pin lokasi (1 s.d 6) untuk membuka lembar informasi lokasi dan panduan amalan.",
        "Gunakan tombol 'Mode 2D' jika ingin melihat diagram alur ringkas perjalanan."
      ]
    },
    {
      num: 5,
      title: "Cara Mengerjakan Kuis & Memeriksa Hasil",
      icon: Award,
      color: "from-rose-500 to-pink-700",
      steps: [
        "Pilih menu 'Kuis' lalu tentukan kategori soal atau pilih 'Semua Soal'.",
        "Baca soal dengan teliti dan pilih salah satu dari 4 opsi jawaban (A, B, C, D).",
        "Setelah memilih, sistem akan langsung menampilkan apakah jawabanmu benar atau salah beserta kotak 'Penjelasan Jawaban'.",
        "Lanjutkan hingga soal ke-10 untuk melihat perolehan skor akhir (0-100), predikat kelulusan, dan riwayat skor yang tersimpan."
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 pb-24">
      
      {/* Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hajj-light text-hajj-primary text-xs font-bold border border-hajj-border">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Bantuan & Petunjuk Penggunaan</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-hajj-navy tracking-tight">
          Panduan Penggunaan Hajj Explorer
        </h1>
        <p className="text-xs sm:text-base text-slate-600 max-w-2xl">
          Ikuti panduan langkah demi langkah di bawah ini untuk memaksimalkan seluruh fitur edukasi yang ada di platform Hajj Explorer.
        </p>
      </div>

      {/* Privacy Guarantee Alert Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-hajj-border shadow-soft flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1 text-xs sm:text-sm text-slate-700">
          <p className="font-bold text-hajj-navy text-sm">
            Jaminan Privasi & Izin Kamera
          </p>
          <p className="leading-relaxed text-slate-600">
            Kamera perangkat <strong>hanya aktif</strong> setelah kamu secara eksplisit menekan tombol <em>"Aktifkan Kamera"</em>. Aliran video kamera diproses secara lokal di browsermu dan langsung dihentikan ketika kamu menutup pemindai atau berpindah halaman. Tidak ada gambar atau rekaman yang diunggah ke server manapun.
          </p>
        </div>
      </div>

      {/* 5 Guide Steps Cards */}
      <div className="space-y-6">
        {guideSteps.map((guide) => {
          const Icon = guide.icon;
          return (
            <div
              key={guide.num}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-hajj-border shadow-soft space-y-4 hover:shadow-card transition-shadow"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${guide.color} text-white flex items-center justify-center font-bold text-base shadow-md shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-hajj-primary">
                    Petunjuk Bagian 0{guide.num}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-hajj-navy leading-snug">
                    {guide.title}
                  </h3>
                </div>
              </div>

              <div className="pl-0 sm:pl-14 space-y-2.5">
                {guide.steps.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Button */}
      <div className="pt-4 flex justify-center">
        <Link
          to="/"
          className="py-3 px-8 rounded-xl bg-hajj-primary hover:bg-hajj-navy text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          <span>Mulai Menjelajahi Beranda</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
