import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { AccountService } from 'src/app/services/account/account.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector: 'cart-page',
    styleUrls: ['./cart.page.scss'],
    templateUrl: './cart.page.html'
})

export class CartPage implements OnInit, OnDestroy {

    constructor(public cart: CartService, private router: Router, private account: AccountService, private buttons: ButtonsService, private products: ProductsService) { }

    public loading: boolean;
    private subscriptions: any = {};

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
                            this.cart.items[i].title = item.title;
                            this.cart.items[i].price = item.price;
                            this.cart.items[i].image = item.image;
                            this.cart.items[i].storeId = item.storeId;
                            this.cart.items[i].promotion = item.promotion;
                        };
                    });
                };
                this.cart.calculate();
            };
        };

        this.loading = false;
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
