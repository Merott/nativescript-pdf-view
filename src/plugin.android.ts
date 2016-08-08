/// <reference path="../AndroidPdfViewer.d.ts" />
import pdfviewer = com.github.barteksc.pdfviewer;
import * as common from './plugin.common';
import * as fs from 'file-system';
import * as http from 'http';

export class PDFView extends common.PDFView {
  private _android: pdfviewer.PDFView;
  private promise: Promise<any>;
  private tempFolder = fs.knownFolders.temp().getFolder('PDFViewer.temp/');

  public get android() {
    return this._android;
  }

  public set android(value) {
    this._android = value;
  }

  public load(src: string) {
    if (!src || !this.android) {
      return;
    }

    // reset any previous promise since we've called load again
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
      .enableSwipe(true)
      .enableDoubletap(true)
      .swipeVertical(true)
      .showMinimap(false)
      .load();
  }

  private cacheThenLoad(url: string) {
    // clear everything in cache
    this.tempFolder.clear().then(() => {

      // download to cache
      const promise = this.promise = http
        .getFile(url, `${this.tempFolder.path}/${java.util.UUID.randomUUID()}`)
        .then(file => {
          if (this.promise === promise) {  // make sure we haven't switched
            this.load(file.path);
          }
        }).catch(error => {
          console.error(error);
        });
    });
  }

  private _createUI() {
    this._android = new pdfviewer.PDFView(this._context, void 0);
    this.load(this.src);
  }
}