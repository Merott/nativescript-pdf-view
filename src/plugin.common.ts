import * as app from 'application';
import * as dependencyObservable from 'ui/core/dependency-observable';
import * as proxy from 'ui/core/proxy';
import * as view from 'ui/core/view';
import * as dialogs from 'ui/dialogs';

export abstract class PDFView extends view.View {
  private static srcProperty = new dependencyObservable.Property(
    'src',
    'PdfView',
    new proxy.PropertyMetadata('')
  );

  private static onSrcPropertyChanged(
    data: dependencyObservable.PropertyChangeData
  ) {
    var pdfView = <PDFView>data.object;
    pdfView.load(data.newValue);
  }

  public get src(): string {
    return this._getValue(PDFView.srcProperty);
  }

  public set src(value: string) {
    this._setValue(PDFView.srcProperty, value);
    this.load(value);
  }

  public abstract load(src: string);
}