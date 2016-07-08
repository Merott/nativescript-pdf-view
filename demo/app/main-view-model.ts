import {Observable} from 'data/observable';
import {PDFView} from 'nativescript-pdf-view';

export class HelloWorldModel extends Observable {
  public pdfUrls = [
    'http://www.pdf995.com/samples/pdf.pdf',
    'http://www.pdf995.com/samples/widgets.pdf'
  ];

  constructor() {
    super();
    this.changePDF();
  }

  public changePDF() {
    this.current++;
    this.set('pdfUrl', this.pdfUrls[(this.current + 1) % 2]);
  }

  private current = 0;
}