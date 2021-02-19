import { Store } from 'src/app/classes/store';
import { Supplier } from 'src/app/classes/supplier';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'suppliers-editor-page',
	styleUrls: ['./editor.page.scss'],
	templateUrl: './editor.page.html'
})

export class SuppliersEditorPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private route: ActivatedRoute, public stores: StoresService, private router: Router, private service: SuppliersService, private buttons: ButtonsService, private formerror: FormErrorService) { }

	public form: FormGroup = new FormGroup({
		address: new FormGroup({
			street: new FormControl(null, [Validators.required]),
			suburb: new FormControl(null, [Validators.required]),
			country: new FormControl(null, [Validators.required]),
			cityTown: new FormControl(null, [Validators.required]),
			postalCode: new FormControl(null, [Validators.required]),
			additionalInfo: new FormControl(null)
		}),
		phone: new FormControl(null, [Validators.required]),
		email: new FormControl(null, [Validators.required]),
		storeId: new FormControl(null, [Validators.required]),
		description: new FormControl(null, [Validators.required])
	});
	public mode: string;
	public errors: any = {
		address: {
			street: '',
			suburb: '',
			country: '',
			cityTown: '',
			postalCode: '',
			additionalInfo: ''
		},
		phone: '',
		email: '',
		storeId: '',
		description: ''
	};
	public loading: boolean;
	public supplier: Supplier = new Supplier();
	public supplierId: string;
	private subscriptions: any = {};

	private async get() {
		this.loading = true;

		const response = await this.service.get({
			filter: [
				'role',
				'phone',
				'email',
				'address',
				'storeId',
				'supplierId',
				'description'
			],
			supplierId: this.supplierId
		});

		if (response.ok) {
			this.supplier = new Supplier(response.result);
			if (this.supplier.role > 2) {
				(this.form.controls.address as FormGroup).controls.street.setValue(this.supplier.address.street);
				(this.form.controls.address as FormGroup).controls.suburb.setValue(this.supplier.address.suburb);
				(this.form.controls.address as FormGroup).controls.country.setValue(this.supplier.address.country);
				(this.form.controls.address as FormGroup).controls.cityTown.setValue(this.supplier.address.cityTown);
				(this.form.controls.address as FormGroup).controls.postalCode.setValue(this.supplier.address.postalCode);
				(this.form.controls.address as FormGroup).controls.additionalInfo.setValue(this.supplier.address.additionalInfo);

				this.form.controls.phone.setValue(this.supplier.phone);
				this.form.controls.email.setValue(this.supplier.email);
				this.form.controls.storeId.setValue(this.supplier.storeId);
				this.form.controls.description.setValue(this.supplier.description);
			} else {
				this.toast.error('Your role is not high enough to copy/edit this supplier!');
				this.router.navigate(['/suppliers']);
			}
		} else {
			this.toast.error(response.error.message);
			this.router.navigate(['/suppliers']);
		}

		this.loading = false;
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

	public async submit() {
		this.loading = true;

		let mode = this.mode;
		if (mode == 'copy') {
			mode = 'add';
			delete this.supplierId;
		}

		const response = await this.service[mode]({
			address: {
				street: this.form.value.address.street,
				suburb: this.form.value.address.suburb,
				country: this.form.value.address.country,
				cityTown: this.form.value.address.cityTown,
				postalCode: this.form.value.address.postalCode,
				additionalInfo: this.form.value.address.additionalInfo
			},
			phone: this.form.value.phone,
			email: this.form.value.email,
			storeId: this.form.value.storeId,
			supplierId: this.supplierId,
			description: this.form.value.description,
		});

		if (response.ok) {
			this.router.navigate(['/suppliers']);
		} else {
			this.toast.error(response.error.message);
		}

		this.loading = false;
	}

	ngOnInit(): void {
		this.buttons.hide('add');
		this.buttons.show('close');
		this.buttons.hide('filter');
		this.buttons.hide('search');

		this.subscriptions.form = this.form.valueChanges.subscribe(data => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});

		this.subscriptions.close = this.buttons.close.click.subscribe(event => {
			this.router.navigate(['/suppliers']);
		});

		const params = this.route.snapshot.queryParams;
		this.mode = params.mode;
		this.supplierId = params.supplierId;

		(async () => {
			if (this.mode != 'add') {
				this.form.controls.storeId.disable();
				await this.get();
			}
			await this.load();
		})();
	}

	ngOnDestroy(): void {
		this.subscriptions.form.unsubscribe();
		this.subscriptions.close.unsubscribe();
	}

}
