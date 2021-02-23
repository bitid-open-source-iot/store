import { Product } from 'src/app/classes/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector: 'home-page',
    styleUrls: ['./home.page.scss'],
    templateUrl: './home.page.html'
})

export class HomePage implements OnInit, OnDestroy {

    constructor(private cart: CartService, public products: ProductsService, private wishlist: WishlistService) { }
    
    public loading: boolean;

    private async list() {
        this.loading = true;

        const response = await this.products.list({
            filter: [
                'price',
                'title',
                'score',
                'image',
                'promotion',
                'productId'
            ]
        });

        if (response.ok) {
            this.products.data = response.result.map(o => new Product(o));
        } else {
            this.products.data = [];
        }

        this.loading = false;
    };

    public async AddToCart(event: MouseEvent, product: Product) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        this.cart.add(product);
    };
    
    public async AddToWishlist(event: MouseEvent, product: Product) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        this.wishlist.add(product);
    };

    ngOnInit(): void {
        this.list();
    }

    ngOnDestroy(): void { }

}
