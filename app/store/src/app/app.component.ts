import { Store } from './classes/store';
import { MatButton } from '@angular/material/button';
import { MatDrawer } from '@angular/material/sidenav';
import { CartService } from './services/cart/cart.service';
import { StoreService } from './services/store/store.service';
import { SplashScreen } from './libs/splashscreen/splashscreen';
import { UpdateService } from './libs/update/update.service';
import { AccountService } from './services/account/account.service';
import { ButtonsService } from './services/buttons/buttons.service';
import { WishlistService } from './services/wishlist/wishlist.service';
import { CustomersService } from './services/customers/customers.service';
import { PrivateMessageService } from './libs/private-message/private-message.service';
import { Router, NavigationEnd } from '@angular/router';
import { OnInit, Component, ViewChild, Renderer2 } from '@angular/core';

@Component({
	selector: 'app-root',
	styleUrls: ['./app.component.scss'],
	templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

	@ViewChild(MatDrawer, { static: true }) private drawer: MatDrawer;
	@ViewChild(SplashScreen, { static: true }) private splashscreen: SplashScreen;

	@ViewChild('cart', { static: true }) private cartbtn: MatButton;
	@ViewChild('close', { static: true }) private closebtn: MatButton;
	@ViewChild('search', { static: true }) private searchbtn: MatButton;
	@ViewChild('wishlist', { static: true }) private wishlistbtn: MatButton;

	constructor(public cart: CartService, private popup: PrivateMessageService, private config: StoreService, private router: Router, private update: UpdateService, public account: AccountService, private buttons: ButtonsService, private renderer: Renderer2, public wishlist: WishlistService, private customers: CustomersService) { }

	public map: boolean;
	public page: string = '';
	public items: any = {
		cart: 0,
		wishlist: 0
	};
	public store: Store;
	public authenticated: boolean;

	public sign() {
		if (this.authenticated) {
			this.account.signout();
		} else {
			this.account.signin();
		};
		this.drawer.toggle();
	};

	public toggle() {
		this.drawer.toggle();
	};

	public website() {
		this.drawer.toggle();
		window.open(this.store.contact.website, '_blank');
	};

	private async initialize() {
		await this.splashscreen.show();

		await this.cart.init();
		await this.update.init();
		await this.account.init();
		await this.wishlist.init();
	}

	ngOnInit(): void {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				switch(event.url) {
					case('/map'):
						this.page = 'Map';
						break;
					case('/cart'):
						this.page = 'Cart';
						break;
					case('/orders'):
						this.page = 'Orders';
						break;
					case('/checkout'):
						this.page = 'Checkout';
						break;
					case('/wishlist'):
						this.page = 'Wishlist';
						break;
					case('/vouchers'):
						this.page = 'Vouchers';
						break;
					default:
						this.page = '';
						break;
				};
			}
		});

		this.config.value.subscribe(async store => {
			if (store) {
				this.map = store.maps;
				this.store = store;
				this.initialize();
				
				if (window.location.pathname != '/authenticate') {
					if (this.store.private) {
						const response = await this.customers.iam({});
						if (response.ok && !response.result) {
							this.popup.show();
						} else if (!response.ok) {
							this.popup.show();
						}
					}
				}
		
				await this.splashscreen.hide();
			};
		});

		this.cart.count.subscribe(count => this.items.cart = count);
		this.wishlist.count.subscribe(count => this.items.wishlist = count);

		this.renderer.listen(this.cartbtn._elementRef.nativeElement, 'click', event => this.buttons.cart.click.next(event));
		this.buttons.cart.visible.subscribe(visible => {
			if (visible) {
				this.renderer.setStyle(this.cartbtn._elementRef.nativeElement, 'display', 'block');
			} else {
				this.renderer.setStyle(this.cartbtn._elementRef.nativeElement, 'display', 'none');
			}
		});

		this.renderer.listen(this.closebtn._elementRef.nativeElement, 'click', event => this.buttons.close.click.next(event));
		this.buttons.close.visible.subscribe(visible => {
			if (visible) {
				this.renderer.setStyle(this.closebtn._elementRef.nativeElement, 'display', 'block');
			} else {
				this.renderer.setStyle(this.closebtn._elementRef.nativeElement, 'display', 'none');
			}
		});

		this.renderer.listen(this.searchbtn._elementRef.nativeElement, 'click', event => this.buttons.search.click.next(event));
		this.buttons.search.visible.subscribe(visible => {
			if (visible) {
				this.renderer.setStyle(this.searchbtn._elementRef.nativeElement, 'display', 'block');
			} else {
				this.renderer.setStyle(this.searchbtn._elementRef.nativeElement, 'display', 'none');
			}
		});

		this.renderer.listen(this.wishlistbtn._elementRef.nativeElement, 'click', event => this.buttons.wishlist.click.next(event));
		this.buttons.wishlist.visible.subscribe(visible => {
			if (visible) {
				this.renderer.setStyle(this.wishlistbtn._elementRef.nativeElement, 'display', 'block');
			} else {
				this.renderer.setStyle(this.wishlistbtn._elementRef.nativeElement, 'display', 'none');
			}
		});

		this.account.authenticated.subscribe(authenticated => {
			this.authenticated = authenticated;
		});
		
		this.config.init();
	}

}
