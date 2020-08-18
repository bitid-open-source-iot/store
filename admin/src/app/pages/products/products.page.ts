import { MatDialog } from '@angular/material/dialog';
import { ShareDialog } from 'src/app/components/share/share.dialog';
import { MenuService } from 'src/app/services/menu/menu.service';
import { DeleteDialog } from 'src/app/components/delete/delete.dialog';
import { ToastService } from 'src/app/services/toast/toast.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProductsService } from 'src/app/services/products/products.service';
import { SearchComponent } from 'src/app/libs/search/search.component';
import { SubscribersDialog } from 'src/app/components/subscribers/subscribers.dialog';
import { UnsubscribeDialog } from 'src/app/components/unsubscribe/unsubscribe.dialog';
import { OptionsSheetComponent } from 'src/app/components/options-sheet/options-sheet.component';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
    selector: 'app-products-page',
    styleUrls: ['./products.page.scss'],
    templateUrl: './products.page.html'
})

export class ProductsPage implements OnInit, OnDestroy {

    @ViewChild(SearchComponent, { 'static': true }) private search: SearchComponent;

    constructor(public menu: MenuService, private toast: ToastService, private sheet: MatBottomSheet, private dialog: MatDialog, public products: ProductsService, private route: ActivatedRoute, private router: Router) { };

    public filter: string = '';
    public storeId: string;
    public loading: boolean;
    private subscriptions: any = {};

    private async list() {
        this.loading = true;

        const response = await this.products.list({
            'filter': [
                'role',
                'image',
                'title',
                'price',
                'visible',
                'storeId',
                'promotion',
                'productId'
            ],
            'storeId': this.storeId
        });

        if (response.ok) {
            this.products.data = response.result;
        } else {
            this.products.data = [];
        };

        this.loading = false;
    };

    public async options(product) {
        const sheet = await this.sheet.open(OptionsSheetComponent, {
            'data': {
                'items': [
                    {
                        'role': product.role,
                        'icon': 'edit',
                        'scope': 3,
                        'title': 'Edit',
                        'option': 1
                    },
                    {
                        'role': product.role,
                        'icon': 'file_copy',
                        'scope': 3,
                        'title': 'Copy',
                        'option': 2
                    },
                    {
                        'role': product.role,
                        'icon': 'share',
                        'scope': 4,
                        'title': 'Share',
                        'option': 3
                    },
                    {
                        'role': product.role,
                        'icon': 'people',
                        'scope': 4,
                        'title': 'Subscribers',
                        'option': 4
                    },
                    {
                        'role': product.role,
                        'icon': 'remove',
                        'scope': 1,
                        'color': 'warn',
                        'title': 'Unsubscribe',
                        'option': 5
                    },
                    {
                        'role': product.role,
                        'icon': 'delete',
                        'scope': 5,
                        'color': 'warn',
                        'title': 'Delete',
                        'option': 6
                    }
                ],
                'title': product.title
            }
        });

        await sheet.afterDismissed().subscribe(async result => {
            if (result) {
                switch (result) {
                    case (1):
                        this.router.navigate(['/products', 'editor'], {
                            'queryParams': {
                                'mode': 'update',
                                'storeId': this.storeId,
                                'productId': product.productId
                            }
                        });
                        break;
                    case (2):
                        this.router.navigate(['/products', 'editor'], {
                            'queryParams': {
                                'mode': 'copy',
                                'storeId': this.storeId,
                                'productId': product.productId
                            }
                        });
                        break;
                    case (3):
                        const share = await this.dialog.open(ShareDialog, {
                            'panelClass': 'share-dialog'
                        });

                        await share.afterClosed().subscribe(async result => {
                            if (result) {
                                this.loading = true;

                                const response = await this.products.share({
                                    'role': result.role,
                                    'email': result.email,
                                    'storeId': this.storeId,
                                    'productId': product.productId
                                });

                                if (response.ok) {
                                    this.toast.success('user was shared!');
                                } else {
                                    this.toast.error(response.error.message);
                                };

                                this.loading = false;
                            };
                        });
                        break;
                    case (4):
                        this.dialog.open(SubscribersDialog, {
                            'data': {
                                'id': product.productId,
                                'type': 'product',
                                'storeId': this.storeId,
                                'service': this.products
                            },
                            'panelClass': 'subscribers-dialog'
                        });
                        break;
                    case (5):
                        const unsubscribe = await this.dialog.open(UnsubscribeDialog, {
                            'panelClass': 'unsubscribe-dialog'
                        });

                        await unsubscribe.afterClosed().subscribe(async result => {
                            if (result) {
                                this.loading = true;

                                const response = await this.products.unsubscribe({
                                    'storeId': this.storeId,
                                    'productId': product.productId
                                });

                                if (response.ok) {
                                    this.toast.success('you were unsubscribed from product!');
                                } else {
                                    this.toast.error(response.error.message);
                                };

                                this.loading = false;
                            };
                        });
                        break;
                    case (6):
                        const remove = await this.dialog.open(DeleteDialog, {
                            'panelClass': 'delete-dialog'
                        });

                        await remove.afterClosed().subscribe(async result => {
                            if (result) {
                                this.loading = true;

                                const response = await this.products.delete({
                                    'storeId': this.storeId,
                                    'productId': product.productId
                                });

                                if (response.ok) {
                                    this.toast.success('product was deleted!');
                                } else {
                                    this.toast.error(response.error.message);
                                };

                                this.loading = false;
                            };
                        });
                        break;
                };
            };
        });
    };

    public async ToggleVisability(event, product) {
        event.stopPropagation();

        this.loading = true;

        const response = await this.products.update({
            'visible': !product.visible,
            'storeId': this.storeId,
            'productId': product.productId
        });

        if (response.ok) {
            product.visible = !product.visible;
        } else {
            this.toast.error(response.error.message);
        };

        this.loading = false;
    };

    ngOnInit(): void {
        this.subscriptions.route = this.route.queryParams.subscribe(params => {
            if (typeof(params.storeId) != 'undefined' && params.storeId != null && params.storeId != '') {
                this.storeId = params.storeId;
                this.list();
            } else {
                this.router.navigate(['/stores']);
            };
        });

        this.subscriptions.search = this.search.change.subscribe(filter => {
            this.filter = filter;
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.route.unsubscribe();
        this.subscriptions.search.unsubscribe();
    };

}