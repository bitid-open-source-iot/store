import { Store } from 'src/app/classes/store';
import { Department } from 'src/app/classes/department';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { DepartmentsService } from 'src/app/services/departments/departments.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'departments-editor-page',
	styleUrls: ['./editor.page.scss'],
	templateUrl: './editor.page.html'
})

export class DepartmentsEditorPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private route: ActivatedRoute, public stores: StoresService, private router: Router, private service: DepartmentsService, private buttons: ButtonsService, private formerror: FormErrorService) { }

	public form: FormGroup = new FormGroup({
		storeId: new FormControl(null, [Validators.required]),
		description: new FormControl(null, [Validators.required])
	});
	public mode: string;
	public errors: any = {
		storeId: '',
		description: ''
	};
	public loading: boolean;
	public department: Department = new Department();
	public departmentId: string;
	private subscriptions: any = {};

	private async get() {
		this.loading = true;

		const response = await this.service.get({
			filter: [
				'role',
				'storeId',
				'description'
			],
			departmentId: this.departmentId
		});

		if (response.ok) {
			this.department = new Department(response.result);
			if (this.department.role > 2) {
				this.form.controls.storeId.setValue(this.department.storeId);
				this.form.controls.description.setValue(this.department.description);
			} else {
				this.toast.error('Your role is not high enough to copy/edit this department!');
				this.router.navigate(['/departments']);
			}
		} else {
			this.toast.error(response.error.message);
			this.router.navigate(['/departments']);
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
			delete this.departmentId;
		}

		const response = await this.service[mode]({
			storeId: this.form.value.storeId,
			description: this.form.value.description,
			departmentId: this.departmentId
		});

		if (response.ok) {
			this.router.navigate(['/departments']);
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
			this.router.navigate(['/departments']);
		});

		const params = this.route.snapshot.queryParams;
		this.mode = params.mode;
		this.departmentId = params.departmentId;

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
