import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { CollectionPoint } from 'src/app/classes/collection-point';
import { MatTableDataSource } from '@angular/material/table';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { CollectionPointsService } from 'src/app/services/collection-points/collection-points.service';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
	selector: 'collection-points-page',
	styleUrls: ['./collection-points.page.scss'],
	templateUrl: './collection-points.page.html'
})

export class CollectionPointsPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort;

	constructor(private toast: ToastService, private sheet: OptionsService, private confirm: ConfirmService, private router: Router, private service: CollectionPointsService, private buttons: ButtonsService, private localstorage: LocalstorageService) { }

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
			]
		});

		if (response.ok) {
			this.collectionpoints.data = response.result.map(o => new CollectionPoint(o));
		} else {
			this.collectionpoints.data = [];
		}

		this.loading = false;
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

	ngOnInit(): void {
		this.buttons.show('add');
		this.buttons.hide('close');
		this.buttons.hide('filter');
		this.buttons.hide('search');

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

		this.list();
	}

	ngOnDestroy(): void {
		this.subscriptions.add.unsubscribe();
	}

}
