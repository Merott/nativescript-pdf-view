import {Observable} from 'data/observable';
import {PDFViewer} from 'nativescript-pdf-viewer';

export class HelloWorldModel extends Observable {
  constructor() {
    super();

    PDFViewer.alert(1500);
  }
}