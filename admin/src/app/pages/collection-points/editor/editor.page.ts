import { Store } from 'src/app/classes/store';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { CollectionPoint } from 'src/app/classes/collection-point';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CollectionPointsService } from 'src/app/services/collection-points/collection-points.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'collection-points-editor-page',
	styleUrls: ['./editor.page.scss'],
	templateUrl: './editor.page.html'
})

export class CollectionPointsEditorPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private route: ActivatedRoute, public stores: StoresService, private router: Router, private service: CollectionPointsService, private buttons: ButtonsService, private formerror: FormErrorService) { }

	public form: FormGroup = new FormGroup({
		address: new FormGroup({
			street: new FormControl(null, [Validators.required]),
			suburb: new FormControl(null, [Validators.required]),
			country: new FormControl(null, [Validators.required]),
			cityTown: new FormControl(null, [Validators.required]),
			postalCode: new FormControl(null, [Validators.required])
		}),
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
			postalCode: ''
		},
		storeId: '',
		description: ''
	};
	public filter: FormGroup = new FormGroup({
		store: new FormControl(null, [Validators.required])
	});
	public loading: boolean;
	private subscriptions: any = {};
	public collectionpoint: CollectionPoint = new CollectionPoint();
	public collectionpointId: string;

	private async get() {
		this.loading = true;

		const response = await this.service.get({
			filter: [
				'role',
				'phone',
				'email',
				'address',
				'storeId',
				'description',
				'collectionpointId'
			],
			collectionpointId: this.collectionpointId
		});

		if (response.ok) {
			this.collectionpoint = new CollectionPoint(response.result);
			if (this.collectionpoint.role > 2) {
				(this.form.controls.address as FormGroup).controls.street.setValue(this.collectionpoint.address.street);
				(this.form.controls.address as FormGroup).controls.suburb.setValue(this.collectionpoint.address.suburb);
				(this.form.controls.address as FormGroup).controls.country.setValue(this.collectionpoint.address.country);
				(this.form.controls.address as FormGroup).controls.cityTown.setValue(this.collectionpoint.address.cityTown);
				(this.form.controls.address as FormGroup).controls.postalCode.setValue(this.collectionpoint.address.postalCode);

				this.form.controls.storeId.setValue(this.collectionpoint.storeId);
				this.form.controls.description.setValue(this.collectionpoint.description);
			} else {
				this.toast.error('Your role is not high enough to copy/edit this collection point!');
				this.router.navigate(['/collection-points']);
			}
		} else {
			this.toast.error(response.error.message);
			this.router.navigate(['/collection-points']);
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
			delete this.collectionpointId;
		}

		const response = await this.service[mode]({
			address: {
				street: this.form.value.address.street,
				suburb: this.form.value.address.suburb,
				country: this.form.value.address.country,
				cityTown: this.form.value.address.cityTown,
				postalCode: this.form.value.address.postalCode
			},
			storeId: this.form.value.storeId,
			description: this.form.value.description,
			collectionpointId: this.collectionpointId
		});

		if (response.ok) {
			this.router.navigate(['/collection-points']);
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
			this.router.navigate(['/collection-points']);
		});

		const params = this.route.snapshot.queryParams;
		this.mode = params.mode;
		this.collectionpointId = params.collectionpointId;

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
