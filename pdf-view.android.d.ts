/// <reference path="AndroidPdfViewer.d.ts" />
import pdfviewer = com.github.barteksc.pdfviewer;
import { PDFViewCommon } from './pdf-view.common';
export declare class PDFView extends PDFViewCommon {
    private promise;
    private tempFolder;
    private onLoadHandler;
    android: pdfviewer.PDFView;
    createNativeView(): pdfviewer.PDFView;
    loadPDF(src: string): void;
    private cacheThenLoad(url);
}
