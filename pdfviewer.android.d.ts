/// <reference path="AndroidPdfViewer.d.ts" />
import * as common from './pdfviewer.common';
import pdfviewer = com.github.barteksc.pdfviewer;
export declare class PDFViewer extends common.PDFViewer {
    private _android;
    constructor();
    android: pdfviewer.PDFView;
    loadPDF(src: string): void;
    private _createUI();
}
