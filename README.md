# nativescript-pdf-view

This is a very basic PDF view implementation that does only one thing, and
that is to display PDF files. It conveniently uses the iOS `UIWebView`, but
for Android it uses [AndroidPdfViewer](https://github.com/barteksc/AndroidPdfViewer).

This plugin does the bare minimum required to render the PDF, no configuration
options, and no error handling have been built yet. I welcome all Pull Requests!

# Usage

##

Check out the [demo](./demo) folder for a sample usage.

## Angular 2

If you're using the plugin with Angular 2, the plugin automatically registers
`PDFView` as a valid tag for Angular templates. Usage is simple:

1. Make sure to import `nativescript-pdf-view` somewhere in your code, e.g:

  ```ts
  import 'nativescript-pdf-view';
  ```

2. Include the tag in your template:

  ```html
  <PDFView [src]="src" (load)="onLoad()"></PDFView>
  ```

# Try the Demo

To try the demo, `cd` into the `demo` folder, and run the following commands:

```sh
npm install

# iOS
tns platform add ios
tns run ios

# Android
tns platform add android
tns run android
```