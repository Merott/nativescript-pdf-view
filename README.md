# nativescript-pdf-view

This is a very basic PDF view implementation that does only one thing, and
that is to display PDF files. It conveniently uses the iOS `UIWebView`, but
for Android it uses AndroidPdfView.

This plugin does the bare minimum required to render the PDF, no configuration
options, and no error handling have been built yet. I welcome all Pull Requests!

# Angular 2

If you're using the plugin with Angular 2, the plugin automatically registers
`PDFView` as a valid tag for Angular templates. Usage is simple:

```html
<PDFView [src]="'http://www.pdf995.com/samples/pdf.pdf'"></PDFView>
```