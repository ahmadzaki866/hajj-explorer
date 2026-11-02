import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Sparkles, Camera, ExternalLink, ArrowLeft, Download, 
  ChevronDown, ChevronUp, Check, Layers, Box, Eye
} from 'lucide-react';
import { ASSEMBLR_CONFIG, AssemblrScene } from '../config/assemblr';
import { mediaAssets } from '../config/assets';
import { ARViewer } from '../components/ARViewer';
import { QRScannerModal } from '../components/QRScannerModal';

export const ARPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'viewer' | 'marker'>('viewer');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  // Read initial scene index from query param ?scene=0..5
  const sceneParam = searchParams.get('scene');
  const initialIndex = sceneParam !== null && !isNaN(Number(sceneParam))
    ? Math.max(0, Math.min(ASSEMBLR_CONFIG.scenes.length - 1, Number(sceneParam)))
    : 0;

  const [activeScene, setActiveScene] = useState<AssemblrScene>(ASSEMBLR_CONFIG.scenes[initialIndex]);

  useEffect(() => {
    if (sceneParam !== null && !isNaN(Number(sceneParam))) {
      const idx = Math.max(0, Math.min(ASSEMBLR_CONFIG.scenes.length - 1, Number(sceneParam)));
      setActiveScene(ASSEMBLR_CONFIG.scenes[idx]);
    }
  }, [sceneParam]);

  const handleSelectScene = (scene: AssemblrScene) => {
    setActiveScene(scene);
    setSearchParams({ scene: (scene.id - 1).toString() });
    setIsSelectorOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-6 pb-24">
      
      {/* Page Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200 mb-1">
            <Sparkles className="w-3 h-3 text-hajj-gold" />
            <span>Assemblr EDU WebAR</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-hajj-navy tracking-tight">
            Augmented Reality Experience
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-xl hidden sm:block">
            Jelajahi visualisasi 3D ibadah haji langsung di mejamu melalui teknologi Web Augmented Reality.
          </p>
        </div>

        <Link
          to="/materi"
          className="py-2 px-3 sm:px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Materi</span>
        </Link>
      </div>

      {/* HERO FEATURE: Tombol Aktifkan Kamera (Dibuat Sangat Menonjol dan Utama) */}
      <div className="relative group">
        <button
          type="button"
          onClick={() => setIsScannerOpen(true)}
          className="w-full py-4 sm:py-5 px-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-hajj-primary via-hajj-secondary to-hajj-navy hover:from-hajj-navy hover:to-hajj-primary text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-between gap-4 border border-white/20 active:scale-[0.98] animate-camera-glow cursor-pointer"
        >
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30 text-hajj-gold shadow-inner">
              <Camera className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-hajj-gold bg-black/30 px-2 py-0.5 rounded-md">
                  Fitur Utama
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping hidden sm:inline-block" />
              </div>
              <h2 className="text-base sm:text-xl font-extrabold text-white leading-tight mt-0.5">
                Aktifkan Kamera & Pindai Marker AR
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-200 mt-0.5">
                Pindai marker QR untuk memunculkan model 3D di ruanganmu
              </p>
            </div>
          </div>

          <div className="hidden xs:flex flex-col items-center justify-center px-4 py-2 rounded-xl bg-hajj-gold text-hajj-navy font-bold text-xs shrink-0 shadow-md">
            <span>Buka</span>
            <span>Kamera</span>
          </div>
        </button>
      </div>

      {/* Pilihan 6 Rukun Haji Dijadikan 1 Selector Compact dengan Opsi Pengganti */}
      <div className="relative">
        <div className="bg-white rounded-2xl border border-hajj-border shadow-soft overflow-hidden transition-all">
          
          {/* Main Selector Button (Displays current active Rukun) */}
          <button
            type="button"
            onClick={() => setIsSelectorOpen(!isSelectorOpen)}
            className="w-full p-3.5 sm:p-4 flex items-center justify-between gap-3 text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-8 h-8 rounded-xl bg-hajj-primary text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                {activeScene.id}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-hajj-primary">
                    Rukun Haji Terpilih:
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    ({activeScene.alias})
                  </span>
                </div>
                <p className="text-sm sm:text-base font-bold text-hajj-navy truncate leading-snug">
                  Rukun {activeScene.id}: {activeScene.title.split('. ')[1] || activeScene.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-hajj-light text-hajj-primary text-xs font-semibold">
                Ganti Rukun
              </span>
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                {isSelectorOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </button>

          {/* Collapsible Dropdown Options (The 6 Rukun Scenes) */}
          {isSelectorOpen && (
            <div className="p-3 sm:p-4 border-t border-hajj-border bg-slate-50/60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 animate-slide-down">
              {ASSEMBLR_CONFIG.scenes.map((scene) => {
                const isSelected = activeScene.id === scene.id;
                return (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => handleSelectScene(scene)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                      isSelected
                        ? 'border-hajj-primary bg-hajj-light text-hajj-primary shadow-sm font-bold ring-1 ring-hajj-primary/30'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-hajj-primary text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {scene.id}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold truncate">
                          {scene.title.split('. ')[1] || scene.title}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {scene.alias}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-hajj-primary shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

        </div>
      </div>

      {/* Area AR (3D WebGL Viewer & Marker Preview Tabs) */}
      <div className="space-y-3">
        
        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-hajj-border pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('viewer')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'viewer'
                ? 'bg-hajj-primary text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D WebGL Viewer</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('marker')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'marker'
                ? 'bg-hajj-primary text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Lihat Marker AR</span>
          </button>
        </div>

        {/* Tab 1: Embedded 3D Viewer */}
        {activeTab === 'viewer' && (
          <ARViewer activeScene={activeScene} />
        )}

        {/* Tab 2: Marker Preview & Instructions */}
        {activeTab === 'marker' && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-hajj-border shadow-soft space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Marker Image Display */}
              <div className="md:col-span-5 flex flex-col items-center space-y-3">
                <div className="w-full max-w-xs aspect-square rounded-2xl bg-slate-50 p-3 border-2 border-dashed border-hajj-secondary/40 shadow-inner flex items-center justify-center">
                  <img
                    src={mediaAssets.assemblrMarker}
                    alt="Assemblr Marker"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <a
                  href={mediaAssets.assemblrMarker}
                  download="assemblr-marker-hajj.png"
                  className="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh File Marker untuk Dicetak</span>
                </a>
              </div>

              {/* Instructions */}
              <div className="md:col-span-7 space-y-3.5">
                <div className="space-y-0.5">
                  <h3 className="text-base sm:text-lg font-bold text-hajj-navy">
                    Petunjuk Memindai Marker Augmented Reality
                  </h3>
                  <p className="text-xs text-slate-500">
                    Arahkan kamera ke pola marker geometris hitam-putih di samping
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-hajj-light/60 border border-hajj-border">
                    <span className="w-5 h-5 rounded-full bg-hajj-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <strong>Siapkan Marker:</strong> Buka gambar marker di layar lain atau cetak di kertas.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-hajj-light/60 border border-hajj-border">
                    <span className="w-5 h-5 rounded-full bg-hajj-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <strong>Pindai QR:</strong> Klik tombol besar <em>"Aktifkan Kamera & Pindai Marker AR"</em> di atas.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-hajj-light/60 border border-hajj-border">
                    <span className="w-5 h-5 rounded-full bg-hajj-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <strong>Web AR Browser:</strong> Nikmati objek 3D di browser smartphone tanpa perlu menginstal aplikasi.
                    </div>
                  </div>
                </div>

                <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsScannerOpen(true)}
                    className="py-2.5 px-5 rounded-xl bg-hajj-primary hover:bg-hajj-navy text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Camera className="w-4 h-4 text-hajj-gold" />
                    <span>Mulai Pindai Sekarang</span>
                  </button>

                  <a
                    href={ASSEMBLR_CONFIG.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-4 rounded-xl border border-hajj-primary text-hajj-primary hover:bg-hajj-light text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Buka Web AR Langsung</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

      {/* QR Scanner Modal */}
      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
      />

    </div>
  );
};
