import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { AccountService } from 'src/app/services/account/account.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector: 'wishlist-page',
    styleUrls: ['./wishlist.page.scss'],
    templateUrl: './wishlist.page.html'
})

export class WishlistPage implements OnInit, OnDestroy {

    constructor(public cart: CartService, public wishlist: WishlistService, private router: Router, private account: AccountService, private buttons: ButtonsService, private products: ProductsService) { }

    public loading: boolean;
    private subscriptions: any = {};

    public async list() {
        this.loading = true;

        if (this.account.authenticated.value) {
            await this.wishlist.list({});
        } else {
            const products = await this.products.list({
                'filter': [
                    'title',
                    'price',
                    'image',
                    'storeId',
                    'productId',
                    'promotion'
                ],
                'productId': this.wishlist.items.map(o => o.productId)
            });

            if (products.ok) {
                for (let i = 0; i < this.wishlist.items.length; i++) {
                    products.result.map(item => {
                        if (this.wishlist.items[i].productId == item.productId) {
                            this.wishlist.items[i].title = item.title;
                            this.wishlist.items[i].price = item.price;
                            this.wishlist.items[i].image = item.image;
                            this.wishlist.items[i].storeId = item.storeId;
                            this.wishlist.items[i].promotion = item.promotion;
                        };
                    });
                };
            };
        };

        this.loading = false;
    };

    public async MoveToCart(item) {
        await this.cart.add(item);
        await this.wishlist.delete(item);
    };

    ngOnInit(): void {
        this.buttons.hide('cart');
        this.buttons.show('close');
        this.buttons.hide('search');
        this.buttons.hide('wishlist');
        
        this.subscriptions.close = this.buttons.close.click.subscribe(event => {
            this.router.navigate(['/home']);
        });

        this.list();
    }

    ngOnDestroy(): void {
        this.subscriptions.close.unsubscribe();
    }

}
