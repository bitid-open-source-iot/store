import { PdfConfig } from './pdf.service';
import { Inject, Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'pdf-dialog',
	styleUrls: ['./pdf.dialog.scss'],
	templateUrl: './pdf.dialog.html'
})

export class PdfDialog {

	constructor(private dialog: MatDialogRef<PdfDialog>, @Inject(MAT_DIALOG_DATA) private config: PdfConfig) { }

	public src: string = this.config.src;
	public message: string = this.config.message;

	public close() {
		this.dialog.close(false);
	}

}
