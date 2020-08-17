import { MatDialogRef } from '@angular/material/dialog';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { OnInit, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-share-dialog',
	styleUrls: ['./share.dialog.scss'],
	templateUrl: './share.dialog.html'
})

export class ShareDialog implements OnInit {

	constructor(private dialog: MatDialogRef<ShareDialog>, private formerror: FormErrorService) { };

	public form: FormGroup = new FormGroup({
		'role': new FormControl(1, [Validators.required]),
		'email': new FormControl('', [Validators.required, Validators.email])
	});
	public errors: any = {
		'role': '',
		'email': ''
	};
	private subscriptions: any = {}

	public close() {
		this.dialog.close(false);
	};

	public submit() {
		this.dialog.close(this.form.value);
	};

	ngOnInit(): void {
		this.subscriptions.form = this.form.valueChanges.subscribe(data => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});
	};

	ngOnDestroy(): void {
		this.subscriptions.form.unsubscribe();
	};
}