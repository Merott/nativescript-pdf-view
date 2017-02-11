import {Observable} from 'data/observable';
import {PDFView} from 'nativescript-pdf-view';

export class HelloWorldModel extends Observable {
  public pdfUrls = [
    'https://www.princexml.com/samples/flyer/flyer.pdf',
    'https://www.princexml.com/howcome/2016/samples/magic8/index.pdf',
    'https://www.princexml.com/samples/invoice/invoicesample.pdf',
  ];

  public constructor() {
    super();
    this.changePDF();
  }

  public changePDF() {
    this.current++;
    this.set('pdfUrl', this.pdfUrls[(this.current + 1) % this.pdfUrls.length]);
  }

  public onLoad() {
    alert('Loaded PDF!');
  }

  private current = 0;
}
