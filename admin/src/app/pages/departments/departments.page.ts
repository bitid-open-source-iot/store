import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { Department } from 'src/app/classes/department';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { DepartmentsService } from 'src/app/services/departments/departments.service';
import { MatTableDataSource } from '@angular/material/table';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
	selector: 'departments-page',
	styleUrls: ['./departments.page.scss'],
	templateUrl: './departments.page.html'
})

export class DepartmentsPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort;

	constructor(private toast: ToastService, private sheet: OptionsService, private confirm: ConfirmService, private router: Router, private service: DepartmentsService, private buttons: ButtonsService, private localstorage: LocalstorageService) { }

	public columns: string[] = ['description', 'options'];
	public loading: boolean;
	public departments: MatTableDataSource<Department> = new MatTableDataSource<Department>();
	private subscriptions: any = {};

	private async list() {
		this.loading = true;

		const response = await this.service.list({
			sort: {
				description: 1
			},
			filter: [
				'role',
				'departmentId',
				'description'
			]
		});

		if (response.ok) {
			this.departments.data = response.result.map(o => new Department(o));
		} else {
			this.departments.data = [];
		}

		this.loading = false;
	}

	public async options(department: Department) {
		this.sheet.show({
			role: department.role,
			title: department.description,
			options: [
				{
					icon: 'edit',
					title: 'Edit department',
					handler: () => {
						this.router.navigate(['/departments', 'editor'], {
							queryParams: {
								mode: 'update',
								departmentId: department.departmentId
							}
						});
					},
					disabled: [0, 1]
				},
				{
					icon: 'people',
					title: 'Manage Subscribers',
					handler: () => {
						this.router.navigate(['/subscribers'], {
							queryParams: {
								id: department.departmentId,
								type: 'department'
							}
						});
					},
					disabled: [0, 1, 2, 3]
				},
				{
					icon: 'remove',
					title: 'Unubscribe',
					danger: true,
					handler: () => {
						this.confirm.show({
							message: '',
							handler: async () => {
								this.loading = true;

								const response = await this.service.unsubscribe({
									email: this.localstorage.get('email'),
									departmentId: department.departmentId
								});

								if (response.ok) {
									for (let i = 0; i < this.departments.data.length; i++) {
										if (this.departments.data[i].departmentId == department.departmentId) {
											this.departments.data.splice(i, 1);
											break;
										}
									}
									this.departments.data = this.departments.data.map(o => new Department(o));
									this.toast.success('You were unsubscribed!');
								} else {
									this.toast.error(response.error.message);
								}

								this.loading = false;
							}
						});
					},
					disabled: [0, 5]
				},
				{
					icon: 'delete',
					title: 'Delete',
					danger: true,
					handler: () => {
						this.confirm.show({
							message: '',
							handler: async () => {
								this.loading = true;

								const response = await this.service.delete({
									departmentId: department.departmentId
								});

								if (response.ok) {
									for (let i = 0; i < this.departments.data.length; i++) {
										if (this.departments.data[i].departmentId == department.departmentId) {
											this.departments.data.splice(i, 1);
											break;
										}
									}
									this.departments.data = this.departments.data.map(o => new Department(o));
									this.toast.success('department was removed!');
								} else {
									this.toast.error(response.error.message);
								}

								this.loading = false;
							}
						});
					},
					disabled: [0, 1, 2, 3, 4]
				}
			]
		});
	}

	ngOnInit(): void {
		this.buttons.show('add');
		this.buttons.hide('close');
		this.buttons.hide('filter');
		this.buttons.hide('search');

		this.sort.active = 'description';
		this.sort.direction = 'desc';
		this.departments.sort = this.sort;

		this.subscriptions.add = this.buttons.add.click.subscribe(event => {
			this.router.navigate(['/departments', 'editor'], {
				queryParams: {
					mode: 'add'
				}
			});
		});

		this.list();
	}

	ngOnDestroy(): void {
		this.subscriptions.add.unsubscribe();
	}

}
