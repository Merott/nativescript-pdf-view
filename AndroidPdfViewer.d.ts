/// <reference path="./node_modules/tns-platform-declarations/android.d.ts" />

declare module com.github.barteksc.pdfviewer {
  export class PDFView extends android.view.SurfaceView {
    fromFile(file: java.io.File): Configurator;
    fromUri(uri: android.net.Uri): Configurator;
  }

  export module listener {
    export interface OnErrorListener {
      onError(throwable: java.lang.Throwable): void;
    }

    interface IOnLoadCompleteListener {
      /**
       * Called when the PDF is loaded
       * @param numPages the number of pages in this PDF file
       */
      loadComplete(numPages: number): void;
    }

    export class OnLoadCompleteListener implements IOnLoadCompleteListener {
      constructor(implementation: IOnLoadCompleteListener);

      /**
       * Called when the PDF is loaded
       * @param numPages the number of pages in this PDF file
       */
      loadComplete(numPages: number): void;
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
  onLoad(
    onLoadCompleteListener: pdfviewer.listener.OnLoadCompleteListener
  ): this;
  swipeHorizontal(horizontal: boolean): this;
}
