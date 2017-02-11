/// <reference path="../AndroidPdfViewer.d.ts" />
import pdfviewer = com.github.barteksc.pdfviewer;
import * as fs from 'file-system';
import * as http from 'http';
import * as common from './plugin.common';

export class PDFView extends common.PDFView {
  private _android: pdfviewer.PDFView;
  private promise: Promise<void>;
  private tempFolder = fs.knownFolders.temp().getFolder('PDFViewer.temp/');

  private onLoadHandler = (() => {
    const pdfViewRef = new WeakRef(this);

    return new pdfviewer.listener.OnLoadCompleteListener({
      loadComplete: (numPages) => {
        common.PDFView.notifyOfEvent(common.PDFView.loadEvent, pdfViewRef);
      },
    });
  })();

  public get android() {
    return this._android;
  }

  public set android(value) {
    this._android = value;
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
      return this.cacheThenLoad(src);
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

  private _createUI() {
    this._android = new pdfviewer.PDFView(this._context, void 0);
    this.loadPDF(this.src);
  }
}
