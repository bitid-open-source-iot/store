import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { Inject, OnInit, Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-unsubscribe-dialog',
	styleUrls: ['./unsubscribe.dialog.scss'],
	templateUrl: './unsubscribe.dialog.html'
})

export class UnsubscribeDialog implements OnInit {

	constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialog: MatDialogRef<UnsubscribeDialog>, private formerror: FormErrorService, private localstorage: LocalstorageService) { };

	public form: FormGroup = new FormGroup({
		'confirm': new FormControl(false, [Validators.required])
	});
	public errors: any = {
		'confirm': ''
	};

	public close() {
		this.dialog.close(false);
	};

	public submit() {
		this.dialog.close({
			'email': this.localstorage.get('email')
		});
	};

	ngOnInit() {
		this.form.valueChanges.subscribe((data) => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});
	};
}