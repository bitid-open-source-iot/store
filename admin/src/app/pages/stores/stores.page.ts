import { Store } from 'src/app/classes/store';
import { MatSort } from '@angular/material/sort';
import { StoresService } from 'src/app/services/stores/stores.service';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { Router } from '@angular/router';

@Component({
	selector: 'stores-page',
	styleUrls: ['./stores.page.scss'],
	templateUrl: './stores.page.html'
})

export class StoresPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, {static: true}) private sort: MatSort;

	constructor(private router: Router, private service: StoresService, private buttons: ButtonsService) { }

	public stores: MatTableDataSource<Store> = new MatTableDataSource<Store>();
	public columns: string[] = ['description', 'options'];
	public loading: boolean;
	private subscriptions: any = { }

	private async list() {
		this.loading = true;

		const response = await this.service.list({
			sort: {
				description: 1
			},
			filter: [
				'role',
				'storeId',
				'description'
			]
		});

		if (response.ok) {
			this.stores.data = response.result.map(o => new Store(o));
		} else {
			this.stores.data = [];
		}

		this.loading = false;
	};
	
	public async options(store: Store) {
		
	};

	ngOnInit(): void {
		this.buttons.show('add');
		this.buttons.hide('close');
		this.buttons.hide('filter');
		this.buttons.hide('search');

		this.sort.active = 'description';
		this.sort.direction = 'desc';
		this.stores.sort = this.sort;

		this.subscriptions.add = this.buttons.add.click.subscribe(event => {
			this.router.navigate(['/stores', 'editor'], {
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
