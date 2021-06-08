/* --- MODULES ---*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatButtonModule } from '@angular/material/button';
import { MatContentModule } from '../mat-content/mat-content.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* --- SERVICES ---*/
import { PdfService } from './pdf.service';

/* --- COMPONENTS ---*/
import { PdfDialog } from './pdf.dialog';

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		MatIconModule,
		PdfViewerModule,
		MatDialogModule,
		MatButtonModule,
		MatToolbarModule,
		MatContentModule,
		MatFormFieldModule,
		ReactiveFormsModule
	],
	providers: [
		PdfService
	],
	declarations: [
		PdfDialog
	]
})

export class PdfModule {}
