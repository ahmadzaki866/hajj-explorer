import React, { useEffect, useRef, useState } from 'react';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';
import { X, Camera, Sparkles, AlertCircle, CheckCircle, ExternalLink, RefreshCw, Eye } from 'lucide-react';
import { validateAssemblrUrl, ASSEMBLR_CONFIG } from '../config/assemblr';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDetectedTargetProject?: (url: string) => void;
}

type ScanStatus = 
  | 'idle'
  | 'requesting'
  | 'waiting' // "Menunggu marker"
  | 'found'   // "Marker ditemukan"
  | 'unrecognized' // "QR tidak dikenali"
  | 'denied'  // "Kamera tidak diizinkan"
  | 'unavailable'; // "Kamera tidak tersedia"

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  onDetectedTargetProject
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);

  const [status, setStatus] = useState<ScanStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [scannedResult, setScannedResult] = useState<{
    rawText: string;
    isValidAssemblr: boolean;
    isTargetProject: boolean;
    message: string;
  } | null>(null);

  const [availableDevices, setAvailableDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');

  // Start scanner when opened
  useEffect(() => {
    if (!isOpen) {
      stopScanner();
      return;
    }

    startScanner();

    return () => {
      stopScanner();
    };
  }, [isOpen, selectedDeviceId]);

  const startScanner = async () => {
    setStatus('requesting');
    setScannedResult(null);
    setErrorMessage('');

    try {
      const codeReader = new BrowserQRCodeReader();

      // List video input devices to prioritize environment (rear) camera
      const videoInputDevices = await BrowserQRCodeReader.listVideoInputDevices();
      setAvailableDevices(videoInputDevices);

      let targetDeviceId = selectedDeviceId;
      if (!targetDeviceId && videoInputDevices.length > 0) {
        // Find back camera if available
        const backCamera = videoInputDevices.find(device => 
          device.label.toLowerCase().includes('back') || 
          device.label.toLowerCase().includes('belakang') ||
          device.label.toLowerCase().includes('environment')
        );
        targetDeviceId = backCamera ? backCamera.deviceId : videoInputDevices[0].deviceId;
        setSelectedDeviceId(targetDeviceId);
      }

      if (!videoRef.current) return;

      setStatus('waiting'); // Menunggu marker

      const controls = await codeReader.decodeFromVideoDevice(
        targetDeviceId || undefined,
        videoRef.current,
        (result, error) => {
          if (result) {
            const text = result.getText();
            handleScanSuccess(text);
          }
        }
      );

      controlsRef.current = controls;
    } catch (err: any) {
      console.warn("Scanner initialization error:", err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setStatus('denied'); // Kamera tidak diizinkan
        setErrorMessage("Izin kamera ditolak oleh pengguna atau browser. Silakan aktifkan izin kamera di pengaturan browser.");
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setStatus('unavailable'); // Kamera tidak tersedia
        setErrorMessage("Tidak ditemukan perangkat kamera yang dapat digunakan pada perangkat ini.");
      } else {
        setStatus('unavailable');
        setErrorMessage(err.message || "Gagal mengaktifkan kamera.");
      }
    }
  };

  const stopScanner = () => {
    if (controlsRef.current) {
      controlsRef.current.stop();
      controlsRef.current = null;
    }
    // Also explicitly stop any remaining tracks from video element
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setStatus('idle');
  };

  const handleScanSuccess = (text: string) => {
    // Validate the scanned URL
    const validation = validateAssemblrUrl(text);

    if (validation.isValid) {
      setStatus('found'); // Marker ditemukan
      setScannedResult({
        rawText: text,
        isValidAssemblr: true,
        isTargetProject: validation.isTargetProject,
        message: validation.message
      });
      if (validation.isTargetProject && onDetectedTargetProject) {
        onDetectedTargetProject(text);
      }
    } else {
      setStatus('unrecognized'); // QR tidak dikenali
      setScannedResult({
        rawText: text,
        isValidAssemblr: false,
        isTargetProject: false,
        message: "QR Code terdeteksi, namun bukan marker proyek resmi Assemblr EDU Hajj Explorer."
      });
    }
  };

  const handleRetry = () => {
    setScannedResult(null);
    setStatus('waiting');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-hajj-navy text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-hajj-primary flex items-center justify-center">
              <Camera className="w-5 h-5 text-hajj-gold" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold leading-tight">
                Pemindai Marker AR
              </h3>
              <p className="text-xs text-slate-300">
                Arahkan kamera ke QR Code Assemblr
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Tutup Pemindai"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera Viewport Area */}
        <div className="relative aspect-[4/3] w-full bg-black overflow-hidden flex items-center justify-center">
          
          <video
            ref={videoRef}
            playsInline
            muted
            className="w-full h-full object-cover"
          />

          {/* Viewfinder Target Overlay (Active when waiting) */}
          {status === 'waiting' && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="relative w-64 h-64 border-2 border-white/60 rounded-2xl overflow-hidden shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
                {/* 4 Corner Markers */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-hajj-gold rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-hajj-gold rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-hajj-gold rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-hajj-gold rounded-br-lg" />

                {/* Animated Scan Line */}
                <div className="scan-line w-full" />
              </div>
            </div>
          )}

          {/* Status Indicator Pill */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
            {status === 'waiting' && (
              <span className="px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-2 border border-white/20 shadow-md">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                Menunggu marker...
              </span>
            )}
            {status === 'requesting' && (
              <span className="px-4 py-1.5 rounded-full bg-black/70 text-white text-xs font-semibold flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-hajj-primary" />
                Meminta izin kamera...
              </span>
            )}
          </div>

          {/* Camera Error / Denied Overlays */}
          {(status === 'denied' || status === 'unavailable') && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-900/95 text-white text-center space-y-3">
              <AlertCircle className="w-12 h-12 text-red-400" />
              <p className="font-bold text-sm text-red-200">
                {status === 'denied' ? 'Kamera Tidak Diizinkan' : 'Kamera Tidak Tersedia'}
              </p>
              <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
                {errorMessage}
              </p>
              <button
                type="button"
                onClick={startScanner}
                className="mt-2 px-4 py-2 rounded-xl bg-hajj-primary text-white text-xs font-bold"
              >
                Coba Lagi
              </button>
            </div>
          )}

        </div>

        {/* Detection Result Card */}
        {scannedResult && (
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3 animate-in slide-in-from-bottom duration-200">
            
            {scannedResult.isValidAssemblr ? (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-emerald-800">
                      Marker Ditemukan & Valid!
                    </p>
                    <p className="text-xs text-slate-600 font-mono break-all mt-0.5">
                      {scannedResult.rawText}
                    </p>
                    <p className="text-xs font-semibold text-hajj-primary mt-1">
                      {scannedResult.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={scannedResult.rawText}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-hajj-gold hover:from-amber-500 hover:to-amber-600 text-hajj-navy text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Lanjutkan ke Web AR Assemblr</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={handleRetry}
                    className="py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-medium"
                  >
                    Pindai Ulang
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="flex items-start gap-3 text-red-600">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold">QR Tidak Dikenali</p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {scannedResult.message}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRetry}
                  className="w-full py-2 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold"
                >
                  Pindai Ulang Marker
                </button>
              </div>
            )}

          </div>
        )}

        {/* Footer Guidance */}
        <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-hajj-gold" />
            <span>Kamera belakang smartphone diprioritaskan otomatis</span>
          </div>

          <a
            href={ASSEMBLR_CONFIG.projectUrl}
            target="_blank"
            rel="noreferrer"
            className="text-hajj-primary hover:underline font-semibold"
          >
            Buka Langsung
          </a>
        </div>

      </div>

    </div>
  );
};
