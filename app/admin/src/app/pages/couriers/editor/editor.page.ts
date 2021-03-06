import { Store } from 'src/app/classes/store';
import { Courier } from 'src/app/classes/courier';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { CourierOption } from 'src/app/classes/courier-option';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { CouriersService } from 'src/app/services/couriers/couriers.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'couriers-editor-page',
	styleUrls: ['./editor.page.scss'],
	templateUrl: './editor.page.html'
})

export class CouriersEditorPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private route: ActivatedRoute, public stores: StoresService, private router: Router, private service: CouriersService, private buttons: ButtonsService, private formerror: FormErrorService) { }

	public form: FormGroup = new FormGroup({
		icon: new FormControl(null, [Validators.required]),
		phone: new FormControl(null, [Validators.required]),
		email: new FormControl(null, [Validators.required]),
		storeId: new FormControl(null, [Validators.required]),
		account: new FormControl(null, [Validators.required]),
		description: new FormControl(null, [Validators.required])
	});
	public mode: string;
	public errors: any = {
		icon: '',
		phone: '',
		email: '',
		storeId: '',
		account: '',
		description: ''
	};
	public filter: FormGroup = new FormGroup({
		store: new FormControl(null, [Validators.required])
	});
	public option: FormGroup = new FormGroup({
		type: new FormControl(null, [Validators.required]),
		price: new FormControl(null, [Validators.required, Validators.min(0)])
	});
	public columns: string[] = ['type', 'price', 'options']
	public options: MatTableDataSource<CourierOption> = new MatTableDataSource<CourierOption>();
	public courier: Courier = new Courier();
	public loading: boolean;
	public courierId: string;
	private subscriptions: any = {};

	public async add() {
		this.options.data.push(new CourierOption(this.option.value));
		this.options.data = this.options.data.map(o => new CourierOption(o));
		this.option.reset();
		this.option.markAsUntouched();
	};

	private async get() {
		this.loading = true;

		const response = await this.service.get({
			filter: [
				'role',
				'icon',
				'phone',
				'email',
				'storeId',
				'options',
				'account',
				'description'
			],
			courierId: this.courierId
		});

		if (response.ok) {
			this.courier = new Courier(response.result);
			if (this.courier.role > 2) {
				this.options.data = this.courier.options;
				this.form.controls.icon.setValue(this.courier.icon);
				this.form.controls.phone.setValue(this.courier.phone);
				this.form.controls.email.setValue(this.courier.email);
				this.form.controls.storeId.setValue(this.courier.storeId);
				this.form.controls.account.setValue(this.courier.account);
				this.form.controls.description.setValue(this.courier.description);
			} else {
				this.toast.error('Your role is not high enough to copy/edit this courier!');
				this.router.navigate(['/couriers']);
			}
		} else {
			this.toast.error(response.error.message);
			this.router.navigate(['/couriers']);
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
			delete this.courierId;
		}

		const response = await this.service[mode]({
			icon: this.form.value.icon,
			phone: this.form.value.phone,
			email: this.form.value.email,
			options: this.options.data,
			storeId: this.form.value.storeId,
			account: this.form.value.account,
			courierId: this.courierId,
			description: this.form.value.description
		});

		if (response.ok) {
			this.router.navigate(['/couriers']);
		} else {
			this.toast.error(response.error.message);
		}

		this.loading = false;
	}

	public upload(key, value) {
		this.form.controls[key].setValue(value);
	}

	public async remove(option: CourierOption) {
		for (let i = 0; i < this.options.data.length; i++) {
			if (this.options.data[i].optionId == option.optionId) {
				this.options.data.splice(i, 1);
				break;
			};
		};
		this.options.data = this.options.data.map(o => new CourierOption(o));
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
			this.router.navigate(['/couriers']);
		});

		const params = this.route.snapshot.queryParams;
		this.mode = params.mode;
		this.courierId = params.courierId;

		(async () => {
			if (this.mode != 'add') {
				
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
