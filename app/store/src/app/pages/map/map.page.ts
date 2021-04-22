import { AgmMap } from '@agm/core';
import { Product } from 'src/app/classes/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

declare const google: any;

@Component({
    selector: 'map-page',
    styleUrls: ['./map.page.scss'],
    templateUrl: './map.page.html'
})

export class MapPage implements OnInit, OnDestroy {

    constructor(private cart: CartService, private route: ActivatedRoute, public products: ProductsService, private buttons: ButtonsService, private wishlist: WishlistService) { }
    
    public loading: boolean;
    public product: Product;
    public productId: string;

    private async list() {
        this.loading = true;

        const response = await this.products.list({
            filter: [
                'price',
                'title',
                'score',
                'image',
                'location',
                'promotion',
                'productId'
            ],
            location: {
                enabled: true
            }
        });

        if (response.ok) {
            this.products.data = response.result.map(o => new Product(o));
            const params = this.route.snapshot.queryParams;
            if (typeof(params.productId) != 'undefined' && params.productId != null) {
                for (let i = 0; i < this.products.data.length; i++) {
                    if (this.products.data[i].productId == params.productId) {
                        this.view(this.products.data[i]);
                        break;;
                    };
                };
            };
        } else {
            this.products.data = [];
        }

        this.loading = false;
    };

    public view(product: Product) {
        if (this.product && this.product.productId == product.productId) {
            delete this.product;
            this.productId = null;
        } else {
            this.product = product;
            this.productId = product.productId;
        };
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
        this.buttons.show('cart');
        this.buttons.hide('close');
        this.buttons.hide('search');
        this.buttons.show('wishlist');

        // google.maps.ControlPosition = 'TOP_RIGHT';

        this.list();
    }

    ngOnDestroy(): void { }

}
