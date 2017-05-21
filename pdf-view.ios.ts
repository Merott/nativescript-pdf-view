import { screen } from 'tns-core-modules/platform';

import { PDFViewCommon, srcProperty } from './pdf-view.common';

class PDFViewDelegate extends NSObject implements WKNavigationDelegate {
  public static ObjCProtocols = [WKNavigationDelegate];

  private owner: WeakRef<PDFView>;

  public static initWithOwner(owner: WeakRef<PDFView>): PDFViewDelegate {
    const delegate = PDFViewDelegate.new() as PDFViewDelegate;
    delegate.owner = owner;
    return delegate;
  }

  public webViewDidFinishNavigation(webView: WKWebView) {
    PDFViewCommon.notifyOfEvent(PDFViewCommon.loadEvent, this.owner);
  }
}

export class PDFView extends PDFViewCommon {
  private delegate: PDFViewDelegate;

  public constructor() {
    super();
    this.init();
  }

  public get ios() {
    return this.nativeView as WKWebView;
  }

  public set ios(value: WKWebView) {
    this.nativeView = value;
  }

  public [srcProperty.setNative](value: string) {
    this.loadPDF(value);
  }

  public onLoaded() {
    super.onLoaded();
    this.ios.navigationDelegate = this.delegate;
  }

  public onUnloaded() {
    this.ios.navigationDelegate = void 0;
    super.onUnloaded();
  }

  public loadPDF(src: string) {
    if (!src) {
      return;
    }

    let url: NSURL;

    if (src.indexOf('://') === -1) {
      url = NSURL.fileURLWithPath(src);
      this.ios.loadFileURLAllowingReadAccessToURL(url, url);
    } else {
      url = NSURL.URLWithString(src);
      const urlRequest = NSURLRequest.requestWithURL(url);
      this.ios.loadRequest(urlRequest);
    }
  }

  private init() {
    this.delegate = PDFViewDelegate.initWithOwner(new WeakRef(this));

    this.ios = new WKWebView({
      configuration: WKWebViewConfiguration.new(),
      frame: this.mainScreen.bounds,
    });

    this.ios.opaque = false;
    this.ios.autoresizingMask =
      // tslint:disable-next-line:no-bitwise
      UIViewAutoresizing.FlexibleWidth |
      UIViewAutoresizing.FlexibleHeight;
  }

  private get mainScreen(): UIScreen {
    // tslint:disable-next-line:strict-type-predicates
    return typeof UIScreen.mainScreen === 'function' ?
      UIScreen.mainScreen() as UIScreen :  // xCode 7 and below
      UIScreen.mainScreen;     // xCode 8+
  }
}
