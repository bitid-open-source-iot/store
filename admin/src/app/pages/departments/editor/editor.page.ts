import { Store } from 'src/app/classes/store';
import { Courier } from 'src/app/classes/courier';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { CouriersService } from 'src/app/services/couriers/couriers.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'departments-editor-page',
	styleUrls: ['./editor.page.scss'],
	templateUrl: './editor.page.html'
})

export class DepartmentsEditorPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private route: ActivatedRoute, public stores: StoresService, private router: Router, private service: CouriersService, private buttons: ButtonsService, private formerror: FormErrorService) { }

	public form: FormGroup = new FormGroup({
		storeId: new FormControl(null, [Validators.required]),
		description: new FormControl(null, [Validators.required]),
		organizationOnly: new FormControl(null, [Validators.required])
	});
	public mode: string;
	public errors: any = {
		storeId: '',
		description: '',
		organizationOnly: ''
	};
	public options: MatTableDataSource<any> = new MatTableDataSource<any>();
	public courier: Courier = new Courier();
	public loading: boolean;
	public courierId: string;
	private subscriptions: any = {};

	private async get() {
		this.loading = true;

		const response = await this.service.get({
			filter: [
				'role',
				'storeId',
				'description',
				'organizationOnly'
			],
			courierId: this.courierId
		});

		if (response.ok) {
			this.courier = new Courier(response.result);
			if (this.courier.role > 2) {
				this.form.controls.storeId.setValue(this.courier.storeId);
				this.form.controls.description.setValue(this.courier.description);
				this.form.controls.organizationOnly.setValue(this.courier.organizationOnly);
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
			storeId: this.form.value.storeId,
			courierId: this.courierId,
			description: this.form.value.description,
			organizationOnly: this.form.value.organizationOnly
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
