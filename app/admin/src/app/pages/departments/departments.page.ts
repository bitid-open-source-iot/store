import { Store } from 'src/app/classes/store';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Department } from 'src/app/classes/department';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { FiltersService } from 'src/app/services/filters/filters.service';
import { DepartmentsService } from 'src/app/services/departments/departments.service';
import { MatTableDataSource } from '@angular/material/table';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { DepartmentsFilterDialog } from './filter/filter.dialog';

@Component({
	selector: 'departments-page',
	styleUrls: ['./departments.page.scss'],
	templateUrl: './departments.page.html'
})

export class DepartmentsPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort;

	constructor(private toast: ToastService, private dialog: MatDialog, private sheet: OptionsService, public stores: StoresService, private confirm: ConfirmService, private filters: FiltersService, private router: Router, private service: DepartmentsService, private buttons: ButtonsService, private localstorage: LocalstorageService) { }

	public filter = this.filters.get({
		storeId: []
	});
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
			],
			storeId: this.filter.storeId
		});

		if (response.ok) {
			this.departments.data = response.result.map(o => new Department(o));
		} else {
			this.departments.data = [];
		}

		this.loading = false;
	}

	private async load() {
		this.loading = true;

		const stores = await this.stores.list({
			filter: [
				'storeId',
				'description'
			]
		});

		if (stores.ok) {
			this.stores.data = stores.result.map(o => new Store(o));
		} else {
			this.stores.data = [];
		}

		this.loading = false;
	}

    public unfilter(key, value) {
        this.filter[key] = this.filter[key].filter(o => o != value);
        this.filters.update(this.filter);
        this.list();
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
					icon: 'delete',
					title: 'Delete',
					danger: true,
					handler: () => {
						this.confirm.show({
							message: 'Delete ' + department.description,
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

    public describe(array: any[], key: string, id: string) {
        let result = '-';
        array.map(o => {
            if (o[key] == id) {
                result = o.description;
            }
        });
        return result;
    }

	ngOnInit(): void {
		this.buttons.show('add');
		this.buttons.hide('close');
		this.buttons.show('filter');
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

		this.subscriptions.filter = this.buttons.filter.click.subscribe(async event => {
			const dialog = await this.dialog.open(DepartmentsFilterDialog, {
                data: this.filter,
                panelClass: 'filter-dialog'
            });

            await dialog.afterClosed().subscribe(async result => {
                if (result) {
                    Object.keys(result).map(key => {
                        this.filter[key] = result[key];
                    });
                    this.filters.update(this.filter);
                    this.list();
                };
            });
		});

		(async () => {
			await this.list();
			await this.load();
		})();
	}

	ngOnDestroy(): void {
		this.subscriptions.add.unsubscribe();
		this.subscriptions.filter.unsubscribe();
	}

}
