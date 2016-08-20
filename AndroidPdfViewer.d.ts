/// <reference path="./node_modules/tns-platform-declarations/tns-core-modules/android17.d.ts" />

declare module com.github.barteksc.pdfviewer {
  export class PDFView extends android.view.SurfaceView {
    fromFile(file: java.io.File): Configurator;
    fromUri(uri: android.net.Uri): Configurator;
  }

  export module listener {
    export interface OnErrorListener {
      onError(throwable: java.lang.Throwable): void;
    }
  }
}

import pdfviewer = com.github.barteksc.pdfviewer;

declare class Configurator {
  load(): void;
  defaultPage(pageNumber: number): this;
  pages(...pageNumbers: number[]): this;
  enableDoubletap(enable: boolean): this;
  enableSwipe(enable: boolean): this;
  showMinimap(show: boolean): this;
  swipeVertical(swipe: boolean): this;
}