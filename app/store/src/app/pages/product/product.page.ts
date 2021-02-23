import { Review } from 'src/app/classes/review';
import { Product } from 'src/app/classes/product';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart/cart.service';
import { ReviewsService } from 'src/app/services/reviews/reviews.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { ProductReviewDialog } from './review/review.dialog';

@Component({
    selector: 'product-page',
    styleUrls: ['./product.page.scss'],
    templateUrl: './product.page.html'
})

export class ProductPage implements OnInit, OnDestroy {

    constructor(public cart: CartService, private dialog: MatDialog, private route: ActivatedRoute, public reviews: ReviewsService, private router: Router, private buttons: ButtonsService, private service: ProductsService, public wishlist: WishlistService) { }

    public links: Product[] = [];
    public product: Product = new Product();
    public loading: boolean;
    public productId: string;

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
        } else {
            this.router.navigate(['/home']);
        }

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

        this.loading = false;
    };

    public ReviewProduct() {
        this.dialog.open(ProductReviewDialog, {
            data: {
                title: this.product.title,
                productId: this.productId
            }
        });
    };

    ngOnInit(): void {
        const params = this.route.snapshot.queryParams;
        this.productId = params.productId;
        this.load();
    }

    ngOnDestroy(): void { }

}
