import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { PdfDialog } from './pdf.dialog';

@Injectable({
	providedIn: 'root'
})

export class PdfService {

	constructor(private dialog: MatDialog) { }

	public async show(config: PdfConfig) {
		const dialog = await this.dialog.open(PdfDialog, {
			data: config,
			panelClass: 'fullscreen-dialog'
		});

		dialog.afterClosed().subscribe(result => {
			if (result && config.handler) {
				config.handler();
			}
		});
	}

}

export interface PdfConfig {
	src: string;
	message: string;
	handler: Function;
}
