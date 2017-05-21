import { PDFViewCommon } from './pdf-view.common';

export declare class PDFView extends PDFViewCommon {
  // define your typings manually
  // or..
  // use take the ios or android .d.ts files and copy/paste them here

  public loadPDF(src: string): void;

  public static loadEvent: string;
  public static notifyOfEvent(
    eventName: string,
    pdfViewRef: WeakRef<PDFViewCommon>,
  ): void;
}
