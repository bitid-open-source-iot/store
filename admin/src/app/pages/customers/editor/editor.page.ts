import { Store } from 'src/app/classes/store';
import { Customer } from 'src/app/classes/customer';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { CustomersService } from 'src/app/services/customers/customers.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'customers-editor-page',
	styleUrls: ['./editor.page.scss'],
	templateUrl: './editor.page.html'
})

export class CustomersEditorPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private route: ActivatedRoute, public stores: StoresService, private router: Router, private service: CustomersService, private buttons: ButtonsService, private formerror: FormErrorService) { }

	public form: FormGroup = new FormGroup({
		email: new FormControl(null, [Validators.required]),
		storeId: new FormControl(null, [Validators.required])
	});
	public mode: string;
	public errors: any = {
		email: '',
		storeId: ''
	};
	public filter: FormGroup = new FormGroup({
		store: new FormControl(null, [Validators.required])
	});
	public loading: boolean;
	public customer: Customer = new Customer();
	public customerId: string;
	private subscriptions: any = {};

	private async get() {
		this.loading = true;

		const response = await this.service.get({
			filter: [
				'role',
				'email',
				'storeId'
			],
			customerId: this.customerId
		});

		if (response.ok) {
			this.customer = new Customer(response.result);
			if (this.customer.role > 2) {
				this.form.controls.email.setValue(this.customer.email);
				this.form.controls.storeId.setValue(this.customer.storeId);
			} else {
				this.toast.error('Your role is not high enough to copy/edit this customer!');
				this.router.navigate(['/customers']);
			}
		} else {
			this.toast.error(response.error.message);
			this.router.navigate(['/customers']);
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
			delete this.customerId;
		}

		const response = await this.service[mode]({
			email: this.form.value.email,
			storeId: this.form.value.storeId,
			customerId: this.customerId
		});

		if (response.ok) {
			this.router.navigate(['/customers']);
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
			this.router.navigate(['/customers']);
		});

		const params = this.route.snapshot.queryParams;
		this.mode = params.mode;
		this.customerId = params.customerId;

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
