import { Component, OnInit } from '@angular/core';
import { ShowInvoiceService } from './shared/show-invoice.service';
import { PdfViewer } from "ns-pdfviewer";

import {registerElement} from 'nativescript-angular/element-registry';
registerElement('PdfViewer', () => require('ns-pdfviewer').PdfViewer);

import frame = require('ui/frame');
import utils = require('utils/utils');
import platform = require('platform');
import fs = require('file-system');

declare var android: any;

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
    providers: [ShowInvoiceService]
})
export class AppComponent implements OnInit {
    public isLoading: boolean;
    public invoiceDate: string;
    public invoiceLink: string;
    public invoiceLocalPath: string;

    public constructor(private invoiceService: ShowInvoiceService) {
        this.isLoading = true;
    }

    public ngOnInit(): void {
        this.invoiceDate = "01-01-2016";
        this.invoiceLink = "https://www.ets.org/Media/Tests/TOEFL/pdf/SampleQuestions.pdf";
        this.invoiceLocalPath = '';
        this.loadInvoice();
    }

    private loadInvoice(): void {
        this.invoiceService.getInvoice(this.invoiceLink)
			.then((r: any) => {
                this.isLoading = false;
                console.log('AppComponent loadInvoice done');
                this.invoiceLocalPath = r.path;
            }, (e: string) => {
                this.isLoading = false;
                alert('Error: ' + e);
            });
    }
}
