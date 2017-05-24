/// <reference path="./AndroidPdfViewer.d.ts" />

import pdfviewer = com.github.barteksc.pdfviewer;
import * as fs from 'tns-core-modules/file-system';
import * as http from 'tns-core-modules/http';

import { PDFViewCommon, srcProperty } from './pdf-view.common';

export class PDFView extends PDFViewCommon {
  private promise: Promise<void>;
  private tempFolder = fs.knownFolders.temp().getFolder('PDFViewer.temp/');

  private onLoadHandler = (() => {
    const pdfViewRef = new WeakRef(this);

    return new pdfviewer.listener.OnLoadCompleteListener({
      loadComplete: numPages => {
        PDFViewCommon.notifyOfEvent(PDFViewCommon.loadEvent, pdfViewRef);
      },
    });
  })();

  public get android() {
    return this.nativeView as pdfviewer.PDFView;
  }

  public set android(value) {
    this.nativeView = value;
  }

  public createNativeView() {
    // tslint:disable-next-line:no-unsafe-any
    return new pdfviewer.PDFView(this._context, null);
  }

  public [srcProperty.setNative](value: string) {
    this.loadPDF(value);
  }

  public loadPDF(src: string) {
    if (!src || !this.android) {
      return;
    }

    // reset any previous promise since we've called loadPDF again
    this.promise = void 0;

    if (src.indexOf('://') === -1) {
      src = 'file://' + src;
    } else if (src.indexOf('file://') !== 0) {
      // AndroidPdfViewer cannot load from remote URLs, download to cache
      this.cacheThenLoad(src);
      return;
    }

    const uri = android.net.Uri.parse(src);

    this.android
      .fromUri(uri)
      .onLoad(this.onLoadHandler)
      .load();
  }

  private cacheThenLoad(url: string) {
    // clear everything in cache
    this.tempFolder.clear().then(() => {

      // download to cache
      const promise = this.promise = http
        .getFile(url, `${this.tempFolder.path}/${Date.now()}.pdf`)
        .then(file => {
          if (this.promise === promise) {  // make sure we haven't switched
            this.loadPDF(file.path);
          }
        }).catch(error => {
          console.error(error);
        });
    });
  }
}
