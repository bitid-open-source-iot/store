import { MatSidenav } from '@angular/material/sidenav';
import { MenuService } from './services/menu/menu.service';
import { CartService } from './services/cart/cart.service';
import { SplashScreen } from './splashscreen/splashscreen.component';
import { StoresService } from './services/stores/stores.service';
import { AccountService } from './services/account/account.service';
import { HistoryService } from './services/history/history.service';
import { WishlistService } from './services/wishlist/wishlist.service';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
	selector: 'app-root',
	styleUrls: ['./app.component.scss'],
	templateUrl: './app.component.html'
})

export class AppComponent implements OnInit, OnDestroy {

	@ViewChild(MatSidenav, { 'static': true }) private sidenav: MatSidenav;
	@ViewChild(SplashScreen, { 'static': true }) private splashscreen: SplashScreen;

	constructor(public menu: MenuService, private history: HistoryService, private account: AccountService, private cart: CartService, private wishlist: WishlistService, private service: StoresService) { };

	public user: any = {};
	public store: any;
	public authenticated: boolean;
	public subscriptions: any = {};

	public logout() {
		this.menu.close();
		this.account.logout();
	};

	public website() {
		this.menu.close();

		window.open(this.store.contact.website, '_blank');

		return true;
	};

	private async initialize() {
		await this.splashscreen.show();

		await this.menu.init(this.sidenav);
		await this.history.init();
		await this.account.init();

		await this.cart.init();
		await this.service.init();
		await this.wishlist.init();

		await this.splashscreen.hide();
	};

	ngOnInit(): void {
		this.subscriptions.store = this.service.store.subscribe(async store => {
			if (store) {
				this.store = store;
				const favicon: HTMLLinkElement = <any>document.getElementById('favicon');
				favicon.href = this.store.logo;
			};
		});

		this.subscriptions.account = this.account.user.subscribe(async user => {
			this.user = user;
		});

		this.subscriptions.authenticated = this.account.authenticated.subscribe(async authenticated => {
			this.authenticated = authenticated;
			if (this.authenticated) {
				await this.account.get();
				await this.cart.init();
				await this.wishlist.init();
			};
		});

		this.initialize();
	};

	ngOnDestroy(): void {
		this.subscriptions.store.unsubscribe();
		this.subscriptions.account.unsubscribe();
		this.subscriptions.authenticated.unsubscribe();
	};

}