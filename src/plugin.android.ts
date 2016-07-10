/// <reference path="../AndroidPdfViewer.d.ts" />
import pdfviewer = com.github.barteksc.pdfviewer;
import * as common from './plugin.common';
import * as fs from 'file-system';
import * as http from 'http';

export class PDFView extends common.PDFView {
  private _android: pdfviewer.PDFView;
  private tempFilePath = fs.path
    .join(fs.knownFolders.temp().path, 'PDFViewer.temp1873621812.pdf');

  public get android() {
    return this._android;
  }

  public set android(value) {
    this._android = value;
  }

  public load(src: string) {
    if (src.indexOf('://') >= 0 && src.indexOf('file://') !== 0) {
      // AndroidPdfViewer cannot load from remote URLs, download to cache...

      http.getFile(src, this.tempFilePath).then(file => {
        this.load(file.path);
      }).catch(error => {
        console.error(error);
      });

      return;
    }

    if (src.indexOf('file://') !== 0) {
      src = 'file://' + src;
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

  private _createUI() {
    this._android = new pdfviewer.PDFView(this._context, void 0);
    this.load(this.src);
  }
}