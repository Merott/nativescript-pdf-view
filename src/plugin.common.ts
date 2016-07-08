import * as app from 'application';
import { Property } from 'ui/core/dependency-observable';
import * as proxy from 'ui/core/proxy';
import * as view from 'ui/core/view';
import * as dialogs from 'ui/dialogs';

export abstract class PDFView extends view.View {
  private static srcProperty = new Property(
    'src', 'PdfView', new proxy.PropertyMetadata(''));

  public get src(): string {
    return this._getValue(PDFView.srcProperty);
  }

  public set src(src: string) {
    this._setValue(PDFView.srcProperty, src);
    this.load(src);
  }

  public abstract load(src: string);
}