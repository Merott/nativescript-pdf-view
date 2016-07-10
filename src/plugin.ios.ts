import * as ui from 'ui/core/view';

import * as common from './plugin.common';

export class PDFView extends common.PDFView {
  private _ios: UIWebView;

  constructor() {
    super();
    this.init();
    this.load(this.src);
  }

  public get ios() {
    return this._ios;
  }

  public set ios(value) {
    this._ios = value;
  }

  public load(src: string) {
    const url = NSURL.URLWithString(src);
    const urlRequest = new NSURLRequest(url);
    this.ios.loadRequest(urlRequest);
  }

  private init() {
    this.ios = new UIWebView(CGRectInfinite);

    this.ios.autoresizingMask =
      UIViewAutoresizing.UIViewAutoresizingFlexibleWidth |
      UIViewAutoresizing.UIViewAutoresizingFlexibleHeight;

    this.ios.scalesPageToFit = true;
  }
}