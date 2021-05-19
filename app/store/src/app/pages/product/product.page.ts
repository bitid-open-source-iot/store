import { Review } from 'src/app/classes/review';
import { Product } from 'src/app/classes/product';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart/cart.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AccountService } from 'src/app/services/account/account.service';
import { ReviewsService } from 'src/app/services/reviews/reviews.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import { ProductReviewDialog } from './review/review.dialog';
import { ProductGalleryDialog } from './gallery/gallery.dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector: 'product-page',
    styleUrls: ['./product.page.scss'],
    templateUrl: './product.page.html'
})

export class ProductPage implements OnInit, OnDestroy {

    constructor(public cart: CartService, private route: ActivatedRoute, private dialog: MatDialog, private account: AccountService, public reviews: ReviewsService, private router: Router, private buttons: ButtonsService, private service: ProductsService, public wishlist: WishlistService, private sanitizer: DomSanitizer) { }

    public links: Product[] = [];
    public product: Product = new Product();
    public loading: boolean;
    public productId: string;
    public authenticated: boolean;
    private subscriptions: any = {};

    public gallery() {
        this.dialog.open(ProductGalleryDialog, {
            data: this.product.images.map(o => o.src),
            panelClass: 'fullscreen-dialog'
        });
    };

    private async load() {
        this.loading = true;
        
        const reviews = await this.reviews.list({
            sort: {
                date: 1
            },
            filter: [
                'score',
                'message'
            ],
            limit: 10,
            productId: this.productId
        });

        if (reviews.ok) {
            this.reviews.data = reviews.result.map(o => new Review(o));
        } else {
            this.reviews.data = [];
        };

        const product = await this.service.get({
            filter: [
                'links',
                'price',
                'title',
                'score',
                'images',
                'quantity',
                'location',
                'promotion',
                'productId',
                'description'
            ],
            productId: this.productId
        });

        if (product.ok) {
            this.product = new Product(product.result);
            this.product.images.map(image => {
                if (image.main) {
                    this.product.image = image.src;
                };
            });
            this.product.description = this.sanitizer.bypassSecurityTrustHtml(this.product.description);
        } else {
            this.router.navigate(['/home']);
        }

        if (this.product.links.length > 0) {
            const products = await this.service.list({
                filter: [
                    'image',
                    'title',
                    'productId'
                ],
                productId: this.product.links
            });

            if (products.ok) {
                this.links = products.result.map(o => new Product(o));
            } else {
                this.links = [];
            }
        };

        this.loading = false;
    };

    public ReviewProduct() {
        this.dialog.open(ProductReviewDialog, {
            data: {
                title: this.product.title,
                productId: this.productId
            },
            panelClass: 'product-review-dialog'
        });
    };

    ngOnInit(): void {
        this.buttons.show('cart');
        this.buttons.show('close');
        this.buttons.hide('search');
        this.buttons.show('wishlist');

        this.subscriptions.close = this.buttons.close.click.subscribe(params => {
            window.history.back();
        });

        this.subscriptions.params = this.route.params.subscribe(params => {
            this.links = [];
            this.product = new Product();
            this.productId = params.productId;
            this.load();
        });

        this.subscriptions.authenticated = this.account.authenticated.subscribe(authenticated => {
            this.authenticated = authenticated;
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.close.unsubscribe();
        this.subscriptions.params.unsubscribe();
        this.subscriptions.authenticated.unsubscribe();
    }

}
