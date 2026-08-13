import { ScanPreset } from '../types';
import { SCAN_PRESETS } from '../data/recipes';

export class FoodScannerService {
  private stream: MediaStream | null = null;

  async startCamera(videoElement: HTMLVideoElement): Promise<MediaStream> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      this.stream = stream;
      videoElement.srcObject = stream;
      return stream;
    } catch (err) {
      throw new Error('Камера недоступна. Выберите снимок из галереи.');
    }
  }

  stopCamera(videoElement: HTMLVideoElement): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    videoElement.srcObject = null;
  }

  getPresetResult(presetKey: string): ScanPreset | null {
    return SCAN_PRESETS[presetKey] || null;
  }
}

export const scannerService = new FoodScannerService();
