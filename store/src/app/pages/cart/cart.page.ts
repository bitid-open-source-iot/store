import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart/cart.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { DownloadDialog } from './download/download.dialog';
import { AccountService } from 'src/app/services/account/account.service'
import { ProductsService } from 'src/app/services/products/products.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector:       'app-cart-page',
    styleUrls:      ['./cart.page.scss'],
    templateUrl:    './cart.page.html'
})

export class CartPage implements OnInit, OnDestroy {

    constructor(public menu: MenuService, private account: AccountService, public cart: CartService, private router: Router, public wishlist: WishlistService, private title: Title, public store: StoresService, private dialog: MatDialog, public products: ProductsService) {};

    public loading:         boolean;
    private subscriptions:  any = {};

    public async list() {
        this.loading = true;
        
        if (this.account.authenticated.value) {
            await this.cart.list({});
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
                'productId': this.cart.items.map(o => o.productId)
            });
            
            if (products.ok) {
                for (let i = 0; i < this.cart.items.length; i++) {
                    products.result.map(item => {
                        if (this.cart.items[i].productId == item.productId) {
                            this.cart.items[i].title     = item.title;
                            this.cart.items[i].price     = item.price;
                            this.cart.items[i].image     = item.image;
                            this.cart.items[i].storeId   = item.storeId;
                            this.cart.items[i].promotion = item.promotion;
                        };
                    });
                };
                this.cart.calculate();
            };
        };
        
        this.loading = false;
    };

    public async download() {
        await this.dialog.open(DownloadDialog, {
            'panelClass': 'download-dialog'
        });
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