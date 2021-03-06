import { Store } from 'src/app/classes/store';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { FiltersService } from 'src/app/services/filters/filters.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { CollectionPoint } from 'src/app/classes/collection-point';
import { MatTableDataSource } from '@angular/material/table';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { CollectionPointsService } from 'src/app/services/collection-points/collection-points.service';
import { CollectionPointsFilterDialog } from './filter/filter.dialog';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
	selector: 'collection-points-page',
	styleUrls: ['./collection-points.page.scss'],
	templateUrl: './collection-points.page.html'
})

export class CollectionPointsPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort;

	constructor(private toast: ToastService, private dialog: MatDialog, public stores: StoresService, private sheet: OptionsService, private filters: FiltersService, private confirm: ConfirmService, private router: Router, private service: CollectionPointsService, private buttons: ButtonsService, private localstorage: LocalstorageService) { }

	public filter = this.filters.get({
		storeId: []
	});
	public columns: string[] = ['description', 'options'];
	public loading: boolean;
	private subscriptions: any = {};
	public collectionpoints: MatTableDataSource<CollectionPoint> = new MatTableDataSource<CollectionPoint>();

	private async list() {
		this.loading = true;

		const response = await this.service.list({
			sort: {
				description: 1
			},
			filter: [
				'role',
				'collectionpointId',
				'description'
			],
			storeId: this.filter.storeId
		});

		if (response.ok) {
			this.collectionpoints.data = response.result.map(o => new CollectionPoint(o));
		} else {
			this.collectionpoints.data = [];
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

	public async options(collectionpoint: CollectionPoint) {
		this.sheet.show({
			role: collectionpoint.role,
			title: collectionpoint.description,
			options: [
				{
					icon: 'edit',
					title: 'Edit Collection Point',
					handler: () => {
						this.router.navigate(['/collection-points', 'editor'], {
							queryParams: {
								mode: 'update',
								collectionpointId: collectionpoint.collectionpointId
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
							message: 'Delete ' + collectionpoint.description,
							handler: async () => {
								this.loading = true;

								const response = await this.service.delete({
									collectionpointId: collectionpoint.collectionpointId
								});

								if (response.ok) {
									for (let i = 0; i < this.collectionpoints.data.length; i++) {
										if (this.collectionpoints.data[i].collectionpointId == collectionpoint.collectionpointId) {
											this.collectionpoints.data.splice(i, 1);
											break;
										}
									}
									this.collectionpoints.data = this.collectionpoints.data.map(o => new CollectionPoint(o));
									this.toast.success('Collection point was removed!');
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
		this.buttons.show('search');

		this.sort.active = 'description';
		this.sort.direction = 'desc';
		this.collectionpoints.sort = this.sort;

		this.subscriptions.add = this.buttons.add.click.subscribe(event => {
			this.router.navigate(['/collection-points', 'editor'], {
				queryParams: {
					mode: 'add'
				}
			});
		});

		this.subscriptions.filter = this.buttons.filter.click.subscribe(async event => {
			const dialog = await this.dialog.open(CollectionPointsFilterDialog, {
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

		this.subscriptions.search = this.buttons.search.value.subscribe(value => {
			this.collectionpoints.filter = value;
		});

		(async () => {
			await this.list();
			await this.load();
		})();
	}

	ngOnDestroy(): void {
		this.buttons.reset('search');
		this.subscriptions.add.unsubscribe();
		this.subscriptions.filter.unsubscribe();
		this.subscriptions.search.unsubscribe();
	}

}
