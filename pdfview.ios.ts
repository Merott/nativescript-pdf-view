import * as common from './pdfview.common';

declare var UIWebView: any;
declare var UIScreen: any;
declare var NSURL: any;
declare var NSURLRequest: any;
declare var UIViewAutoresizing: any;
declare var UIScrollViewDecelerationRateNormal: any;

export class PdfView extends common.PdfView {

	private _ios: any; /// UIWebView

	public constructor() {
		super();
		this.init();
		this.loadPDF(this.src);
	}

	public get ios(): any {
		return this._ios;
	}

	public set ios(value) {
		this._ios = value;
	}

	public loadPDF(src: string) {
		if (!src) {
			return;
		}

		if (src.indexOf('://') === -1) {
			const url = NSURL.fileURLWithPath(src);

			const urlRequest = new NSURLRequest(url);
			this.ios.loadRequest(urlRequest);
		}
	}

	private init() {
		const mainScreen = iosProperty(UIScreen, UIScreen.mainScreen);
		this.ios = new UIWebView(mainScreen.bounds);

		this.ios.autoresizingMask =
			UIViewAutoresizing.UIViewAutoresizingFlexibleWidth |
			UIViewAutoresizing.UIViewAutoresizingFlexibleHeight;

		this.ios.scalesPageToFit = true;
		this.ios.scrollView.decelerationRate = UIScrollViewDecelerationRateNormal
	}
}

function iosProperty(theClass, theProperty) {
	if (typeof theProperty === "function") {
		// xCode 7 and below
		return theProperty.call(theClass);
	} else {
		// xCode 8+
		return theProperty;
	}
}
