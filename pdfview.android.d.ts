/// <reference path="AndroidPdfViewer.d.ts" />
import * as common from './pdfview.common';
import pdfviewer = com.github.barteksc.pdfviewer;
export declare class PdfView extends common.PdfView {
    private _android;
    constructor();
    android: pdfviewer.PDFView;
    loadPDF(src: string): void;
    private _createUI();
}
