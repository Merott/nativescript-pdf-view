import * as common from './pdfview.common';
export declare class PdfView extends common.PdfView {
    private _ios;
    constructor();
    ios: any;
    loadPDF(src: string): void;
    private init();
}
