/**
 * HAJJ EXPLORER - Asset Configuration
 * File konfigurasi terpusat untuk seluruh aset visual, audio, dan video.
 * Pengguna dapat dengan mudah mengganti jalur aset di sini tanpa merubah struktur komponen.
 */

export const stageAssets = {
  ihram: "/assets/images/stages/ihram.png",
  arafah: "/assets/images/stages/arafah.png",
  tawaf: "/assets/images/stages/tawaf.png",
  sai: "/assets/images/stages/sai.png",
  tahallul: "/assets/images/stages/tahallul.png",
  tertib: "/assets/images/stages/tertib.png",
};

export const locationAssets = {
  kabah: "/assets/images/locations/kabah.jpg",
  safa: "/assets/images/locations/safa.jpg",
  arafah: "/assets/images/locations/arafah.jpg",
  muzdalifah: "/assets/images/locations/muzdalifah.jpg",
  mina: "/assets/images/locations/mina.jpg",
  jamarat: "/assets/images/locations/jamarat.jpg",
};

export const mediaAssets = {
  videoPembelajaran: "/assets/videos/video-pembelajaran.mp4",
  videoThumbnail: "/assets/images/hero/video-poster.jpg",
  assemblrMarker: "/assets/markers/assemblr-marker.png",
  uiConcept: "/references/ui-concept.jpg",
  kaabaIcon: "/assets/images/logo/kaaba-icon.svg",
  logoText: "/assets/images/logo/logo-text.svg"
};

/**
 * Fallback image generator / placeholder jika gambar eksternal gagal dimuat
 */
export const getStageFallback = (stageName: string, stageNumber: number): string => {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect fill="%23176B9B" width="600" height="400"/><rect fill="%23258FBA" x="20" y="20" width="560" height="360" rx="16"/><circle cx="300" cy="180" r="70" fill="%23E8F5FA" opacity="0.2"/><text x="300" y="170" fill="%23F4B942" font-size="36" font-family="sans-serif" font-weight="bold" text-anchor="middle">Rukun ${stageNumber}</text><text x="300" y="215" fill="%23FFFFFF" font-size="24" font-family="sans-serif" text-anchor="middle">${encodeURIComponent(stageName)}</text><text x="300" y="260" fill="%23E8F5FA" font-size="14" font-family="sans-serif" opacity="0.8" text-anchor="middle">Hajj Explorer AR Education</text></svg>`;
};

export const getLocationFallback = (locationName: string, locationNumber: number): string => {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect fill="%23123B56" width="600" height="400"/><rect fill="%23176B9B" x="20" y="20" width="560" height="360" rx="16"/><circle cx="300" cy="180" r="70" fill="%23F4B942" opacity="0.2"/><text x="300" y="170" fill="%23F4B942" font-size="34" font-family="sans-serif" font-weight="bold" text-anchor="middle">Lokasi ${locationNumber}</text><text x="300" y="215" fill="%23FFFFFF" font-size="22" font-family="sans-serif" text-anchor="middle">${encodeURIComponent(locationName)}</text><text x="300" y="260" fill="%23E8F5FA" font-size="14" font-family="sans-serif" opacity="0.8" text-anchor="middle">Peta Perjalanan Haji</text></svg>`;
};
