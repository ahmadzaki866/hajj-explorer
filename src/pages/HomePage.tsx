import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { StageCard } from '../components/StageCard';
import { VideoPlayer } from '../components/VideoPlayer';
import { STAGES_DATA } from '../data/stages';
import { BookOpen, Sparkles, Compass, ArrowRight, Camera } from 'lucide-react';
import { mediaAssets } from '../config/assets';

export const HomePage: React.FC = () => {
  const videoSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToVideo = () => {
    if (videoSectionRef.current) {
      videoSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-10 sm:space-y-14 pb-16">
      
      {/* Hero Section */}
      <HeroSection onScrollToVideo={scrollToVideo} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">

        {/* Section D: 6 Rukun Haji Cards */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5">
            <div>
              <div className="flex items-center gap-2 text-hajj-primary font-bold text-xs uppercase tracking-wider mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Rukun Haji Pokok</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-hajj-navy tracking-tight">
                6 Rukun Ibadah Haji
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 max-w-xl">
                Amalan pokok yang wajib dilaksanakan secara berurutan dan menentukan keabsahan ibadah haji.
              </p>
            </div>

            <Link
              to="/materi"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-hajj-primary hover:text-hajj-navy transition-colors self-start sm:self-auto group"
            >
              <span>Buka Seluruh Materi</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 6 Stage Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {STAGES_DATA.map((stage) => (
              <StageCard
                key={stage.id}
                stage={stage}
              />
            ))}
          </div>
        </section>

        {/* Section E: Video Pembelajaran */}
        <section ref={videoSectionRef} className="pt-2 scroll-mt-20">
          <div className="bg-white rounded-3xl p-4 sm:p-7 border border-hajj-border shadow-soft">
            <VideoPlayer title="Belajar Manasik Haji" />
          </div>
        </section>

        {/* Dynamic Interactive Features Showcase: Peta 3D & Marker AR */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          
          {/* Peta 3D Feature Card */}
          <div className="bg-gradient-to-br from-hajj-navy via-hajj-primary to-hajj-secondary rounded-3xl p-6 sm:p-7 text-white flex flex-col justify-between space-y-5 shadow-card hover:shadow-elevated transition-shadow">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-hajj-gold text-xs font-bold border border-white/10">
                <Compass className="w-3.5 h-3.5" />
                <span>Eksplorasi 3D Isometrik</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold leading-snug">
                Peta Perjalanan Haji 3D
              </h3>
              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                Jelajahi pemandangan isometrik 6 stasiun perjalanan: Masjidil Haram, Bukit Safa-Marwah, Padang Arafah, Muzdalifah, Lembah Mina, hingga Jamarat.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/peta"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-hajj-gold hover:bg-amber-400 text-hajj-navy font-bold text-xs shadow-md transition-all active:scale-95"
              >
                <Compass className="w-4 h-4" />
                <span>Buka Peta Perjalanan 3D</span>
              </Link>
            </div>
          </div>

          {/* Marker AR Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-hajj-border shadow-soft flex flex-col sm:flex-row items-center gap-5 hover:shadow-card transition-shadow">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-slate-50 p-2 border border-slate-200 shrink-0 shadow-inner flex items-center justify-center">
              <img
                src={mediaAssets.assemblrMarker}
                alt="Assemblr QR Marker"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-2.5 flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-hajj-gold" />
                <span>Marker AR Resmi</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-hajj-navy leading-snug">
                Pindai Marker Assemblr EDU
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Arahkan kamera smartphone ke QR Code untuk melihat objek 3D hidup di sekitarmu melalui Web AR.
              </p>
              <div className="pt-1 flex flex-wrap gap-2 justify-center sm:justify-start">
                <Link
                  to="/ar"
                  className="py-2.5 px-4 rounded-xl bg-hajj-primary hover:bg-hajj-navy text-white text-xs font-semibold flex items-center gap-1.5 transition-colors active:scale-95"
                >
                  <Camera className="w-3.5 h-3.5 text-hajj-gold" />
                  <span>Aktifkan Kamera</span>
                </Link>
                <a
                  href={mediaAssets.assemblrMarker}
                  download="assemblr-marker.png"
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  Unduh
                </a>
              </div>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
};
