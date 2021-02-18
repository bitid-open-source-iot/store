import { Store } from 'src/app/classes/store';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'stores-editor-page',
	styleUrls: ['./editor.page.scss'],
	templateUrl: './editor.page.html'
})

export class StoresEditorPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private route: ActivatedRoute, private router: Router, private service: StoresService, private buttons: ButtonsService) { }

	public form: FormGroup = new FormGroup({
		description: new FormControl(null, [Validators.required]),
		organizationOnly: new FormControl(null, [Validators.required])
	});
	public mode: string;
	public errors: any = {
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
				'storeId',
				'description'
			],
			storeId: this.storeId
		});

		if (response.ok) {
			const store = new Store(response.result);
			if (store.role > 2) {
				this.form.controls.description.setValue(store.description);
				this.form.controls.organizationOnly.setValue(store.organizationOnly);
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


		this.loading = false;
	};

	ngOnInit(): void {
		this.buttons.hide('add');
		this.buttons.show('close');
		this.buttons.hide('filter');
		this.buttons.hide('search');

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
		this.subscriptions.close.unsubscribe();
	}

}
