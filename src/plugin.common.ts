import * as app from 'application';
import * as dialogs from 'ui/dialogs';

export abstract class PDFViewer {
  public static alert(delay: number) {
    setTimeout(() => {
      dialogs.alert(`YAAAAAAYYY!!!`).then(() => console.log(`Dialog closed.`));
    }, delay);
  }
}