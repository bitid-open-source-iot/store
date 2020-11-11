import { MatSidenav } from '@angular/material/sidenav';
import { MenuService } from './services/menu/menu.service';
import { SplashScreen } from './splashscreen/splashscreen.component';
import { AccountService } from './services/account/account.service';
import { HistoryService } from './services/history/history.service';
import { ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
	selector: 'app-root',
	styleUrls: ['./app.component.scss'],
	templateUrl: './app.component.html'
})

export class AppComponent implements OnInit, OnDestroy {

	@ViewChild(MatSidenav, { 'static': true }) private sidenav: MatSidenav;
	@ViewChild(SplashScreen, { 'static': true }) private splashscreen: SplashScreen;

	constructor(public menu: MenuService, public route: ActivatedRoute, private history: HistoryService, private account: AccountService) { };

	public user: any = {};
	public pages: any[] = [
		// {
		// 	'title': 'apis',
		// 	'route': '/apis',
		// 	'locked': true
		// },
		{
			'title': 'stores',
			'route': '/stores',
			'locked': false
		},
		{
			'title': 'reports',
			'route': '/reports',
			'locked': false
		},
		{
			'title': 'reviews',
			'route': '/reviews',
			'locked': true
		},
		{
			'title': 'couriers',
			'route': '/couriers',
			'locked': true
		},
		{
			'title': 'products',
			'route': '/products',
			'locked': true
		},
		{
			'title': 'suppliers',
			'route': '/suppliers',
			'locked': true
		},
		{
			'title': 'departments',
			'route': '/departments',
			'locked': true
		},
		{
			'title': 'collection points',
			'route': '/collection-points',
			'locked': true
		}
	];
	public storeId: string;
	public authenticated: boolean;
	public subscriptions: any = {};

	public logout() {
		this.menu.close();
		this.account.logout();
	};

	private async initialize() {
		await this.splashscreen.show();

		await this.menu.init(this.sidenav);
		await this.history.init();
		await this.account.init();

		await this.splashscreen.hide();
	};

	ngOnInit(): void {
		this.subscriptions.route = this.route.queryParams.subscribe(params => {
			this.storeId = params.storeId;
		});

		this.subscriptions.account = this.account.user.subscribe(async user => {
			this.user = user;
		});

		this.subscriptions.authenticated = this.account.authenticated.subscribe(async authenticated => {
			this.authenticated = authenticated;
			if (this.authenticated) {
				await this.account.get();
			};
		});

		this.initialize();
	};

	ngOnDestroy(): void {
		this.subscriptions.route.unsubscribe();
		this.subscriptions.account.unsubscribe();
		this.subscriptions.authenticated.unsubscribe();
	};

}