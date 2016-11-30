import { Property } from 'ui/core/dependency-observable';
import dependencyObservable = require("ui/core/dependency-observable");
import * as proxy from 'ui/core/proxy';
import * as view from 'ui/core/view';

export abstract class PdfViewer extends view.View {
	private static srcProperty = new Property('src', 'PdfViewer', new proxy.PropertyMetadata(''));
	public static loadEvent = 'load';

	public static notifyOfEvent(eventName: string, pdfViewRef: WeakRef<PdfViewer>) {
		const viewer = pdfViewRef.get();

		if (viewer) {
			viewer.notify({ eventName, object: viewer });
		}
	}

	public get src(): string {
		return this._getValue(PdfViewer.srcProperty);
	}

	public set src(src: string) {
		console.log('pdf viewer load url: ' + src);
		this._setValue(PdfViewer.srcProperty, src);
		this.loadPDF(src);
	}

	public abstract loadPDF(src: string);
}