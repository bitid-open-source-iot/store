/* --- MODULES ---*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatContentModule } from '../mat-content/mat-content.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* --- SERVICES ---*/
import { PrivateMessageService } from './private-message.service';

/* --- COMPONENTS ---*/
import { PrivateMessageDialog } from './private-message.dialog';

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		MatIconModule,
		MatSelectModule,
		MatDialogModule,
		MatButtonModule,
		MatContentModule,
		MatToolbarModule,
		MatFormFieldModule,
		ReactiveFormsModule
	],
	providers: [
		PrivateMessageService
	],
	declarations: [
		PrivateMessageDialog
	]
})

export class PrivateMessageModule { }
