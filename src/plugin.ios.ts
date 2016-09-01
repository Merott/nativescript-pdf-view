import * as ui from 'ui/core/view';

import * as common from './plugin.common';

export class PDFView extends common.PDFView {
  private _ios: UIWebView;
  private delegate: PDFViewDelegate;

  constructor() {
    super();
    this.init();
    this.loadPDF(this.src);
  }

  public get ios() {
    return this._ios;
  }

  public set ios(value) {
    this._ios = value;
  }

  public loadPDF(src: string) {
    if (!src) {
      return;
    }

    let url: NSURL;

    if (src.indexOf('://') === -1) {
      url = NSURL.fileURLWithPath(src);
    } else {
      url = NSURL.URLWithString(src);
    }

    const urlRequest = new NSURLRequest(url);
    this.ios.loadRequest(urlRequest);
  }

  public onLoaded() {
    super.onLoaded();
    this._ios.delegate = this.delegate;
  }

  public onUnloaded() {
    this._ios.delegate = null;
    super.onUnloaded();
  }

  private init() {
    this.ios = new UIWebView(UIScreen.mainScreen().bounds);
    this.delegate = PDFViewDelegate.initWithOwner(new WeakRef(this));

    this.ios.autoresizingMask =
      UIViewAutoresizing.UIViewAutoresizingFlexibleWidth |
      UIViewAutoresizing.UIViewAutoresizingFlexibleHeight;

    this.ios.scalesPageToFit = true;
  }
}

class PDFViewDelegate extends NSObject implements UIWebViewDelegate {
  public static ObjCProtocols = [UIWebViewDelegate];

  public static initWithOwner(owner: WeakRef<PDFView>): PDFViewDelegate {
    let delegate = <PDFViewDelegate>PDFViewDelegate.new();
    delegate.owner = owner;
    return delegate;
  }

  public webViewDidFinishLoad(webView: UIWebView) {
    return common.PDFView.notifyOfEvent(common.PDFView.loadEvent, this.owner);
  }

  private owner: WeakRef<PDFView>;
}