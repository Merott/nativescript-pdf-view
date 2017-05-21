# NativeScript PDFView

A minimal PDF view implementation that does only one thing, and that is to display PDF files in the simplest way possible. It conveniently uses the iOS `WKWebView`, and for Android it uses [`AndroidPdfViewer`](https://github.com/barteksc/AndroidPdfViewer).

This plugin does the bare minimum required to render the PDF, no configuration options, and no error handling have been built yet. I welcome all Pull Requests!

My aim is to keep the features consistent across iOS and Android.

## Installation

```
tns plugin add nativescript-pdf-view
```

## Usage

### Vanilla NativeScript

```xml
<Page
  xmlns="http://schemas.nativescript.org/tns.xsd"
  xmlns:pdf="nativescript-pdf-view"
  loaded="pageLoaded">
  <pdf:PDFView src="{{ pdfUrl }}" load="{{ onLoad }}" />
</Page>
```

### Angular NativeScript

```ts
import { PDFView } from 'nativescript-pdf-view';
import { registerElement } from 'nativescript-angular';
registerElement('PDFView', () => PDFView);
```

```html
<PDFView [src]="src" (load)="onLoad()"></PDFView>
```

## Demo

Check out the [demo](./demo) folder for a demo application using this plugin. You can run the demo by executing `npm run demo.ios` and `npm run demo.android` from the root directory of the project.