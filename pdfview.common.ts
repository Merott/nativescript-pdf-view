import { Property } from 'ui/core/dependency-observable';
import dependencyObservable = require("ui/core/dependency-observable");
import * as proxy from 'ui/core/proxy';
import * as view from 'ui/core/view';

export abstract class PdfView extends view.View {
	private static srcProperty = new Property('src', 'PdfView', new proxy.PropertyMetadata(''));

	public get src(): string {
		return this._getValue(PdfView.srcProperty);
	}

	public set src(src: string) {
		this._setValue(PdfView.srcProperty, src);
		this.loadPDF(src);
	}

	public abstract loadPDF(src: string);
}

try {
	const registerElement = require('nativescript-angular/element-registry').registerElement;

	registerElement('PDFView', () => require('./pdfview').PdfView);
} catch (e) {
	// it's ok. nativescript-angular isn't installed.
}
