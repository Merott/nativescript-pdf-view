import { Property, View } from 'tns-core-modules/ui/core/view';
export declare abstract class PDFViewCommon extends View {
    static loadEvent: string;
    src: string;
    static notifyOfEvent(eventName: string, pdfViewRef: WeakRef<PDFViewCommon>): void;
}
export declare const srcProperty: Property<PDFViewCommon, string>;
