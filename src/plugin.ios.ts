import * as common from './plugin.common';
import * as ui from 'ui/core/view';

declare var UIWebView: any;

export class PDFView extends common.PDFView {
  constructor() {
    super();
    console.dump(arguments);
    console.log('fuuuuuuuuuuuuuuuckkkkkkkkkkkkkkkkkk!');
    console.dump(new UIWebView());
  }
}