import * as app from 'application';
import * as dialogs from 'ui/dialogs';
import * as view from 'ui/core/view';
import * as dependencyObservable from 'ui/core/dependency-observable';

export abstract class PDFView extends view.View {
  public static srcProperty: dependencyObservable.Property;

  constructor() {
    super();
    console.log('common constructor!!!!!!!!');
  }

  public src: string;
}