import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { getFile } from 'http';
import { path } from 'file-system';
import { knownFolders } from 'file-system';
import { File } from 'file-system';

@Injectable()
export class ShowInvoiceService {
	public constructor(private http: Http) {}

	public getInvoice(url: string): Promise<File> {
		const filePath = path.join(knownFolders.temp().path, 'invoice.pdf');
		return getFile(url, filePath);
	}
}
