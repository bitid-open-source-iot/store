import * as moment from 'moment';
import { Store } from 'src/app/classes/store';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Inject, OnInit, Component, OnDestroy } from '@angular/core';

@Component({
	selector: 'orders-filter-dialog',
	styleUrls: ['./filter.dialog.scss'],
	templateUrl: './filter.dialog.html'
})

export class OrdersFilterDialog implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private dialog: MatDialogRef<OrdersFilterDialog>, @Inject(MAT_DIALOG_DATA) private config: any, public stores: StoresService, private formerror: FormErrorService) { }

	public form: FormGroup = new FormGroup({
		date: new FormGroup({
			to: new FormControl(null, [Validators.required]),
			from: new FormControl(null, [Validators.required])
		}),
		status: new FormControl(null),
		storeId: new FormControl(null)
	});
	public errors: any = {
		date: {
			to: '',
			from: ''
		},
		status: '',
		storeId: ''
	};
	public loading: boolean;
	private subscriptions: any = {};

	public close() {
		this.dialog.close(false);
	}

	public submit() {
		this.dialog.close(this.form.value);
	}

	private async load() {
		this.loading = true;

		const response = await this.stores.list({
			sort: {
				description: 1
			},
			filter: [
				'storeId',
				'description'
			]
		});

		if (response.ok) {
			this.stores.data = response.result.map(o => new Store(o));
		} else {
			this.stores.data = [];
			this.toast.error(response.error.message);
		}

		this.loading = false;
	}

	ngOnInit(): void {
		this.subscriptions.form = this.form.valueChanges.subscribe(data => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});

		(this.form.controls.date as FormGroup).controls.to.setValue(moment(this.config.date.to).format('YYYY-MM-DD'));
		(this.form.controls.date as FormGroup).controls.from.setValue(moment(this.config.date.from).format('YYYY-MM-DD'));
		this.form.controls.status.setValue(this.config.status);
		this.form.controls.storeId.setValue(this.config.storeId);

		this.load();
	}

	ngOnDestroy(): void {
		this.subscriptions.form.unsubscribe();
	}

}
