import * as app from 'tns-core-modules/application';
import { Property, View } from 'tns-core-modules/ui/core/view';
import * as dialogs from 'tns-core-modules/ui/dialogs';

export abstract class PDFViewCommon extends View {
  public static loadEvent = 'load';

  /**
   * the source url of the PDF to show
   */
  public src: string;

  public static notifyOfEvent(
    eventName: string,
    pdfViewRef: WeakRef<PDFViewCommon>,
  ) {
    const viewer = pdfViewRef.get();

    if (viewer) {
      viewer.notify({ eventName, object: viewer });
    }
  }
}

export const srcProperty = new Property<PDFViewCommon, string>({
  name: 'src',
});
srcProperty.register(PDFViewCommon);
