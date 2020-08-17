import { Title } from '@angular/platform-browser';
import { CartService } from 'src/app/services/cart/cart.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { SearchComponent } from 'src/app/libs/search/search.component';
import { ProductsService } from 'src/app/services/products/products.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
    selector:       'app-products-page',
    styleUrls:      ['./products.page.scss'],
    templateUrl:    './products.page.html'
})

export class ProductsPage implements OnInit, OnDestroy {

    @ViewChild(SearchComponent, {'static': true}) private search: SearchComponent;

    constructor(public menu: MenuService, public cart: CartService, private title: Title, public store: StoresService, public wishlist: WishlistService, public products: ProductsService) {};

    public filter:          string = '';
    public loading:         boolean;
    private subscriptions:  any = {};

    public async list() {
        this.loading = true;

        const response = await this.products.list({
            'filter': [
                'score',
                'title',
                'price',
                'image',
                'storeId',
                'promotion',
                'productId'
            ],
            'sort': {
                'title': 1
            },
            'visible': true
        });

        if (response.ok) {
            this.products.data = response.result;
        };
        
        this.loading = false;
    };

    ngOnInit(): void {
        this.subscriptions.store = this.store.store.subscribe(store => {
            if (store) {
                this.title.setTitle([store.description].join(' '));
            };
        });

        this.subscriptions.search = this.search.change.subscribe(search => {
            this.filter = search;
        });

        this.list();
    };

    ngOnDestroy(): void {
        this.subscriptions.store.unsubscribe();
        this.subscriptions.search.unsubscribe();
    };

}