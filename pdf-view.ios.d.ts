import { PDFViewCommon } from './pdf-view.common';
export declare class PDFView extends PDFViewCommon {
    private delegate;
    constructor();
    ios: WKWebView;
    onLoaded(): void;
    onUnloaded(): void;
    loadPDF(src: string): void;
    private init();
    private readonly mainScreen;
}
