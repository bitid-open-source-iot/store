import * as moment from 'moment';
import { Store } from 'src/app/classes/store';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Inject, OnInit, Component, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'orders-filter-dialog',
	styleUrls: ['./filter.dialog.scss'],
	templateUrl: './filter.dialog.html',
    encapsulation: ViewEncapsulation.None
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

		if (typeof(this.config.date) != 'undefined' && this.config.date != null) {
			if (typeof(this.config.date.to) != 'undefined' && this.config.date.to != null) {
				(this.form.controls.date as FormGroup).controls.to.setValue(moment(this.config.date.to).format('YYYY-MM-DD'));
			};
			if (typeof(this.config.date.from) != 'undefined' && this.config.date.from != null) {
				(this.form.controls.date as FormGroup).controls.from.setValue(moment(this.config.date.from).format('YYYY-MM-DD'));
			};
		};
		if (typeof(this.config.status) != 'undefined' && this.config.status != null) {
			this.form.controls.status.setValue(this.config.status);
		};
		if (typeof(this.config.storeId) != 'undefined' && this.config.storeId != null) {
			this.form.controls.storeId.setValue(this.config.storeId);
		};

		this.loading = false;
	}

	ngOnInit(): void {
		this.subscriptions.form = this.form.valueChanges.subscribe(data => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});

		this.load();
	}

	ngOnDestroy(): void {
		this.subscriptions.form.unsubscribe();
	}

}
