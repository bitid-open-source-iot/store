import { MatButton } from '@angular/material/button';
import { CartService } from './services/cart/cart.service';
import { StoreService } from './services/store/store.service';
import { UpdateService } from './libs/update/update.service';
import { AccountService } from './services/account/account.service';
import { ButtonsService } from './services/buttons/buttons.service';
import { WishlistService } from './services/wishlist/wishlist.service';
import { OnInit, Component, ViewChild, Renderer2 } from '@angular/core';

@Component({
	selector: 'app-root',
	styleUrls: ['./app.component.scss'],
	templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

	@ViewChild('cart', { static: true }) private cartbtn: MatButton;
	@ViewChild('close', { static: true }) private closebtn: MatButton;
	@ViewChild('search', { static: true }) private searchbtn: MatButton;
	@ViewChild('wishlist', { static: true }) private wishlistbtn: MatButton;

	constructor(public cart: CartService, public store: StoreService, private update: UpdateService, public account: AccountService, private buttons: ButtonsService, private renderer: Renderer2, public wishlist: WishlistService) { }

	public items: any = {
		cart: 0,
		wishlist: 0
	};
	public authenticated: boolean;

	private async initialize() {
		await this.cart.init();
		await this.store.init();
		await this.update.init();
		await this.wishlist.init();
	}

	ngOnInit(): void {
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
			if (authenticated) {

			}
		});

		this.initialize();
	}

}
