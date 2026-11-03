import React from 'react';
import { Sparkles, Info, BookOpen, User, GraduationCap, Calendar, ShieldCheck, Heart, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mediaAssets } from '../config/assets';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 pb-24">
      
      {/* Brand & App Introduction Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-hajj-border shadow-card text-center space-y-5">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-hajj-primary to-hajj-secondary p-1 shadow-md mx-auto flex items-center justify-center">
          <img
            src={mediaAssets.kaabaIcon}
            alt="Hajj Explorer Logo"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-hajj-navy tracking-tight">
            HAJJ EXPLORER
          </h1>
          <p className="text-xs sm:text-sm font-bold text-hajj-primary uppercase tracking-widest">
            Jelajahi Manasik Haji dengan Augmented Reality
          </p>
        </div>

        <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          <strong>Hajj Explorer</strong> adalah platform media pembelajaran interaktif yang dirancang untuk membantu peserta didik dan calon jemaah memahami rukun, tahapan, dan nilai spiritual ibadah haji secara mendalam melalui integrasi teknologi <em>Web Augmented Reality (AR)</em>, visualisasi peta 3D isometrik, video edukasi, dan kuis evaluasi.
        </p>
      </div>

      {/* Capaian Pembelajaran (CP) & Tujuan Pembelajaran (TP) from Reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CP */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-hajj-border shadow-soft space-y-3">
          <div className="flex items-center gap-2.5 text-hajj-primary font-bold text-xs uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Capaian Pembelajaran (CP)</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Peserta didik memahami ketentuan ibadah haji dalam Islam, meliputi pengertian, hukum, syarat, rukun, wajib, larangan, serta tata cara pelaksanaannya. Peserta didik mampu menganalisis urutan pelaksanaan ibadah haji dan menunjukkan nilai ketaatan, kedisiplinan, persaudaraan, serta kesetaraan antharmanusia dalam pelaksanaan ibadah haji.
          </p>
        </div>

        {/* TP */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-hajj-border shadow-soft space-y-3">
          <div className="flex items-center gap-2.5 text-amber-700 font-bold text-xs uppercase tracking-wider">
            <Award className="w-4 h-4 text-hajj-gold" />
            <span>Tujuan Pembelajaran (TP)</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-hajj-primary font-bold">1.</span>
              <span>Menjelaskan pengertian, hukum, syarat, rukun, dan wajib haji secara tepat.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-hajj-primary font-bold">2.</span>
              <span>Mengidentifikasi tempat-tempat penting dan stasiun manasik dalam ibadah haji melalui peta interaktif.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-hajj-primary font-bold">3.</span>
              <span>Mengurutkan tahapan pelaksanaan ibadah haji sesuai tuntunan syariat.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-hajj-primary font-bold">4.</span>
              <span>Menganalisis perbedaan rukun dan wajib haji serta dampaknya.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-hajj-primary font-bold">5.</span>
              <span>Menjelaskan nilai-nilai yang terkandung dalam ibadah haji untuk kehidupan sehari-hari.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Profil Pengembang & Institusi (Placeholder Formats) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-hajj-border shadow-soft space-y-5">
        <div className="flex items-center gap-2 text-hajj-navy font-bold text-xs uppercase tracking-wider">
          <User className="w-4 h-4 text-hajj-primary" />
          <span>Informasi Pengembang & Proyek</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <p className="text-[11px] text-slate-500 font-medium">Pengembang Aplikasi</p>
            <p className="text-sm font-bold text-hajj-navy">[Ahmad Zaky Abdillah Atqa]</p>
            <p className="text-[11px] text-slate-400">NIM: [24050530048]</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <p className="text-[11px] text-slate-500 font-medium">Program Studi & Institusi</p>
            <p className="text-sm font-bold text-hajj-navy">[Pendidikan Teknologi Informasi]</p>
            <p className="text-[11px] text-slate-400">[Universitas Negeri Surabaya / Mitra]</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <p className="text-[11px] text-slate-500 font-medium">Tahun Pengembangan</p>
            <p className="text-sm font-bold text-hajj-navy">[2025 / 2026]</p>
            <p className="text-[11px] text-slate-400">Versi: 1.0.0 (WebAR Release)</p>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 italic">
          * Catatan: Data pengembang, institusi, dan tahun di atas disajikan dalam format placeholder dan dapat disesuaikan kembali sesuai kebutuhan administrasi akademik.
        </p>
      </div>

      {/* Sumber Referensi & Kredit Aset */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Sumber Referensi Fiqih */}
        <div className="bg-white rounded-3xl p-6 border border-hajj-border shadow-soft space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-hajj-navy flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-hajj-primary" />
            <span>Sumber Referensi Materi</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              <span>Buku Tuntunan Manasik Haji dan Umrah, Direktorat Jenderal Penyelenggaraan Haji dan Umrah (PHU), Kementerian Agama Republik Indonesia.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              <span>Fiqih Sunnah, Sayyid Sabiq (Bab Haji dan Umrah).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              <span>Al-Fiqh Al-Manhaji 'ala Madzhabil Imam Asy-Syafi'i, Dr. Musthafa Al-Khin, Dr. Musthafa Al-Bugha, Ali Asy-Syarbaji.</span>
            </li>
          </ul>
        </div>

        {/* Kredit Aset Visual & Teknologi */}
        <div className="bg-white rounded-3xl p-6 border border-hajj-border shadow-soft space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-hajj-navy flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-hajj-gold" />
            <span>Kredit Aset Visual & Teknologi</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-hajj-primary font-bold">•</span>
              <span>Assemblr EDU — Penyedia platform 3D & Augmented Reality scene manasik haji.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-hajj-primary font-bold">•</span>
              <span>Three.js — Engine visualisasi WebGL 3D untuk peta isometrik padang pasir.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-hajj-primary font-bold">•</span>
              <span>Lucide React Icons — Desain ikonografi bersih dan modern.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-hajj-primary font-bold">•</span>
              <span>ZXing Browser — Library pemindai QR Code untuk akses kamera smartphone.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Quote Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-hajj-navy to-hajj-primary text-white text-center space-y-2 shadow-card">
        <Heart className="w-8 h-8 text-hajj-gold mx-auto" />
        <blockquote className="text-base sm:text-lg font-serif italic max-w-xl mx-auto">
          "Haji bukan sekadar perjalanan fisik, tetapi perjalanan hati menuju ridha Allah Swt..."
        </blockquote>
      </div>

    </div>
  );
};
