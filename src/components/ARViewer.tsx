import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Maximize2, Minimize2, RotateCcw, Sparkles, AlertCircle, Info, ShieldCheck } from 'lucide-react';
import { ASSEMBLR_CONFIG, AssemblrScene } from '../config/assemblr';

interface ARViewerProps {
  activeScene: AssemblrScene;
  onSelectScene?: (scene: AssemblrScene) => void;
}

export const ARViewer: React.FC<ARViewerProps> = ({ activeScene }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const handleReload = () => {
    setIsLoading(true);
    setLoadError(false);
    if (iframeRef.current) {
      iframeRef.current.src = ASSEMBLR_CONFIG.embedUrl;
    }
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().then(() => {
          setIsFullscreen(true);
        }).catch(() => {
          setIsFullscreen(true);
        });
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch(() => {
          setIsFullscreen(false);
        });
      } else {
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* 3D WebGL Viewer Container */}
      <div 
        ref={containerRef}
        className={isFullscreen 
          ? "fixed inset-0 z-50 w-screen h-screen bg-slate-950 flex flex-col"
          : "relative w-full aspect-[4/3] sm:aspect-[16/9] min-h-[380px] sm:min-h-[480px] rounded-3xl overflow-hidden bg-slate-900 border border-hajj-border shadow-card group"
        }
      >
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full border-4 border-hajj-primary border-t-hajj-gold animate-spin" />
            <div>
              <p className="font-bold text-base text-white">Memuat 3D Viewer Assemblr EDU...</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Mengunduh aset scene 3D "{activeScene.title}" dari server Assemblr
              </p>
            </div>
          </div>
        )}

        {/* Load Error State */}
        {loadError && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/95 text-white p-6 text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-amber-400" />
            <div className="space-y-1">
              <p className="font-bold text-base">Gagal Menghubungkan ke Viewer Assemblr</p>
              <p className="text-xs text-slate-400 max-w-md">
                Periksa koneksi internetmu atau buka Web AR Assemblr langsung melalui browser.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleReload}
                className="px-4 py-2 rounded-xl bg-hajj-primary text-white text-xs font-semibold"
              >
                Coba Lagi
              </button>
              <a
                href={ASSEMBLR_CONFIG.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-white text-slate-800 text-xs font-semibold"
              >
                Buka di Tab Baru
              </a>
            </div>
          </div>
        )}

        {/* The Assemblr Embed Iframe */}
        <iframe
          ref={iframeRef}
          src={ASSEMBLR_CONFIG.embedUrl}
          title={`Assemblr 3D Viewer - ${activeScene.title}`}
          allow="camera; microphone; xr-spatial-tracking; fullscreen; accelerometer; gyroscope"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setLoadError(true);
          }}
          className="w-full h-full border-0 relative z-0"
        />

        {/* Top Control Overlay Pill */}
        <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">{activeScene.title}</span>
          </div>

          <div className="pointer-events-auto flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleReload}
              className="p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-colors"
              title="Muat Ulang Viewer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleFullscreen}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md border transition-all flex items-center gap-1.5 ${
                isFullscreen 
                  ? 'bg-amber-400 hover:bg-amber-500 border-amber-300 text-slate-950 font-bold shadow-lg' 
                  : 'bg-black/60 hover:bg-black/80 border-white/20 text-white'
              }`}
              title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh (Fullscreen)"}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-4 h-4" />
                  <span>Keluar Fullscreen</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4" />
                  <span>Layar Penuh</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Floating Hint inside Viewer */}
        <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none flex justify-center">
          <div className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] flex items-center gap-2 border border-white/20">
            <Info className="w-3.5 h-3.5 text-hajj-gold shrink-0" />
            <span>Klik & geser untuk memutar objek 3D. Gunakan cubit/scroll untuk zoom.</span>
          </div>
        </div>
      </div>

      {/* Action Buttons below Viewer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-hajj-border shadow-soft">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
            <Sparkles className="w-5 h-5 text-hajj-gold" />
          </div>
          <div>
            <p className="text-xs font-bold text-hajj-navy">
              Ingin Menampilkan Objek 3D di Duniamu?
            </p>
            <p className="text-[11px] text-slate-500">
              Buka Web AR Assemblr langsung melalui browser smartphone tanpa instal aplikasi!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <a
            href={ASSEMBLR_CONFIG.projectUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 sm:flex-none py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-400 to-hajj-gold hover:from-amber-500 hover:to-amber-600 text-hajj-navy text-xs font-bold shadow-md shadow-amber-400/25 flex items-center justify-center gap-2 transition-all"
          >
            <span>Buka AR di Browser</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* Technical Honesty Note & Explanation */}
      <div className="p-4 rounded-2xl bg-hajj-light/70 border border-hajj-border text-xs text-hajj-navy space-y-2">
        <div className="flex items-center gap-2 font-bold text-hajj-primary">
          <ShieldCheck className="w-4 h-4" />
          <span>Informasi Teknis & Panduan Akses WebAR</span>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Viewer di atas menyajikan model 3D interaktif 6 scene ibadah haji langsung di dalam website. Untuk mengaktifkan mode <strong>Augmented Reality berbasis pelacakan kamera (Marker-based AR)</strong>, Assemblr memerlukan akses sensor kamera native browser secara penuh melalui <em>Web AR Assemblr</em>. Kamu dapat langsung membuka tautan resmi di atas tanpa perlu menginstal aplikasi mobile apapun dari App Store / Play Store.
        </p>
      </div>
    </div>
  );
};
