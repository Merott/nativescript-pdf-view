import { Property } from 'ui/core/dependency-observable';
import dependencyObservable = require("ui/core/dependency-observable");
import * as proxy from 'ui/core/proxy';
import * as view from 'ui/core/view';

export abstract class PDFViewer extends view.View {
	private static srcProperty = new Property('src', 'PDFViewer', new proxy.PropertyMetadata(''));

	public get src(): string {
		return this._getValue(PDFViewer.srcProperty);
	}

	public set src(src: string) {
		this._setValue(PDFViewer.srcProperty, src);
		this.loadPDF(src);
	}

	public abstract loadPDF(src: string);
}

try {
	const registerElement = require('nativescript-angular/element-registry').registerElement;
	registerElement('PDFViewer', () => require('./pdfviewer').PDFViewer);
} catch (e) {
	// it's ok. nativescript-angular isn't installed.
}
