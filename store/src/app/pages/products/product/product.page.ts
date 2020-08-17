import { Product } from 'src/app/interfaces/product';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart/cart.service';
import { Meta, Title } from '@angular/platform-browser';
import { ReviewDialog } from './review/review.dialog';
import { ToastService } from 'src/app/services/toast/toast.service';
import { HistoryService } from 'src/app/services/history/history.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from 'src/app/services/reviews/reviews.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector:       'app-product-page',
    styleUrls:      ['./product.page.scss'],
    templateUrl:    './product.page.html'
})

export class ProductPage implements OnInit, OnDestroy {

    constructor(private meta: Meta, public cart: CartService, private title: Title, private dialog: MatDialog, private toast: ToastService, private route: ActivatedRoute, public reviews: ReviewsService, private history: HistoryService, public wishlist: WishlistService, private service: ProductsService) {};
    
    public fill:            any[]   = [1, 2, 3];
    public links:           any[]   = [];
    public product:         Product;
    public loading:         boolean;
    private productId:      string;
    private subscriptions:  any     = {};

    public async back() {
        this.history.back();
    };

    private async get() {
        this.loading = true;

        const response = await this.service.get({
            'filter': [
                'info',
                'image',
                'price',
                'title',
                'score',
                'links',
                'images',
                'storeId',
                'promotion',
                'productId',
                'description'
            ],
            'productId': this.productId
        });

        if (response.ok) {
            this.product        = response.result;
            this.product.image  = this.product.images[0].src;
            this.fill.splice(0, this.product.images.length);

            this.title.setTitle(this.product.title);
            this.meta.addTag({
                'content':  window.location.href,
                'property': 'og:url'
            });
            this.meta.addTag({
                'property': 'og:type',
                'content':  'website'
            });
            this.meta.addTag({
                'content':  this.product.image,
                'property': 'og:image'
            });
            this.meta.addTag({
                'content':  this.product.title,
                'property': 'og:title'
            });
            this.meta.addTag({
                'content':  this.product.title,
                'property': 'og:site_name'
            });
            this.meta.addTag({
                'content':  this.product.description,
                'property': 'og:description'
            });
            this.meta.addTag({
                'name':     'twitter:image',
                'content':  this.product.image
            });
            this.meta.addTag({
                'name':     'twitter:title',
                'content':  this.product.title
            });
            this.meta.addTag({
                'name':     'twitter:description',
                'content':  this.product.description
            });

            this.load();
        } else {
            this.toast.error(response.error.message);
        };

        this.loading = false;
    };

    private async load() {
        this.loading = true;

        if (this.product.links.length > 0) {
            const response = await this.service.list({
                'filter': [
                    'image',
                    'title',
                    'productId'
                ],
                'visible':      true,
                'productId':    this.product.links
            });

            if (response.ok) {
                this.links = response.result;
            } else {
                this.links = [];
            };
        };

        const reviews = await this.reviews.list({
            'filter': [
                'score',
                'message'
            ],
            'status':       'approved',
			'productId':    this.productId
        });

        if (reviews.ok) {
            this.reviews.data = reviews.result;
        };

        this.loading = false;
    };

    public async review() {
        await this.dialog.open(ReviewDialog, {
            'data': {
                'title':        this.product.title,
                'productId':    this.product.productId
            },
            'panelClass': 'review-dialog'
        });
    };

    ngOnInit(): void {
        this.subscriptions.route = this.route.params.subscribe(params => {
            this.links          = [];
            this.productId      = params.productId;
			this.reviews.data   = [];
            this.get();
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.route.unsubscribe();
        this.meta.removeTag('property="og:url"');
        this.meta.removeTag('property="og:type"');
        this.meta.removeTag('property="og:image"');
        this.meta.removeTag('property="og:title"');
        this.meta.removeTag('name="twitter:image"');
        this.meta.removeTag('name="twitter:title"');
        this.meta.removeTag('property="og:site_name"');
        this.meta.removeTag('property="og:description"');
        this.meta.removeTag('name="twitter:description"');
    };

}