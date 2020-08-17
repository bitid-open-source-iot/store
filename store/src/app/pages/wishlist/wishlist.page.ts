import { Title } from '@angular/platform-browser';
import { MenuService } from 'src/app/services/menu/menu.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { AccountService } from 'src/app/services/account/account.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector:       'app-wishlist-page',
    styleUrls:      ['./wishlist.page.scss'],
    templateUrl:    './wishlist.page.html'
})

export class WishlistPage implements OnInit, OnDestroy {

    constructor(public menu: MenuService, private account: AccountService, public cart: CartService, public wishlist: WishlistService, private title: Title, public store: StoresService, public products: ProductsService) {};

    public loading:         boolean;
    private subscriptions:  any = {};

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
                            this.wishlist.items[i].title     = item.title;
                            this.wishlist.items[i].price     = item.price;
                            this.wishlist.items[i].image     = item.image;
                            this.wishlist.items[i].storeId   = item.storeId;
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
        this.subscriptions.store = this.store.store.subscribe(store => {
            if (store) {
                this.title.setTitle([store.description, '-', 'CART'].join(' '));
            };
        });

        this.list();
    };

    ngOnDestroy(): void {
        this.subscriptions.store.unsubscribe();
    };

}