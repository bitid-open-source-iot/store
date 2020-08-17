import { MatDialogRef } from '@angular/material/dialog';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { OnInit, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-delete-dialog',
	styleUrls: ['./delete.dialog.scss'],
	templateUrl: './delete.dialog.html'
})

export class DeleteDialog implements OnInit {

	constructor(private dialog: MatDialogRef<DeleteDialog>, private formerror: FormErrorService) {};

	public form: FormGroup = new FormGroup({
		'confirm': new FormControl(false, [Validators.required])
	});
	public errors: any = {
		'confirm': ''
	};
	private subscriptions: any = {}

	public close() {
		this.dialog.close(false);
	};

	public submit() {
		this.dialog.close(true);
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