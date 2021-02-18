import { Store } from 'src/app/classes/store';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'stores-editor-page',
	styleUrls: ['./editor.page.scss'],
	templateUrl: './editor.page.html'
})

export class StoresEditorPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private route: ActivatedRoute, private router: Router, private service: StoresService, private buttons: ButtonsService, private formerror: FormErrorService) { }

	public form: FormGroup = new FormGroup({
		address: new FormGroup({
			company: new FormGroup({
				vat: new FormControl(null, [Validators.required]),
				reg: new FormControl(null, [Validators.required])
			}),
			street: new FormControl(null, [Validators.required]),
			suburb: new FormControl(null, [Validators.required]),
			country: new FormControl(null, [Validators.required]),
			cityTown: new FormControl(null, [Validators.required]),
			postalCode: new FormControl(null, [Validators.required])
		}),
		contact: new FormGroup({
			email: new FormControl(null, [Validators.required]),
			number: new FormControl(null, [Validators.required]),
			website: new FormControl(null, [Validators.required])
		}),
		payfast: new FormGroup({
			merchantId: new FormControl(null, [Validators.required]),
			merchantKey: new FormControl(null, [Validators.required])
		}),
		logo: new FormControl(null, [Validators.required]),
		cover: new FormControl('./assets/cover.png', [Validators.required]),
		description: new FormControl(null, [Validators.required]),
		organizationOnly: new FormControl(null, [Validators.required])
	});
	public mode: string;
	public store: Store = new Store();
	public errors: any = {
		address: {
			company: {
				vat: '',
				reg: ''
			},
			street: '',
			suburb: '',
			country: '',
			cityTown: '',
			postalCode: ''
		},
		contact: {
			email: '',
			number: '',
			website: ''
		},
		payfast: {
			merchantId: '',
			merchantKey: ''
		},
		logo: '',
		cover: '',
		description: '',
		organizationOnly: ''
	};
	public storeId: string;
	public loading: boolean;
	private subscriptions: any = {}

	private async get() {
		this.loading = true;

		const response = await this.service.get({
			filter: [
				'role',
				'logo',
				'cover',
				'address',
				'contact',
				'payfast',
				'storeId',
				'description',
				'organizationOnly'
			],
			storeId: this.storeId
		});

		if (response.ok) {
			this.store = new Store(response.result);
			if (this.store.role > 2) {
				((this.form.controls.address as FormGroup).controls.company as FormGroup).controls.vat.setValue(this.store.address.company.vat);
				((this.form.controls.address as FormGroup).controls.company as FormGroup).controls.reg.setValue(this.store.address.company.reg);
				(this.form.controls.address as FormGroup).controls.street.setValue(this.store.address.street);
				(this.form.controls.address as FormGroup).controls.suburb.setValue(this.store.address.suburb);
				(this.form.controls.address as FormGroup).controls.country.setValue(this.store.address.country);
				(this.form.controls.address as FormGroup).controls.cityTown.setValue(this.store.address.cityTown);
				(this.form.controls.address as FormGroup).controls.postalCode.setValue(this.store.address.postalCode);

				(this.form.controls.contact as FormGroup).controls.email.setValue(this.store.contact.email);
				(this.form.controls.contact as FormGroup).controls.number.setValue(this.store.contact.number);
				(this.form.controls.contact as FormGroup).controls.website.setValue(this.store.contact.website);

				(this.form.controls.payfast as FormGroup).controls.merchantId.setValue(this.store.payfast.merchantId);
				(this.form.controls.payfast as FormGroup).controls.merchantKey.setValue(this.store.payfast.merchantKey);

				this.form.controls.logo.setValue(this.store.logo);
				this.form.controls.cover.setValue(this.store.cover);
				this.form.controls.description.setValue(this.store.description);
				this.form.controls.organizationOnly.setValue(this.store.organizationOnly);
			} else {
				this.toast.error('Your role is not high enough to copy/edit this store!');
				this.router.navigate(['/stores']);
			}
		} else {
			this.toast.error(response.error.message);
			this.router.navigate(['/stores']);
		}

		this.loading = false;
	};

	public async submit() {
		this.loading = true;

		let mode = this.mode;
		if (mode == 'copy') {
			mode = 'add';
			delete this.storeId;
		};

		const response = await this.service[mode]({
			logo: this.form.value.logo,
			cover: this.form.value.cover,
			storeId: this.storeId,
			description: this.form.value.description,
			organizationOnly: this.form.value.organizationOnly
		});

		if (response.ok) { } else { };

		this.loading = false;
	};

	ngOnInit(): void {
		this.buttons.hide('add');
		this.buttons.show('close');
		this.buttons.hide('filter');
		this.buttons.hide('search');

		this.subscriptions.form = this.form.valueChanges.subscribe(data => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});

		this.subscriptions.close = this.buttons.close.click.subscribe(event => {
			this.router.navigate(['/stores']);
		});

		const params = this.route.snapshot.queryParams;
		this.mode = params.mode;
		this.storeId = params.storeId;

		if (this.mode != 'add') {
			this.get();
		};
	}

	ngOnDestroy(): void {
		this.subscriptions.form.unsubscribe();
		this.subscriptions.close.unsubscribe();
	}

}
